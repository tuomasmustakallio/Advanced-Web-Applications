import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Book from "./components/Book";
import AddBook from "./components/AddBook";
import React from "react";

function App() {
  const [book, setBook] = React.useState({});

  return (
    <Router>
      <div className="App">
        <h1>books</h1>
        <Routes>
          <Route path="/" element={<AddBook setBook={setBook} />} />
          <Route path="/book/:id" element={<Book book={book} />} />
          <Route
            path="*"
            element={<h1>404: This is not the webpage you are looking for</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
