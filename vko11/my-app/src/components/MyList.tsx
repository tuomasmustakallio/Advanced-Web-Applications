import { Item } from "../types/item";

type MyListProps = {
  header: string;
  items: Item[];
  updateItem: (id: string) => void;
};

const MyList = (props: MyListProps) => {
  return (
    <div>
      <h1>{props.header}</h1>
      <ol>
        {props.items.map((item) => (
          <li onClick={() => props.updateItem(item.id)} key={item.id} style={{textDecoration:  item.clicked ? "line-through" : ""}} >{item.text}</li>
        ))}
      </ol>
    </div>
  );
}

export default MyList;
