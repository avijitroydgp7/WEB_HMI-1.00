import React from 'react';
import type { HmiComponentType } from '../types/hmi';

export const DrawingToolbar: React.FC = () => {
    const handleDragStart = (e: React.DragEvent, type: HmiComponentType) => {
        e.dataTransfer.setData('application/hmi-component-type', type);
    };
    return (
        <div className="drawing-toolbar">
            <div className="drawing-item" draggable onDragStart={(e) => handleDragStart(e, 'button')}><span className="material-icons">smart_button</span></div>
            <div className="drawing-item" draggable onDragStart={(e) => handleDragStart(e, 'label')}><span className="material-icons">title</span></div>
            <div className="drawing-item" draggable onDragStart={(e) => handleDragStart(e, 'indicator')}><span className="material-icons">lightbulb</span></div>
            <div className="drawing-item"><span className="material-icons">draw</span></div>
            <div className="drawing-item"><span className="material-icons">horizontal_rule</span></div>
            <div className="drawing-item"><span className="material-icons">crop_square</span></div>
            <div className="drawing-item"><span className="material-icons">circle</span></div>
        </div>
    );
};
