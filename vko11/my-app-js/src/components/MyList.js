const MyList = ({header, items, updateItem}) => {
  return (
    <div>
      <h1>{header}</h1>
      <ol>
        {items.map((item) => (
          <li onClick={() => updateItem(item.id)} key={item.id} style={{textDecoration:  item.clicked ? "line-through" : ""}} >{item.text}</li>
        ))}
      </ol>
    </div>
  );
}

export default MyList;
