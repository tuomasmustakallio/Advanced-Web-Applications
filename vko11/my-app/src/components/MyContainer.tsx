import { useState } from "react";
import { Item } from "../types/item";
import MyList from "./MyList";

const MyContainer = () => {
    const [items, setItems] = useState<Item[]>([
        { id: "1", text: "This is an item", clicked: false},
        { id: "2", text: "Also this", clicked: false},
    ]);

    const [text, setText] = useState<string>("");

    const addItem = (text: string) => {
        const newItem: Item = { id: (items.length+1).toString(), text, clicked: false };
        setItems([...items, newItem]);
        setText("");
    };

    const updateItem = (id: string) => {
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, clicked: !item.clicked };
            }
            return item;
        });
        setItems(updatedItems);
    };

  return(
    <div>
    <MyList header="Really epic list component" items={items} updateItem={updateItem}/>
    <form onSubmit={(e) => {
        e.preventDefault();
        addItem(text);
    }}>
        <input type="text" placeholder="Add new item" value={text} onChange={(e) => setText(e.target.value)}/>
        <button type="submit">Add</button>
    </form>
    </div>
  )
}

export default MyContainer;