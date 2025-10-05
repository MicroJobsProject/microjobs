// DEPENDENCIES
import { useParams } from "react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

//NATIVE
import Page from "../../components/layout/Page";
import { useAdvertsDetailAction, useUiResetError } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getAdvertById, getUi } from "../../store/selectors";
import placeholder from "../../assets/placeholder.png";
import { formatDistanceToNow } from "date-fns";
import Alert from "../../components/ui/Alert";
import axios from "axios";

function AdvertDetail() {
  const params = useParams();
  const advertDetailAction = useAdvertsDetailAction();
  const advert = useAppSelector(getAdvertById(params.advertId));
  const { pending, error } = useAppSelector(getUi);
  const uiResetErrorAction = useUiResetError();
  const { t } = useTranslation();

  useEffect(() => {
    if (!params.advertId) {
      return;
    }
    advertDetailAction(params.advertId);
  }, [params.advertId]);

  return (
    <>
      <Page>
        {pending && <p>Loading...</p>}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
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
              <div className="mb-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <h2>{advert?.name}</h2>
                  <div className="flex gap-2">
                    <span
                      className="rounded-full bg-amber-300 px-2.5 py-0.5 text-xs font-medium"
                      aria-label={t(
                        advert?.offer
                          ? "ariaAdvertTypeOffer"
                          : "ariaAdvertTypeNeed",
                      )}
                    >
                      {t(advert?.offer ? "advertTypeOffer" : "advertTypeNeed")}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{advert?.category}</span>
                    <span aria-hidden="true">·</span>
                    {advert?.updatedAt && (
                      <span>
                        uploaded{" "}
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
              <div className="mb-6 flex gap-4">
                <button className="btn btn-destructive">
                  <span className="material-symbols-outlined">delete</span>
                  <span>Delete</span>
                </button>
              </div>
              {/* Descripción */}
              <div>
                <h3 className="!mb-4">Description</h3>
                <p>{advert?.description}</p>
              </div>
            </div>
          </div>
          {/* Detalles del usuario */}
          <div className="bg-container border-border flex h-1/4 flex-col gap-4 rounded-xl border p-8 shadow-sm">
            <div className="flex items-center gap-6">
              <img
                src={placeholder}
                alt={advert?.owner.username}
                className="size-15 rounded-full object-cover"
              />
              <span className="text-heading text-xl">
                {advert?.owner.username}
              </span>
            </div>
            <h3>Contact Information</h3>
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
    </>
  );
}

export default AdvertDetail;
