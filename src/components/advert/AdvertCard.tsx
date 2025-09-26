import type { Advert } from "../../pages/advert/types";

function AdvertCard({ advert }: { advert: Advert }) {
  return (
    <article
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:scale-102 hover:shadow-md"
      aria-label={`Advert for ${advert.name}`}
    >
      <img
        src={advert.photo ?? "/src/assets/placeholder.png"}
        className="h-48 w-full object-cover"
        alt={`Photo for ${advert.name}`}
      />
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            aria-label={`Service type: ${advert.offer ? "Offer" : "Need"}`}
          >
            {advert.offer ? "Offer Service" : "Need Service"}
          </span>
          <span
            className="text-lg font-bold"
            aria-label={`Price: ${advert.price} dollars per hour`}
          >
            {advert.price}$/hr
          </span>
        </div>
        <h3 className="mb-2 text-lg font-semibold">{advert.name}</h3>
        <div className="mb-3 flex items-center">
          <span
            className="material-symbols-outlined mr-3 !text-4xl"
            aria-hidden="true"
          >
            account_circle
          </span>
          <span
            className="text-sm"
            aria-label={`Advert owner: ${advert.owner.username}`}
          >
            {advert.owner.username}
          </span>
        </div>
        <p
          className="line-clamp-2 text-sm"
          aria-label={`Description: ${advert.description}`}
        >
          {advert.description}
        </p>
      </div>
    </article>
  );
}

export default AdvertCard;
