import { useAppDispatch } from "../../store";

import { advertsCategories, advertsCreate } from "../../store/actions";
import { useEffect, type FormEvent } from "react";
import { getAdvertsCategories } from "../../store/selectors";
import { useAppSelector } from "../../store";
import AdvertCategory from "../../components/advert/AdvertCategory";
import { useTranslation } from "react-i18next";

function NewAdvertPage() {
  const { t } = useTranslation("create");
  const categories = useAppSelector(getAdvertsCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!categories.length) {
      dispatch(advertsCategories());
    }
  }, [dispatch, categories.length]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("offer", form.offer.value === "offer" ? "true" : "false");

    console.log("FormData entries:");
    for (const pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    await dispatch(advertsCreate(data));
  }

  return (
    <>
      <div className="wrapper">
        <h2 className="text-heading font-heading mb-2 text-3xl font-extrabold">
          {t("createTitle")}
        </h2>
        <p className="text-paragraph mb-2">{t("createSubtitle")}</p>
        <div className="bg-container border-border rounded-xl border p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col lg:col-span-2">
              <label htmlFor="name" className="input-label">
                {t("Title")}*
              </label>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder={t("titlePlaceholder")}
                  required
                  className="input"
                />
              </div>
            </div>
            <div className="flex flex-col lg:col-span-2">
              <label htmlFor="price" className="input-label">
                {t("Price")}*
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
                <legend className="input-label">{t("Advert Type")}</legend>
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
                    {t("advertTypeNeed")}
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
                    {t("advertTypeOffer")}
                  </label>
                </div>
              </fieldset>
            </div>
            <div className="flex flex-col lg:col-span-2">
              <label htmlFor="description" className="input-label">
                {t("Description")}
              </label>

              <input
                type="text"
                name="description"
                placeholder={t("Description")}
                required
                className="input"
              />
            </div>

            <div className="flex flex-col lg:col-span-2">
              <label htmlFor="photo" className="input-label">
                {t("Photo")}
              </label>

              <input
                type="file"
                accept="image/*"
                name="photo"
                placeholder={t("Photo")}
                className="input"
              />
            </div>

            <fieldset
              name="categoryFieldset"
              className="flex flex-row items-center justify-center gap-4"
            >
              <legend className="input-label">{t("Category")}*</legend>
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
                  <p>{t("Categories not found")}</p>
                )}
              </div>
            </fieldset>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                <span className="material-symbols-outlined" aria-hidden="true">
                  add_circle
                </span>
                {t("Create Advert")}
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
