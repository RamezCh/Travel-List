import { useState } from 'react';

export default function Form({ onAddItems }) {
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
    <form id="formID" name="Form" className="add-form" onSubmit={handleSubmit}>
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
