import React from 'react';

export const StatusBar: React.FC<{ coords: { x: number, y: number } }> = ({ coords }) => (
    <div className="status-bar">
        <div><div className="status-item">Ready</div></div>
        <div>
            <div className="status-item">GT37**-FH (1920x1080)</div>
            <div className="status-item">X:{coords.x}, Y:{coords.y}</div>
        </div>
    </div>
);