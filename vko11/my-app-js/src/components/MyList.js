const MyList = ({ header, items, updateItem }) => {
  return (
    <div>
      <h2>{header}</h2>
      <ol>
        {items.map((item) => (
          <li
            onClick={() => updateItem(item.id)}
            key={item.id}
            style={{ textDecoration: item.clicked ? "line-through" : "" }}
          >
            {item.text}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MyList;
