import { useAppDispatch } from "../../store";

import { advertsCategories, advertsCreate } from "../../store/actions";
import { useEffect, useState, type FormEvent } from "react";
import { getAdvertsCategories } from "../../store/selectors";
import { useAppSelector } from "../../store";
import AdvertCategory from "../../components/advert/AdvertCategory";
import { useTranslation } from "react-i18next";
import PhotoInput from "../../components/advert/PhotoInput";

function NewAdvertPage() {
  const { t } = useTranslation("create");
  const categories = useAppSelector(getAdvertsCategories);
  const dispatch = useAppDispatch();

  const maxDescriptionChars = 600;
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!categories.length) {
      dispatch(advertsCategories());
    }
  }, [dispatch, categories.length]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const photoFile = form.photo.files[0];
    if (photoFile && !photoFile.type.startsWith("image/")) {
      alert("Please select a valid image before submitting.");
      return;
    }
    if (!photoFile) {
      data.append("photo", "");
    }

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
              <div className="flex w-full items-center overflow-hidden rounded-lg border border-gray-300">
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  min={0}
                  required
                  step={0.01}
                  className="flex-1 px-4 py-2 focus:outline-none"
                />
                <span className="px-3 whitespace-nowrap">{t("€/hr")}</span>
              </div>
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
                {t("Description")}*
              </label>
              <textarea
                id="description"
                name="description"
                placeholder={
                  t("Enter a detailed description (max ") +
                  maxDescriptionChars +
                  t(" characters)")
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={maxDescriptionChars}
                rows={6}
                required
                className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <div className="mt-1 text-right text-xs text-gray-500">
                {description.length}/{maxDescriptionChars} characters
              </div>
            </div>

            <PhotoInput></PhotoInput>

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

export default NewAdvertPage;

//TODO: validate min price 0.01
//TODO: validate file is image
//TODO: no photo if its not loaded
//TODO: maximum filesize
