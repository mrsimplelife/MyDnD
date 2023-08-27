import { CSSProperties } from 'react';
import DraggableItem from './component/Draggble';
import useDrag from './hook/useDrag';
import useItem from './hook/useItem';

function App() {
  const { handleSort, items } = useItem();
  const { dragAnimation, onDragEnd, onDragOver, onDragStart, onDrop } = useDrag(handleSort);

  return (
    <div>
      {items.map((item, index) => (
        <DraggableItem
          key={item.id}
          index={index}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragEnd={onDragEnd}
          dragAnimation={dragAnimation}
        >
          <div style={baseStyle}>{item.content}</div>
        </DraggableItem>
      ))}
    </div>
  );
}
const baseStyle: CSSProperties = {
  padding: '10px 20px',
  margin: '5px 0',
  border: '1px solid #e0e0e0',
  borderRadius: '5px',
  backgroundColor: '#f5f5f5',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
};

export default App;
