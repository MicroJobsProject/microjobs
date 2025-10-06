// DEPENDENCIES
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

//NATIVE
import Page from "../../components/layout/Page";
import {
  useAdvertDeleteAction,
  useAdvertsDetailAction,
  useAuth,
  useUiResetError,
  useUser,
} from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getAdvertById, getUi } from "../../store/selectors";
import placeholder from "../../assets/placeholder.png";
import { formatDistanceToNow } from "date-fns";
import Alert from "../../components/ui/Alert";
import clsx from "clsx";
import Modal from "../../components/ui/Modal";

function AdvertDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const isLogged = useAuth();
  const user = useUser();
  const advertDetailAction = useAdvertsDetailAction();
  const advert = useAppSelector(getAdvertById(params.advertId));
  const { pending, error } = useAppSelector(getUi);
  const uiResetErrorAction = useUiResetError();
  const advertDeleteAction = useAdvertDeleteAction();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { t } = useTranslation(["profile"]);

  useEffect(() => {
    if (!params.advertId) {
      return;
    }
    advertDetailAction(params.advertId);
  }, [params.advertId]);

  async function handleConfirmDelete() {
    try {
      if (advert) {
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
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-8">
          {/* Detalles del anuncio */}
          <div className="bg-container border-border col-span-2 overflow-hidden rounded-xl shadow-sm lg:col-span-2">
            <div className="relative">
              <img
                src={advert?.photo ?? placeholder}
                alt={
                  advert?.photo
                    ? t("ariaAdvertPhoto", { name: advert.name })
                    : t("placeholder")
                }
                className="w-full object-cover"
              />
            </div>
            <div className="p-6">
              {/* Título, etiquetas y precio */}
              <div className="mb-6 flex items-start justify-between">
                <div className="flex flex-col">
                  <h2>{advert?.name}</h2>
                  <div className="flex flex-col gap-2 md:flex-row">
                    <span
                      className="rounded-full bg-amber-300 px-3 py-0.5"
                      aria-label={t(
                        advert?.offer
                          ? "ariaAdvertTypeOffer"
                          : "ariaAdvertTypeNeed",
                      )}
                    >
                      {t(advert?.offer ? "advertTypeOffer" : "advertTypeNeed")}
                    </span>
                    <span aria-hidden="true" className="hidden md:block">
                      ·
                    </span>
                    <span>{advert?.category}</span>
                    <span aria-hidden="true" className="hidden md:block">
                      ·
                    </span>
                    {advert?.updatedAt && (
                      <span>
                        Uploaded{" "}
                        {formatDistanceToNow(new Date(advert.updatedAt))} ago
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-right">
                  <h2 className="!text-primary">{advert?.price}€</h2>
                  <span>per hour</span>
                </div>
              </div>
              {/* Botones */}
              {user?.id === advert?.owner._id && (
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
                    <span>Delete</span>
                  </button>
                </div>
              )}
              {/* Descripción */}
              <div>
                <h3 className="!mb-4">Description</h3>
                <p>{advert?.description}</p>
              </div>
            </div>
          </div>
          {/* Detalles del usuario */}
          <div className="bg-container border-border flex h-auto flex-col rounded-xl border p-6 shadow-sm md:h-45">
            <div className="mb-2 flex items-center gap-6">
              <img
                src={placeholder}
                alt={advert?.owner.username}
                className="size-15 rounded-full object-cover"
              />
              <span className="text-heading text-xl">
                {advert?.owner.username}
              </span>
            </div>
            {isLogged && (
              <>
                <h3>Contact Information</h3>
                <p>email</p>
              </>
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
        title={t("profile:Confirm Deletion")}
        variant="destructive"
      >
        <div className="space-y-4">
          <p className="text-destructive text-sm font-medium">
            {t("profile:This action cannot be undone.")}
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
