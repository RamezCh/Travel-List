import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import { Stats } from './Stats';

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

  function handleClearList() {
    const confirmed = window.confirm(
      'Are you sure you want to delete all Items?'
    );
    if (confirmed) setItems([]);
  }

  // We can pass anything like a prop even a function
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onClearList={handleClearList}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
