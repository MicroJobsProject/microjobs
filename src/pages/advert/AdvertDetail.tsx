// DEPENDENCIES
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { enUS, es } from "date-fns/locale";

//NATIVE
import Page from "../../components/layout/Page";
import {
  useAdvertDeleteAction,
  useAdvertsDetailAction,
  useAuth,
  useUiResetError,
  useUser,
  useUserLoadAction,
} from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getAdvertById, getUi } from "../../store/selectors";
import Alert from "../../components/ui/Alert";
import Modal from "../../components/ui/Modal";

//ASSETS
import PlaceholderImage from "/placeholder.png";

function AdvertDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const isLogged = useAuth();
  const user = useUser();
  const loadUser = useUserLoadAction();
  const advertDetailAction = useAdvertsDetailAction();
  const advert = useAppSelector(getAdvertById(params.advertId));
  const { pending, error } = useAppSelector(getUi);
  const uiResetErrorAction = useUiResetError();
  const advertDeleteAction = useAdvertDeleteAction();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { t, i18n } = useTranslation([
    "detail",
    "profile",
    "advert-card",
    "advert-category",
  ]);

  const isOwner = user?.id === advert?.owner._id;

  const locale = i18n.language === "es-ES" ? es : enUS;
  const date = advert?.updatedAt ? new Date(advert.updatedAt) : new Date();
  const timeAgo = formatDistanceToNow(date, { locale });

  useEffect(() => {
    if (!params.advertId) {
      return;
    }
    if (!user && isLogged) {
      loadUser();
    }
    advertDetailAction(params.advertId);
  }, [params.advertId]);

  async function handleConfirmDelete() {
    try {
      if (advert && user) {
        await advertDeleteAction(advert?._id);
      }
      setShowDeleteModal(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error deleting adverts:", error);
    }
  }

  return (
    <>
      <Page>
        {pending && <p>Loading...</p>}
        <div className="grid grid-cols-1 items-start gap-y-8 lg:grid-cols-3 lg:gap-x-8">
          {/* Detalles del anuncio */}
          <div className="bg-container border-border col-span-2 overflow-hidden rounded-xl shadow-sm lg:col-span-2">
            <div className="relative">
              <img
                src={advert?.photo ?? PlaceholderImage}
                alt={
                  advert?.photo
                    ? t("advert-card:ariaAdvertPhoto", { name: advert.name })
                    : t("placeholder")
                }
                className="w-full object-cover"
              />
            </div>
            <div className="p-6">
              {/* Título, etiquetas y precio */}
              <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div className="flex flex-col items-start">
                  <h2 className="">{advert?.name}</h2>
                  <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                    <span
                      className="flex justify-center rounded-full bg-amber-300 px-3 py-0.5"
                      aria-label={t(
                        advert?.offer
                          ? "advert-card:ariaAdvertTypeOffer"
                          : "advert-card:ariaAdvertTypeNeed",
                      )}
                    >
                      {t(
                        advert?.offer
                          ? "advert-card:advertTypeOffer"
                          : "advert-card:advertTypeNeed",
                      )}
                    </span>
                    <span aria-hidden="true" className="hidden md:block">
                      ·
                    </span>
                    <span>{t(`advert-category:${advert?.category}`)}</span>
                    <span aria-hidden="true" className="hidden md:block">
                      ·
                    </span>
                    {advert?.updatedAt && (
                      <span>{t("detail:updatedAgo", { time: timeAgo })}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-right">
                  <h2 className="!text-primary">{advert?.price}€</h2>
                  <span>{t("per hour")}</span>
                </div>
              </div>
              {/* Botones */}
              {isOwner && (
                <div className="mb-6 flex gap-4">
                  <button
                    className="btn btn-destructive"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      delete
                    </span>
                    <span>{t("profile:Delete")}</span>
                  </button>
                </div>
              )}
              {/* Descripción */}
              <div>
                <h3 className="!mb-4">{t("Description")}</h3>
                <p>{advert?.description}</p>
              </div>
            </div>
          </div>
          {/* Detalles del usuario */}

          <div className="bg-container border-border flex h-auto flex-col gap-4 rounded-xl border p-6 shadow-sm">
            <div className="flex items-center gap-6">
              <img
                src={PlaceholderImage}
                alt={advert?.owner.username}
                className="size-15 rounded-full object-cover"
              />
              <span className="text-heading text-xl">
                {advert?.owner.username}
              </span>
            </div>
            {isLogged && (
              <div className="flex flex-col">
                {isOwner ? (
                  <Link className="btn btn-primary" to="/profile">
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      account_circle
                    </span>
                    <span>{t("My Profile")}</span>
                  </Link>
                ) : (
                  <>
                    <h3>{t("Contact Information")}</h3>
                    {/* <p>{advert?.owner.email}</p> */}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </Page>
      {error && (
        <Alert
          text={t(
            axios.isAxiosError(error)
              ? error.response?.data?.error || error.message
              : error.message,
          )}
          variant="error"
          onClick={() => uiResetErrorAction()}
        />
      )}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        title={t("Confirm Deletion")}
        variant="destructive"
      >
        <div className="space-y-4">
          <p className="text-destructive text-sm font-medium">
            {t("This action cannot be undone.")}
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setShowDeleteModal(false);
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
    </>
  );
}

export default AdvertDetail;
