import { useNavigate } from "react-router-dom";

const AddBook = ({ setBook }) => {
  const navigate = useNavigate();

  const addBookFetch = (event) => {
    event.preventDefault();
    const book = {
      name: event.target.name.value,
      author: event.target.author.value,
      pages: event.target.pages.value,
    };
    fetch("/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setBook(data);
        navigate(`/book/${data.name}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <form onSubmit={addBookFetch}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="author">Author</label>
        <input type="text" id="author" name="author" />
        <label htmlFor="pages">Pages</label>
        <input type="number" id="pages" name="pages" />
        <input type="submit" id="submit" value="Add book" />
      </form>
    </div>
  );
};

export default AddBook;
