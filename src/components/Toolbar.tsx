
import React from 'react';

// Fix: Add export to the component declaration.
export const Toolbar: React.FC = () => {
    const renderButtons = (icons: string[]) => icons.map(icon => (
        <button key={icon} className="toolbar-button"><span className="material-icons">{icon}</span></button>
    ));
    return (
        <div className="toolbar">
            <div className="toolbar-group">{renderButtons(['save', 'print'])}</div>
            <div className="toolbar-group">{renderButtons(['cut', 'content_copy', 'content_paste'])}</div>
            <div className="toolbar-group">{renderButtons(['undo', 'redo'])}</div>
            <div className="toolbar-group">{renderButtons(['align_horizontal_left', 'align_horizontal_center', 'align_horizontal_right', 'align_vertical_top', 'align_vertical_center', 'align_vertical_bottom'])}</div>
        </div>
    );
};
