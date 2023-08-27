import { CSSProperties, DragEvent, useState } from 'react';

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
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: DragEvent, index: number) => {
    setDraggingIndex(index);
    console.log('handleDragStart', index);
  };

  const handleDragOver = (e: DragEvent, index: number) => {
    e.preventDefault();
    if (draggingIndex === null) return;
    if (overIndex === index) return;
    setOverIndex(index);
    console.log('handleDragOver', index);
  };

  const handleDrop = (e: DragEvent, index: number) => {
    e.preventDefault();
    if (draggingIndex === null || overIndex === null) return;
    const newItems = [...items];
    const draggingItem = newItems[draggingIndex];
    newItems.splice(draggingIndex, 1);
    newItems.splice(overIndex, 0, draggingItem);
    setItems(newItems);
    setDraggingIndex(null);
    setOverIndex(null);
    console.log('handleDrop', index);
  };

  const handleDragEnd = (index: number | null) => {
    setDraggingIndex(null);
    setOverIndex(null);
    console.log('handleDragEnd', index);
  };

  const getStyle = (index: number): CSSProperties => {
    if (draggingIndex === null || overIndex === null) return {};
    if (index === draggingIndex) return { opacity: 0 };
    // if (index === overIndex) return { backgroundColor: 'lightgreen' };
    if (draggingIndex < overIndex && index > draggingIndex && index <= overIndex) {
      return { transform: 'translateY(-100%)' };
    }
    if (draggingIndex > overIndex && index < draggingIndex && index >= overIndex) {
      return { transform: 'translateY(100%)' };
    }
    return {};
  };

  return (
    <div className='App'>
      {items.map((item, index) => {
        return (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={() => handleDragEnd(index)}
            style={{
              position: 'relative',
              transition: 'all 0.3s ease',
              ...getStyle(index),
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '1rem',
                right: '1rem',
                bottom: 0,
                border: '1px solid black',
                padding: '1rem',
                cursor: 'move',
                transition: 'transform 0.3s ease',
                transform: draggingIndex !== null && overIndex !== null && index > draggingIndex && index === overIndex ? 'translateY(-100%)' : 'translateY(0)',
                opacity: draggingIndex !== null && overIndex !== null && index > draggingIndex && index === overIndex ? 1 : 0,
              }}
            >
              {item.content}
            </div>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '1rem',
                right: '1rem',
                bottom: 0,
                border: '1px solid black',
                padding: '1rem',
                cursor: 'move',
                transition: 'transform 0.3s ease',
                transform: draggingIndex !== null && overIndex !== null && index < draggingIndex && index === overIndex ? 'translateY(100%)' : 'translateY(0)',
                opacity: draggingIndex !== null && overIndex !== null && index < draggingIndex && index === overIndex ? 1 : 0,
              }}
            >
              {item.content}
            </div>
            <div
              style={{
                margin: '1rem',
                border: '1px solid black',
                padding: '1rem',
                cursor: 'move',
                opacity: overIndex !== null && index === overIndex ? 0 : 1,
              }}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

// handleDragStart
// handleDragOver
// handleDragOver
// handleDrop
// handleDragEnd
