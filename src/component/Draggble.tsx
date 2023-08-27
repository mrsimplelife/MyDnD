import { CSSProperties, PropsWithChildren, memo } from 'react';
import useDrag from '../hook/useDrag';

type DraggableItemProps = {
  index: number;
  children: React.ReactNode;
} & ReturnType<typeof useDrag>;

const DraggableItem = memo(({ children, dragAnimation, index, onDragEnd, onDragOver, onDragStart, onDrop }: PropsWithChildren<DraggableItemProps>) => {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e)}
      onDragEnd={onDragEnd}
      style={{ position: 'relative' }}
    >
      <div style={{ ...baseStyle, ...dragAnimation(index) }}>{children}</div>
    </div>
  );
});

export default DraggableItem;

const baseStyle: CSSProperties = {
  cursor: 'move',
};
