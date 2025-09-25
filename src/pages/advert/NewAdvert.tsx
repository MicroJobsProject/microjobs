function NewAdvertPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Create new Advert</h1>
      <form
        //onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input type="text" name="title" placeholder="Title" />
        <input type="number" name="price" placeholder="Price" />
        <input type="radio" name="offer" placeholder="offer" />
        <input type="text" name="description" placeholder="Description" />
        <button type="submit">Create Advert</button>
      </form>
    </main>
  );
}

export default NewAdvertPage;
