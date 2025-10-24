import React, { DragEvent, MouseEvent as ReactMouseEvent, useContext } from 'react';
import { HmiComponentRenderer } from './HmiComponentRenderer';
import { SharedStateContext } from './App';
import type { HmiComponentType, HmiButtonComponent, HmiLabelComponent, HmiIndicatorComponent, HmiComponent } from '../types/hmi';

interface CanvasProps {
    setCoords: (coords: { x: number, y: number }) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ setCoords }) => {
    const context = useContext(SharedStateContext);
    if (!context) return <div>Loading...</div>;

    const { components, selectedComponent, setComponents, setSelectedComponentId } = context;
    const selectedComponentId = selectedComponent?.id ?? null;

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('application/hmi-component-type') as HmiComponentType;
        if (!type) return;

        const canvasBounds = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - canvasBounds.left;
        const y = e.clientY - canvasBounds.top;

        const newComponent: HmiComponent = createHmiComponent(type, x, y);
        setComponents(prev => [...prev, newComponent]);
    };

    const createHmiComponent = (type: HmiComponentType, x: number, y: number): HmiComponent => {
        const base = {
            id: `comp_${Date.now()}`,
            x: Math.round(x),
            y: Math.round(y),
            width: 100,
            height: 50,
        };
        switch (type) {
            case 'button':
                return { ...base, type: 'button', text: 'Button', height: 40 } as HmiButtonComponent;
            case 'label':
                return { ...base, type: 'label', text: 'Label', fontSize: 16, height: 30 } as HmiLabelComponent;
            case 'indicator':
                return { ...base, type: 'indicator', color: 'gray', width: 50, height: 50 } as HmiIndicatorComponent;
            default:
                throw new Error('Unknown component type');
        }
    };
    
    const handleSelectComponent = (e: ReactMouseEvent, id: string) => {
        e.stopPropagation();
        setSelectedComponentId(id);
    };

    const handleCanvasMouseDown = () => {
        setSelectedComponentId(null);
    };

    const handleMouseMove = (e: ReactMouseEvent) => {
        const canvasBounds = e.currentTarget.getBoundingClientRect();
        const x = Math.round(e.clientX - canvasBounds.left);
        const y = Math.round(e.clientY - canvasBounds.top);
        setCoords({ x, y });
    };

    return (
        <div 
            className="canvas" 
            onDragOver={handleDragOver} 
            onDrop={handleDrop} 
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleMouseMove}
        >
            {components.map(component => (
                <HmiComponentRenderer
                    key={component.id}
                    component={component}
                    onSelect={handleSelectComponent}
                    selected={component.id === selectedComponentId}
                />
            ))}
        </div>
    );
};
