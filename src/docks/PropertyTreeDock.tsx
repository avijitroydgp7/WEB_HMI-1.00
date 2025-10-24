import React, { useContext } from 'react';
import { SharedStateContext } from '../components/App';
import type { HmiComponent, HmiButtonComponent, HmiLabelComponent, HmiIndicatorComponent } from '../types/hmi';

export const PropertyTreeDock: React.FC = () => {
    const context = useContext(SharedStateContext);
    if (!context) return <div>Loading Context...</div>;
    
    const { selectedComponent, setComponents } = context;

    const onUpdate = (updatedComponent: HmiComponent) => {
        setComponents(prev => prev.map(c => c.id === updatedComponent.id ? updatedComponent : c));
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedComponent) return;
        const { name, value } = e.target;
        const numericFields = ['fontSize', 'x', 'y', 'width', 'height'];
        const updatedValue = numericFields.includes(name) ? Number(value) : value;
        const updatedComponent = { ...selectedComponent, [name]: updatedValue };
        onUpdate(updatedComponent as HmiComponent);
    };

    if (!selectedComponent) {
        return <div className="dock-item-content">No component selected.</div>;
    }

    const renderCommonProperties = () => (
        <>
            <div className="property-item"><label>ID</label><input type="text" value={selectedComponent.id} readOnly /></div>
            <div className="property-item"><label>Type</label><input type="text" value={selectedComponent.type} readOnly /></div>
            <div className="property-item"><label>X</label><input type="number" name="x" value={selectedComponent.x} onChange={handleChange} /></div>
            <div className="property-item"><label>Y</label><input type="number" name="y" value={selectedComponent.y} onChange={handleChange} /></div>
            <div className="property-item"><label>Width</label><input type="number" name="width" value={selectedComponent.width} onChange={handleChange} /></div>
            <div className="property-item"><label>Height</label><input type="number" name="height" value={selectedComponent.height} onChange={handleChange} /></div>
        </>
    );

    const renderSpecificProperties = () => {
        switch (selectedComponent.type) {
            case 'button':
                const button = selectedComponent as HmiButtonComponent;
                return <div className="property-item"><label>Text</label><input type="text" name="text" value={button.text} onChange={handleChange} /></div>;
            case 'label':
                const label = selectedComponent as HmiLabelComponent;
                return <>
                    <div className="property-item"><label>Text</label><input type="text" name="text" value={label.text} onChange={handleChange} /></div>
                    <div className="property-item"><label>Font Size</label><input type="number" name="fontSize" value={label.fontSize} onChange={handleChange} /></div>
                </>;
            case 'indicator':
                const indicator = selectedComponent as HmiIndicatorComponent;
                return <div className="property-item"><label>Color</label><input type="text" name="color" value={indicator.color} onChange={handleChange} /></div>;
            default:
                return null;
        }
    };

    return (
        <div className="properties-panel-content dock-item-content">
            {renderCommonProperties()}
            {renderSpecificProperties()}
        </div>
    );
};
