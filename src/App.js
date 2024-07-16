import { useState } from 'react';

export default function App() {
  // Lifting State Up
  // Moved from Form to Common Parent between it and PackingList
  // This way we can share the state between them
  const [items, setItems] = useState([]);
  // We lifted the function to the parent component
  function handleAddItems(item) {
    // You can't mutate the state directly
    // React is about immutability
    // You can use the spread operator to create a new array
    setItems([...items, item]);
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // We can pass anything like a prop even a function
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  // Controlled Element steps:
  // 1_ Define the state like quantity above
  // 2_ Use the state on the element we want to controll
  // 3_ Update that state variable with the onChange event

  function handleSubmit(e) {
    e.preventDefault();
    // Check if Empty
    if (!description.trim()) return;
    // Create new item
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    // Add the new item to the list
    onAddItems(newItem);
    // Return to Initial State
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity}x {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const packedItems = items.filter(item => item.packed);
  const percentageOfPackedItems = Math.round(
    (packedItems.length / items.length) * 100
  );

  return (
    <footer className="stats">
      <em>
        {percentageOfPackedItems === 100
          ? 'You got everything! Ready to go ✈'
          : `You have ${items.length} items on your list, and you already packed
        ${packedItems.length} ${
              packedItems.length === 1 ? 'item' : 'items'
            } (${percentageOfPackedItems}%)`}
      </em>
    </footer>
  );
}
