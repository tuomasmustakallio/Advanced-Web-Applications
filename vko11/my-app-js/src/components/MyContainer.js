import { useState } from "react";
import MyList from "./MyList";
import { useTranslation } from "react-i18next";

const MyContainer = () => {
  const { t } = useTranslation();

  const [items, setItems] = useState([
    { id: "1", text: "This is an item", clicked: false },
    { id: "2", text: "Also this", clicked: false },
  ]);

  const [text, setText] = useState("");

  const addItem = (text) => {
    const newItem = { id: (items.length + 1).toString(), text, clicked: false };
    setItems([...items, newItem]);
    setText("");
  };

  const updateItem = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, clicked: !item.clicked };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div>
      <h1>{t("frontpage")}</h1>
      <MyList
        header="Really epic list component"
        items={items}
        updateItem={updateItem}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addItem(text);
        }}
      >
        <input
          type="text"
          placeholder="Add new item"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default MyContainer;
