import { useCallback, useState } from 'react';

const initialItems = Array.from({ length: 1000 }).map((_, i) => ({
  id: i + 1,
  content: `아이템 ${i + 1}`,
}));

function useItem() {
  const [items, setItems] = useState(initialItems);
  const handleSort = useCallback(
    (index: number, change: number) => {
      const newItems = [...items];
      const draggingItem = newItems[index];
      newItems.splice(index, 1);
      newItems.splice(change, 0, draggingItem);
      setItems(newItems);
    },
    [items]
  );
  return { items, handleSort };
}

export default useItem;
