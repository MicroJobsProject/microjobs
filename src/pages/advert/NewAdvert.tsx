import { useAppDispatch } from "../../store";
import type { AdvertData } from "./types";
import { advertsCreate } from "../../store/actions";
import type { FormEvent } from "react";
import { getAdvertsCategories } from "../../store/selectors";
import { useAppSelector } from "../../store";
import AdvertCategory from "../../components/advert/AdvertCategory";

function NewAdvertPage() {
  const categories = useAppSelector(getAdvertsCategories);
  const dispatch = useAppDispatch();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const newAdvertData: AdvertData = {
      name: data.get("name") as string,
      price: data.get("price") as string,
      offer: data.get("serviceRadio") == "offer" ? "true" : "false",
      category: data.get("category") as string,
      description: data.get("description") as string,
    };
    console.log(newAdvertData);

    await dispatch(advertsCreate(newAdvertData));
  }

  return (
    <>
      <div className="wrapper">
        <h2 className="text-heading font-heading mb-2 text-3xl font-extrabold">
          Create new Advert
        </h2>
        <p className="text-paragraph mb-2">
          Post your service need or offer to connect with local professionals
          and particulars.
        </p>
        <div className="bg-container border-border rounded-xl border p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col lg:col-span-2">
              <label htmlFor="name" className="input-label">
                Title*
              </label>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="eg., Need experienced plumber for kitchen renovation"
                  required
                  className="input"
                />
              </div>
            </div>
            <div className="flex flex-col lg:col-span-2">
              <label htmlFor="price" className="input-label">
                Price*
              </label>
              <input
                type="number"
                name="price"
                placeholder="0.00€"
                required
                className="input"
              />
            </div>
            <div>
              <fieldset
                name="serviceFieldset"
                className="flex flex-row items-center justify-center gap-4"
              >
                <legend className="input-label">Advert Type</legend>
                <div className="flex grow flex-row items-center justify-center">
                  <input
                    id="need"
                    type="radio"
                    name="serviceRadio"
                    value="need"
                    defaultChecked
                    className="peer hidden"
                  />
                  <label htmlFor="need" className="input-radio-label grow">
                    Need Service
                  </label>
                </div>
                <div className="flex grow flex-row items-center justify-center">
                  <input
                    id="offer"
                    type="radio"
                    name="serviceRadio"
                    value="offer"
                    className="peer hidden"
                  />
                  <label htmlFor="offer" className="input-radio-label grow">
                    Offer Service
                  </label>
                </div>
              </fieldset>
            </div>
            <div className="flex flex-col lg:col-span-2">
              <label htmlFor="description" className="input-label">
                Description
              </label>

              <input
                type="text"
                name="description"
                placeholder="Description"
                required
                className="input"
              />
            </div>

            <fieldset
              name="categoryFieldset"
              className="flex flex-row items-center justify-center gap-4"
            >
              <legend className="input-label">Category*</legend>
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.length ? (
                  categories.map((category) => (
                    <AdvertCategory
                      key={category.name}
                      name={category.name}
                      icon={category.icon}
                    />
                  ))
                ) : (
                  <p>Categories not found</p>
                )}
              </div>
            </fieldset>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                <span className="material-symbols-outlined">add_circle</span>
                Create Advert
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
//TODO: add photo upload
//TODO: add category select, not charging after refresh page

export default NewAdvertPage;
