import { useParams } from "react-router-dom";
import React from "react";

const Book = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    async function doStuff() {
      fetch(`/api/books/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    doStuff();
  }, [id]);
  return (
    <div>
      {data ? (
        <div>
          <p>{data.name}</p>
          <p>{data.author}</p>
          <p>{data.pages}</p>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Book;
