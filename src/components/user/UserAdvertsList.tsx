//DEPENDENCIES
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

//NATIVE
import { useAppSelector } from "../../store";
import {
  useUserStatsLoadAction,
  useAdvertsLoadAction,
  useAdvertDeleteAction,
  useAdvertsDeleteMultipleAction,
  useUiResetError,
} from "../../store/hooks";
import { getAdverts, getPagination, getUi } from "../../store/selectors";
import Pagination from "../advert/Pagination";
import Alert from "../ui/Alert";
import Modal from "../ui/Modal";
import type { User } from "../../pages/user/types";

interface UserAdvertsListProps {
  user: User;
}

export default function UserAdvertsList({ user }: UserAdvertsListProps) {
  const { t } = useTranslation(["home", "profile"]);
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

  function handleAdvertClick(advertId: string, event: React.MouseEvent) {
    if ((event.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    navigate(`/adverts/${advertId}`);
  }

  if (!adverts || adverts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <span
          className="material-symbols-outlined text-heading !text-7xl"
          aria-hidden="true"
        >
          campaign
        </span>
        <h3 className="font-bold" role="heading">
          {t("home:noAdvertsTitle")}
        </h3>
        <div className="text-center">
          <p>{t("home:noAdvertsSubtitle")}</p>
          <p>{t("home:noAdvertsParagraph")}</p>
        </div>
        <Link to="/advert/new" className="btn btn-primary">
          <span className="material-symbols-outlined" aria-hidden="true">
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
            <h2 className="!mb-0">{t("profile:My Adverts")}</h2>
            {adverts.length > 0 && (
              <button
                onClick={handleSelectAll}
                className="btn btn-secondary w-fit text-sm"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {selectedAdverts.size === adverts.length
                    ? "check_box"
                    : "check_box_outline_blank"}
                </span>
                <span>
                  {selectedAdverts.size === adverts.length
                    ? t("profile:Deselect All")
                    : t("profile:Select All")}
                </span>
              </button>
            )}
          </div>

          {selectedAdverts.size > 0 && (
            <button
              onClick={() => handleDeleteClick()}
              className="btn btn-destructive w-full text-sm sm:w-auto"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                delete
              </span>
              <span>
                {t("profile:Delete Selected")} ({selectedAdverts.size})
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
                  "bg-container border-border flex cursor-pointer overflow-hidden rounded-lg border transition-all hover:shadow-md",
                  selectedAdverts.has(advert._id) && "ring-primary ring-2",
                )}
                onClick={(e) => handleAdvertClick(advert._id, e)}
              >
                <div
                  className="flex items-center justify-center self-stretch bg-cyan-50 px-6 transition-colors hover:bg-cyan-100"
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
                    className="text-primary focus:ring-primary h-5 w-5 cursor-pointer rounded border-gray-300"
                    aria-label={t("profile:Select advert", {
                      name: advert.name,
                    })}
                  />
                </div>

                <img
                  src={advert.photo ?? "/src/assets/placeholder.png"}
                  alt={advert.name}
                  className="my-4 ml-4 h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                />

                <div className="mx-4 my-4 min-w-0 flex-1">
                  <h3 className="text-heading mb-1 truncate font-semibold">
                    {advert.name}
                  </h3>
                  <p className="text-paragraph mb-2 truncate text-sm">
                    {advert.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-amber-300 px-2 py-1 text-xs text-amber-900">
                      {advert.offer
                        ? t("advert-card:advertTypeOffer")
                        : t("advert-card:advertTypeNeed")}
                    </span>
                    <span className="text-sm font-bold text-gray-700">
                      {advert.category}
                    </span>
                  </div>
                </div>

                <div className="my-4 mr-4 flex flex-col items-center justify-center rounded-lg bg-gray-100 px-6">
                  <span className="text-primary text-xl font-bold whitespace-nowrap">
                    {advert.price}€
                  </span>
                  <span className="text-paragraph text-sm">/hr</span>
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
        title={t("profile:Confirm Deletion")}
        variant="destructive"
      >
        <div className="space-y-4">
          <p className="text-paragraph">
            {deleteType === "single"
              ? t("profile:Are you sure you want to delete this advert?")
              : t("profile:Are you sure you want to delete {count} adverts?", {
                  count: selectedAdverts.size,
                })}
          </p>
          <p className="text-destructive text-sm font-medium">
            {t("profile:This action cannot be undone.")}
          </p>

          <div className="flex justify-end gap-3">
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
