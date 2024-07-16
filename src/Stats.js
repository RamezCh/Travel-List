export function Stats({ items }) {
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
