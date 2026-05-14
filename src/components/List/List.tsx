import "./List.css";

export type ListItem = {
  title: string;
  description: string;
};

interface ListProps {
  items: ListItem[];
}

export function List({ items }: ListProps) {
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.title}>
          <span className="list-icon"></span>
          <div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
