import type { Advert } from "../../pages/advert/types";

function AdvertCard({ advert }: { advert: Advert }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:scale-102 hover:shadow-md">
      <img src={advert.photo} className="h-48 w-full object-cover" />
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full px-2.5 py-0.5 text-xs font-medium">
            {advert.offer ? "Offer Service" : "Need Service"}
          </span>
          <span className="text-lg font-bold">{advert.price}$/hr</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold">{advert.name}</h3>
        <div className="mb-3 flex items-center">
          <span className="material-symbols-outlined mr-3 !text-4xl">
            account_circle
          </span>
          <span className="text-sm">{advert.owner.username}</span>
        </div>
        <p className="text-sm">{advert.description}</p>
      </div>
    </div>
  );
}

export default AdvertCard;
