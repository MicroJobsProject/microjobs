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
            <div className="bg-container border-border rounded-xl border p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-heading font-heading mb-2 text-3xl font-extrabold">
                    Create new Advert
                  </h2>
                  <p className="text-paragraph">??????</p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-heading block text-sm font-medium"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      className={`bg-container text-paragraph placeholder:text-paragraph/60 block w-full rounded-lg border py-2 pr-3 pl-10 text-sm focus:ring-1 focus:outline-none`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="price"
                    className="text-heading block text-sm font-medium"
                  >
                    Price
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      required
                      className={`bg-container text-paragraph placeholder:text-paragraph/60 block w-full rounded-lg border py-2 pr-3 pl-10 text-sm focus:ring-1 focus:outline-none`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="serviceFieldset">Service:</label>
                  <fieldset name="serviceFieldset">
                    <label htmlFor="offer">Need</label>
                    <input
                      type="radio"
                      name="serviceRadio"
                      value={"need"}
                      defaultChecked
                    />
                    <label htmlFor="offer">Offer</label>
                    <input type="radio" name="serviceRadio" value={"offer"} />
                  </fieldset>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-heading block text-sm font-medium"
                  >
                    Description
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      required
                      className={`bg-container text-paragraph placeholder:text-paragraph/60 block w-full rounded-lg border py-2 pr-3 pl-10 text-sm focus:ring-1 focus:outline-none`}
                    />
                  </div>
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

                <button type="submit" className={`btn btn-primary w-full`}>
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
