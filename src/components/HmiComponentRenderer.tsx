import React, { MouseEvent as ReactMouseEvent } from 'react';
import type { HmiComponent } from '../types/hmi';

// --- HMI COMPONENT RENDERER ---
export const HmiComponentRenderer: React.FC<{
  component: HmiComponent;
  onSelect: (e: ReactMouseEvent, id: string) => void;
  selected: boolean;
}> = ({ component, onSelect, selected }) => {
  const style: React.CSSProperties = {
    left: `${component.x}px`,
    top: `${component.y}px`,
    width: `${component.width}px`,
    height: `${component.height}px`,
  };

  const className = `hmi-component ${selected ? 'selected' : ''}`;

  switch (component.type) {
    case 'button':
      return (
        <div className={className} style={style} onMouseDown={(e) => onSelect(e, component.id)}>
          <button className="hmi-button" style={{ width: '100%', height: '100%' }}>{component.text}</button>
        </div>
      );
    case 'label':
      return (
        <div className={className + ' hmi-label'} style={{ ...style, fontSize: `${component.fontSize}px` }} onMouseDown={(e) => onSelect(e, component.id)}>
          {component.text}
        </div>
      );
    case 'indicator':
      return (
        <div className={className} style={style} onMouseDown={(e) => onSelect(e, component.id)}>
          <div className="hmi-indicator" style={{ width: '100%', height: '100%', backgroundColor: component.color }}></div>
        </div>
      );
    default: return null;
  }
};
