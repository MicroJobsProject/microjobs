// DEPENDENCIES
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

// NATIVE
import {
  useUserStatsLoadAction,
  useAdvertsLoadAction,
  useAdvertDeleteAction,
  useAdvertsDeleteMultipleAction,
  useUiResetError,
} from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getAdverts, getPagination, getUi } from "../../store/selectors";
import Pagination from "../advert/Pagination";
import Alert from "../ui/Alert";
import Modal from "../ui/Modal";
import type { User } from "../../pages/user/types";
import { seoNormalize } from "../../utils/seoNormalize";
import type { Advert } from "../../pages/advert/types";

// ASSETS
import PlaceholderImage from "/placeholder.png";
import { API_BASE_URL } from "../../config/constants";

interface UserAdvertsListProps {
  user: User;
}

export default function UserAdvertsList({ user }: UserAdvertsListProps) {
  const { t } = useTranslation([
    "home",
    "profile",
    "advert-card",
    "advert-category",
  ]);
  const navigate = useNavigate();

  const loadUserStats = useUserStatsLoadAction();
  const advertsLoadAction = useAdvertsLoadAction();
  const advertDeleteAction = useAdvertDeleteAction();
  const advertsDeleteMultipleAction = useAdvertsDeleteMultipleAction();
  const uiResetErrorAction = useUiResetError();

  const adverts = useAppSelector(getAdverts);
  const { pending, error } = useAppSelector(getUi);
  const { totalPages } = useAppSelector(getPagination);

  const [page, setPage] = useState(1);
  const [selectedAdverts, setSelectedAdverts] = useState<Set<string>>(
    new Set(),
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteType, setDeleteType] = useState<"single" | "multiple">(
    "multiple",
  );
  const [advertToDelete, setAdvertToDelete] = useState<string | null>(null);

  useEffect(() => {
    const params: Record<string, string> = {
      page: page.toString(),
      owner: user.username,
    };
    advertsLoadAction(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, user.username]);

  function handlePageChange(newPage: number) {
    setPage(newPage);
    setSelectedAdverts(new Set());
  }

  function handleSelectAdvert(advertId: string) {
    setSelectedAdverts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(advertId)) {
        newSet.delete(advertId);
      } else {
        newSet.add(advertId);
      }
      return newSet;
    });
  }

  function handleSelectAll() {
    if (selectedAdverts.size === adverts.length) {
      setSelectedAdverts(new Set());
    } else {
      setSelectedAdverts(new Set(adverts.map((ad) => ad._id)));
    }
  }

  function handleDeleteClick(advertId?: string) {
    if (advertId) {
      setDeleteType("single");
      setAdvertToDelete(advertId);
    } else {
      setDeleteType("multiple");
      setAdvertToDelete(null);
    }
    setShowDeleteModal(true);
  }

  async function handleConfirmDelete() {
    try {
      if (deleteType === "single" && advertToDelete) {
        await advertDeleteAction(advertToDelete);
      } else {
        await advertsDeleteMultipleAction(Array.from(selectedAdverts));
      }

      await loadUserStats();

      setShowDeleteModal(false);
      setSelectedAdverts(new Set());
      setAdvertToDelete(null);
    } catch (error) {
      console.error("Error deleting adverts:", error);
    }
  }

  function handleAdvertClick(advert: Advert, event: React.MouseEvent) {
    if ((event.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    navigate(`/advert/${seoNormalize(advert.name)}/${advert._id}`);
  }

  if (!adverts || adverts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <span
          className="material-symbols-outlined text-heading !text-7xl"
          aria-hidden="true"
          translate="no"
        >
          campaign
        </span>
        <h3 className="text-center font-bold" role="heading">
          {t("home:noAdvertsTitle")}
        </h3>
        <div className="px-4 text-center">
          <p>{t("home:noAdvertsSubtitle")}</p>
          <p>{t("home:noAdvertsParagraph")}</p>
        </div>
        <Link to="/advert/new" className="btn btn-primary">
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
            translate="no"
          >
            add
          </span>
          <span>{t("home:newAdvert")}</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="mb-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="!mb-0">{t("profile:myAdverts")}</h2>
            {adverts.length > 0 && (
              <button
                onClick={handleSelectAll}
                className="btn btn-secondary w-fit text-sm"
              >
                <span
                  className="material-symbols-outlined"
                  aria-hidden="true"
                  translate="no"
                >
                  {selectedAdverts.size === adverts.length
                    ? "check_box"
                    : "check_box_outline_blank"}
                </span>
                <span>
                  {selectedAdverts.size === adverts.length
                    ? t("profile:deselectAll")
                    : t("profile:selectAll")}
                </span>
              </button>
            )}
          </div>

          {selectedAdverts.size > 0 && (
            <button
              onClick={() => handleDeleteClick()}
              className="btn btn-destructive w-full text-sm sm:w-auto"
            >
              <span
                className="material-symbols-outlined"
                aria-hidden="true"
                translate="no"
              >
                delete
              </span>
              <span>
                {t("profile:deleteSelected")} ({selectedAdverts.size})
              </span>
            </button>
          )}
        </div>

        {pending ? (
          <div className="flex items-center justify-center py-12">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          </div>
        ) : (
          <ul className="mb-8 space-y-3">
            {adverts.map((advert) => (
              <li
                key={advert._id}
                className={clsx(
                  "bg-container border-border overflow-hidden rounded-lg border transition-all",
                  selectedAdverts.has(advert._id) && "ring-primary ring-2",
                )}
              >
                <div className="flex flex-col sm:hidden">
                  <div
                    className="hover:bg-border/50 cursor-pointer p-3 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAdvert(advert._id);
                    }}
                  >
                    <img
                      alt={t("advert-card:ariaAdvertPhoto", {
                        name: advert.name,
                      })}
                      src={
                        advert.photo
                          ? `${API_BASE_URL}${advert.photo}`
                          : PlaceholderImage
                      }
                      className="mb-3 h-32 w-full rounded-lg object-cover"
                    />

                    <h3 className="text-heading mb-1 text-sm font-semibold break-words">
                      {advert.name}
                    </h3>
                    <p className="text-paragraph mb-2 line-clamp-2 text-xs break-words">
                      {advert.description}
                    </p>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-amber-300 px-2 py-0.5 text-[10px] whitespace-nowrap text-amber-900">
                        {advert.offer
                          ? t("advert-card:advertTypeOffer")
                          : t("advert-card:advertTypeNeed")}
                      </span>
                      <span className="text-heading max-w-[150px] truncate text-[10px] font-bold">
                        {t(advert.category, {
                          ns: "advert-category",
                          defaultValue: advert.category,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-primary text-base font-bold">
                        {advert.price}€
                      </span>
                      <span className="text-paragraph text-[10px]">/hr</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/advert/${seoNormalize(advert.name)}/${advert._id}`,
                      );
                    }}
                    className="bg-primary hover:bg-primary-hover flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-white transition-colors"
                    aria-label={t("profile:viewAdvertDetail", {
                      name: advert.name,
                    })}
                  >
                    <span>{t("profile:viewDetail")}</span>
                    <span
                      className="material-symbols-outlined text-lg"
                      aria-hidden="true"
                      translate="no"
                    >
                      arrow_forward
                    </span>
                  </button>
                </div>

                <div
                  className="hidden cursor-pointer transition-all hover:shadow-md sm:flex"
                  onClick={(e) => handleAdvertClick(advert, e)}
                >
                  <div
                    className="flex items-center justify-center self-stretch bg-cyan-500/10 px-4 transition-colors hover:bg-cyan-500/20 md:px-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAdvert(advert._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAdverts.has(advert._id)}
                      onChange={() => handleSelectAdvert(advert._id)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary focus:ring-primary border-border h-5 w-5 cursor-pointer rounded"
                      aria-label={t("profile:ariaSelectAdvert", {
                        name: advert.name,
                      })}
                    />
                  </div>

                  <img
                    alt={t("advert-card:ariaAdvertPhoto", {
                      name: advert.name,
                    })}
                    src={
                      advert.photo
                        ? `${API_BASE_URL}${advert.photo}`
                        : PlaceholderImage
                    }
                    className="my-4 ml-3 h-16 w-16 flex-shrink-0 rounded-lg object-cover md:ml-4 md:h-20 md:w-20"
                  />

                  <div className="mx-3 my-4 min-w-0 flex-1 md:mx-4">
                    <h3 className="text-heading mb-1 truncate text-sm font-semibold md:text-base">
                      {advert.name}
                    </h3>
                    <p className="text-paragraph mb-2 truncate text-xs md:text-sm">
                      {advert.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-amber-300 px-2 py-1 text-xs whitespace-nowrap text-amber-900">
                        {advert.offer
                          ? t("advert-card:advertTypeOffer")
                          : t("advert-card:advertTypeNeed")}
                      </span>
                      <span className="text-heading truncate text-xs font-bold md:text-sm">
                        {t(advert.category, {
                          ns: "advert-category",
                          defaultValue: advert.category,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="bg-background my-4 mr-3 flex flex-col items-center justify-center rounded-lg px-4 md:mr-4 md:px-6">
                    <span className="text-primary text-lg font-bold whitespace-nowrap md:text-xl">
                      {advert.price}€
                    </span>
                    <span className="text-paragraph text-xs md:text-sm">
                      /hr
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Pagination
        current={page}
        total={totalPages}
        onPageChange={handlePageChange}
      />

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setAdvertToDelete(null);
        }}
        title={t("profile:confirmDeletion")}
        variant="destructive"
      >
        <div className="space-y-4">
          <p className="text-paragraph">
            {deleteType === "single"
              ? t("profile:confirmDeletionSingle")
              : t("profile:confirmDeletionMultiple", {
                  count: selectedAdverts.size,
                })}
          </p>
          <p className="text-destructive text-sm font-medium">
            {t("profile:confirmDeletionWarning")}
          </p>

          <div className="flex flex-col justify-end gap-3 sm:flex-row">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setAdvertToDelete(null);
              }}
              className="btn btn-secondary"
            >
              {t("profile:Cancel")}
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={pending}
              className={clsx(
                "btn btn-destructive",
                pending && "cursor-not-allowed opacity-50",
              )}
            >
              {pending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  {t("profile:Deleting...")}
                </div>
              ) : (
                t("profile:Delete")
              )}
            </button>
          </div>
        </div>
      </Modal>

      {error && (
        <Alert
          text={error.message}
          variant="error"
          onClick={() => uiResetErrorAction()}
        />
      )}
    </>
  );
}
