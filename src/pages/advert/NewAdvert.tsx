import { useAppDispatch, useAppSelector } from "../../store";
import { advertsCategories, advertsCreate } from "../../store/actions";
import { getAdvertsCategories } from "../../store/selectors";
import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import AdvertCategory from "../../components/advert/AdvertCategory";
import PhotoInput from "../../components/advert/PhotoInput";

function NewAdvertPage() {
  const { t } = useTranslation("create");
  const categories = useAppSelector(getAdvertsCategories);
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const maxDescriptionChars = 600;

  useEffect(() => {
    if (!categories.length) dispatch(advertsCategories());
  }, [dispatch, categories.length]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData();
    data.append(
      "name",
      (form.elements.namedItem("name") as HTMLInputElement).value,
    );
    data.append(
      "price",
      (form.elements.namedItem("price") as HTMLInputElement).value,
    );
    data.append(
      "description",
      (form.elements.namedItem("description") as HTMLTextAreaElement).value,
    );

    const offerValue = (
      form.elements.namedItem("serviceRadio") as RadioNodeList
    ).value;
    data.append("offer", offerValue === "offer" ? "true" : "false");

    const categoryInput = form.elements.namedItem(
      "category",
    ) as HTMLInputElement;
    if (categoryInput) {
      data.append("category", categoryInput.value);
    }

    if (photoFile) {
      data.append("photo", photoFile);
    } else {
      data.append("photo", "");
    }

    await dispatch(advertsCreate(data));
  }

  return (
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
            <input
              id="name"
              type="text"
              name="name"
              placeholder={t("titlePlaceholder")}
              required
              className="input"
            />
          </div>

          <div className="flex flex-col lg:col-span-2">
            <label htmlFor="price" className="input-label">
              {t("Price")}*
            </label>
            <div className="flex w-full items-center overflow-hidden rounded-lg border border-gray-300">
              <input
                id="price"
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

          <div className="flex flex-col lg:col-span-2">
            <label htmlFor="description" className="input-label">
              {t("Description")}*
            </label>
            <textarea
              id="description"
              name="description"
              placeholder={t(
                "Enter a detailed description (max {{number}} characters)",
                { number: maxDescriptionChars },
              )}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={maxDescriptionChars}
              rows={6}
              required
              className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <div className="mt-1 text-right text-xs text-gray-500">
              {description.length}/{maxDescriptionChars} {t("characters")}
            </div>
          </div>

          <PhotoInput
            onFileSelect={setPhotoFile}
            onCompressingChange={setIsCompressing}
          />

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
            <button
              type="submit"
              className="btn btn-primary flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isCompressing}
            >
              {isCompressing ? (
                <>
                  <span
                    className="material-symbols-outlined animate-spin"
                    translate="no"
                  >
                    progress_activity
                  </span>
                  {t("Compressing image...")}
                </>
              ) : (
                <>
                  <span
                    className="material-symbols-outlined"
                    aria-hidden="true"
                    translate="no"
                  >
                    add_circle
                  </span>
                  {t("Create Advert")}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewAdvertPage;
