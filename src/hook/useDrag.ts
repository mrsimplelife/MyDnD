import { CSSProperties, DragEvent, useCallback, useState } from 'react';

function useDrag(handleDrop: (index: number, change: number) => void) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const onDragStart = useCallback((index: number) => {
    setDraggingIndex(index);
  }, []);

  const onDragOver = useCallback(
    (e: DragEvent, index: number) => {
      e.preventDefault();
      if (draggingIndex === null || overIndex === index) return;
      setOverIndex(index);
    },
    [draggingIndex, overIndex]
  );

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      if (draggingIndex === null || overIndex === null) return;
      handleDrop(draggingIndex, overIndex);
      setDraggingIndex(null);
      setOverIndex(null);
    },
    [draggingIndex, handleDrop, overIndex]
  );

  const onDragEnd = useCallback(() => {
    setDraggingIndex(null);
    setOverIndex(null);
  }, []);

  const dragAnimation = (index: number): CSSProperties => {
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

  return { onDragStart, onDragOver, onDrop, onDragEnd, dragAnimation };
}

export default useDrag;
