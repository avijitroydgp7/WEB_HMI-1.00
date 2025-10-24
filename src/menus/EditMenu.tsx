import React, { useState } from 'react';

const SubMenu: React.FC<{ items: { icon: string, name: string, shortcut?: string }[] }> = ({ items }) => (
    <div className="menu-dropdown submenu-dropdown">
        {items.map((item, index) => (
            <div key={index} className="menu-item">
                <span className="material-icons">{item.icon}</span>
                <span>{item.name}</span>
                {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
            </div>
        ))}
    </div>
);

export const EditMenu: React.FC = () => {
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    const menuItems = [
        { icon: 'cut', name: 'Cut', shortcut: 'Ctrl+X' },
        { icon: 'content_copy', name: 'Copy', shortcut: 'Ctrl+C' },
        { icon: 'content_paste', name: 'Paste', shortcut: 'Ctrl+V' },
        { separator: true },
        { icon: 'undo', name: 'Undo', shortcut: 'Ctrl+Z' },
        { icon: 'redo', name: 'Redo', shortcut: 'Ctrl+Y' },
        { separator: true },
        { icon: 'control_point_duplicate', name: 'Duplicate', shortcut: 'Ctrl+D' },
        { icon: 'queue', name: 'Consecutive Copy', shortcut: 'Ctrl+Shift+C' },
        { separator: true },
        { icon: 'select_all', name: 'Select All', shortcut: 'Ctrl+A' },
        { icon: 'delete', name: 'Delete', shortcut: 'Del' },
        { separator: true },
        {
            icon: 'layers', name: 'Stacking Order', subMenu: 'stacking',
            items: [
                { icon: 'flip_to_front', name: 'Move Front Layer' },
                { icon: 'flip_to_back', name: 'Move Back Layer' },
                { icon: 'vertical_align_top', name: 'Move to Front' },
                { icon: 'vertical_align_bottom', name: 'Move to Back' },
            ]
        },
        {
            icon: 'align_horizontal_center', name: 'Align', subMenu: 'align',
            items: [
                { icon: 'align_horizontal_left', name: 'Left' },
                { icon: 'align_horizontal_center', name: 'Center' },
                { icon: 'align_horizontal_right', name: 'Right' },
                { icon: 'align_vertical_top', name: 'Top' },
                { icon: 'align_vertical_center', name: 'Middle' },
                { icon: 'align_vertical_bottom', name: 'Bottom' },
                { icon: 'space_bar', name: 'Distribute Horizontal' },
                { icon: 'space_bar', name: 'Distribute Vertical' },
            ]
        },
        { icon: 'wrap_text', name: 'Wrap', subMenu: 'wrap', items: [] },
        {
            icon: 'flip', name: 'Flip', subMenu: 'flip',
            items: [
                { icon: 'flip', name: 'Vertical' },
                { icon: 'flip', name: 'Horizontal' },
                { icon: 'rotate_left', name: 'Left' },
                { icon: 'rotate_right', name: 'Right' },
            ]
        },
    ];

    return (
        <div className="menu-dropdown" onMouseLeave={() => setActiveSubMenu(null)} onClick={(e) => e.stopPropagation()}>
            {menuItems.map((item, index) => {
                if (item.separator) {
                    return <div key={index} className="menu-separator"></div>;
                }
                const hasSubMenu = item.subMenu && item.items;
                return (
                    <div
                        key={index}
                        className={`menu-item ${hasSubMenu ? 'menu-item-submenu' : ''}`}
                        onMouseEnter={() => hasSubMenu && setActiveSubMenu(item.subMenu!)}
                    >
                        <span className="material-icons">{item.icon}</span>
                        <span>{item.name}</span>
                        {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
                        {hasSubMenu && activeSubMenu === item.subMenu && <SubMenu items={item.items!} />}
                    </div>
                );
            })}
        </div>
    );
};
