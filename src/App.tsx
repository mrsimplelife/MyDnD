import { CSSProperties, DragEvent, PropsWithChildren, memo, useCallback, useState } from 'react';

const initialItems = Array.from({ length: 1000 }).map((_, i) => ({
  id: i + 1,
  content: `아이템 ${i + 1}`,
}));

function App() {
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

  const { handleDragStart, handleDragOver, handleDrop, handleDragEnd, getStyle } = useDrag(handleSort);

  return (
    <div>
      {items.map((item, index) => (
        <DraggableItem
          key={item.id}
          index={index}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragEnd={handleDragEnd}
          getStyle={getStyle}
        >
          <div style={baseStyle2}>{item.content}</div>
        </DraggableItem>
      ))}
    </div>
  );
}
const baseStyle2: CSSProperties = {
  padding: '10px 20px',
  margin: '5px 0',
  border: '1px solid #e0e0e0',
  borderRadius: '5px',
  backgroundColor: '#f5f5f5',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
};

export default App;

type DraggableItemProps = {
  index: number;
  children: React.ReactNode;
} & ReturnType<typeof useDrag>;

const DraggableItem = memo(
  ({ index, children, getStyle, handleDragEnd, handleDragOver, handleDragStart, handleDrop }: PropsWithChildren<DraggableItemProps>) => {
    return (
      <div
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDrop={(e) => handleDrop(e)}
        onDragEnd={handleDragEnd}
        style={{ position: 'relative' }}
      >
        <div style={{ ...baseStyle, ...getStyle(index) }}>{children}</div>
      </div>
    );
  }
);

const baseStyle: CSSProperties = {
  cursor: 'move',
};

function useDrag(onDrop: (index: number, change: number) => void) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const handleDragStart = useCallback((index: number) => {
    setDraggingIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (e: DragEvent, index: number) => {
      e.preventDefault();
      if (draggingIndex === null || overIndex === index) return;
      setOverIndex(index);
    },
    [draggingIndex, overIndex]
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      if (draggingIndex === null || overIndex === null) return;
      onDrop(draggingIndex, overIndex);
      setDraggingIndex(null);
      setOverIndex(null);
    },
    [draggingIndex, onDrop, overIndex]
  );

  const handleDragEnd = useCallback(() => {
    setDraggingIndex(null);
    setOverIndex(null);
  }, []);

  const getStyle = (index: number): CSSProperties => {
    if (draggingIndex === null || overIndex === null) return {};
    if (index === draggingIndex) return { opacity: 0 };
    if (draggingIndex > overIndex && index < draggingIndex && index >= overIndex) {
      return { transition: 'transform 0.3s ease', transform: 'translateY(100%)' };
    }
    if (draggingIndex < overIndex && index > draggingIndex && index <= overIndex) {
      return { transition: 'transform 0.3s ease', transform: 'translateY(-100%)' };
    }

    return { transition: 'transform 0.3s ease' };
  };

  return { handleDragStart, handleDragOver, handleDrop, handleDragEnd, getStyle };
}
