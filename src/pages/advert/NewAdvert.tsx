import { useAppDispatch } from "../../store";
import type { AdvertData } from "./types";
import { advertsCreate } from "../../store/actions";
import type { FormEvent } from "react";

function NewAdvertPage() {
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
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-heading font-heading mb-2 text-3xl font-extrabold">
              Create new Advert
            </h2>
            <p className="text-paragraph">
              Post your service need or offer to connect with local
              professionals and particulars.
            </p>
            <div className="bg-container border-border rounded-xl border p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col lg:col-span-2">
                  <label htmlFor="name" className="mb-2 font-medium">
                    Title*
                  </label>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="eg., Need experienced plumber for kitchen renovation"
                      required
                      className="h-10.5 w-full rounded-lg border border-gray-200 px-3 py-2 placeholder:text-gray-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:col-span-2">
                  <label htmlFor="price" className="mb-2 font-medium">
                    Price*
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00€"
                    required
                    className="h-10.5 w-full rounded-lg border border-gray-200 px-3 py-2 placeholder:text-gray-200"
                  />
                </div>

                <div>
                  <fieldset
                    name="serviceFieldset"
                    className="flex flex-row items-center justify-center gap-4"
                  >
                    <div className="flex grow flex-row items-center justify-center">
                      <input
                        id="need"
                        type="radio"
                        name="serviceRadio"
                        value="need"
                        defaultChecked
                        className="peer hidden"
                      />
                      <label
                        htmlFor="need"
                        className="peer-checked:bg-primary border-border grow cursor-pointer rounded-md border px-2 py-1 text-center peer-checked:text-white"
                      >
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
                      <label
                        htmlFor="offer"
                        className="peer-checked:bg-primary border-border grow cursor-pointer rounded-md border px-2 py-1 text-center peer-checked:text-white"
                      >
                        Offer Service
                      </label>
                    </div>
                  </fieldset>
                </div>

                <div className="flex flex-col lg:col-span-2">
                  <label htmlFor="description" className="mb-2 font-medium">
                    Description
                  </label>

                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    required
                    className="h-10.5 w-full rounded-lg border border-gray-200 px-3 py-2 placeholder:text-gray-200"
                  />
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Create Advert
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
//TODO: add photo upload
//TODO: add category select
//TODO: style the page

export default NewAdvertPage;
