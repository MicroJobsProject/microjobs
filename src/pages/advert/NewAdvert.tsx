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
    <main style={{ padding: 24 }}>
      <h1>Create new Advert</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Name" required />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" placeholder="Price" required />
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

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input type="text" name="category" placeholder="Category" required />
        </div>

        <button type="submit">Create Advert</button>
      </form>
    </main>
  );
}
//TODO: add photo upload
//TODO: add category select
//TODO: style the page

export default NewAdvertPage;
