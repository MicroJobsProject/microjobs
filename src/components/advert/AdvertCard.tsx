import { useTranslation } from "react-i18next";
import type { Advert } from "../../pages/advert/types";

function AdvertCard({ advert }: { advert: Advert }) {
  const { t } = useTranslation();

  return (
    <article
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:scale-102 hover:shadow-md"
      aria-label={t("ariaAdvertName", { name: advert.name })}
    >
      <img
        src={advert.photo ?? "/src/assets/placeholder.png"}
        className="h-48 w-full object-cover"
        alt={t("ariaAdvertPhoto", { name: advert.name })}
      />
      <div className="h-60 p-6">
        <div className="mb-3 flex items-center justify-between">
          <span
            className="rounded-full bg-amber-300 px-2.5 py-0.5 text-xs font-medium"
            aria-label={t(
              advert.offer ? "ariaAdvertTypeOffer" : "ariaAdvertTypeNeed",
            )}
          >
            {t(advert.offer ? "advertTypeOffer" : "advertTypeNeed")}
          </span>
          <span
            className="text-primary text-lg font-bold"
            aria-label={t("ariaAdvertPrice", { price: advert.price })}
          >
            {advert.price}€/hr
          </span>
        </div>
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
          {advert.name}
        </h3>
        <div className="mb-3 flex items-center">
          <span
            className="material-symbols-outlined mr-3 !text-4xl"
            aria-hidden="true"
          >
            account_circle
          </span>
          <span
            className="text-sm"
            aria-label={t("ariaAdvertOwner", { owner: advert.owner.username })}
          >
            {advert.owner.username}
          </span>
        </div>
        <p
          className="line-clamp-2 text-sm"
          aria-label={t("ariaAdvertDescription", {
            description: advert.description,
          })}
        >
          {advert.description}
        </p>
      </div>
    </article>
  );
}

export default AdvertCard;
