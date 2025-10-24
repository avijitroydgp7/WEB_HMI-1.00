import React from 'react';

export const FigureMenu: React.FC = () => {
    const menuItems = [
        { icon: 'title', name: 'Text' },
        { icon: 'horizontal_rule', name: 'Line' },
        { icon: 'polyline', name: 'Polyline' },
        { icon: 'crop_square', name: 'Rectangle' },
        { icon: 'pentagon', name: 'Polygon' },
        { icon: 'circle', name: 'Circle' },
        { icon: 'architecture', name: 'Arc' },
        { icon: 'pie_chart_outline', name: 'Sector' },
        { icon: 'table_chart', name: 'Table' },
        { icon: 'straighten', name: 'Scale' },
        { icon: 'image', name: 'Image' },
        { icon: 'gesture', name: 'DXF' },
    ];

    return (
        <div className="menu-dropdown" onClick={(e) => e.stopPropagation()}>
            {menuItems.map((item, index) => (
                <div key={index} className="menu-item">
                    <span className="material-icons">{item.icon}</span>
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
    );
};
