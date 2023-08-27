import { CSSProperties, DragEvent, PropsWithChildren, memo, useCallback, useState } from 'react';

const initialItems = [
  { id: 1, content: '아이템 1' },
  { id: 2, content: '아이템 2' },
  { id: 3, content: '아이템 3' },
  { id: 4, content: '아이템 4' },
  { id: 5, content: '아이템 5' },
  { id: 6, content: '아이템 6' },
];

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
      {items.map((item, index) => {
        if (index === 4) console.log(item, index);
        return (
          <DraggableItem
            key={item.id}
            index={index}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragEnd={handleDragEnd}
            getStyle={getStyle}
          >
            {item.content}
          </DraggableItem>
        );
      })}
    </div>
  );
}

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
