
import React, { useState } from 'react';
import type { DockName } from '../types/hmi';
// Fix: Import TabNode to use for type casting.
import type { Model, TabNode } from 'flexlayout-react';

interface ViewMenuProps {
    model: Model;
    onToggleDock: (dockName: DockName) => void;
}

const CheckableItem: React.FC<{
    name: string;
    checked: boolean;
    onClick: () => void;
}> = ({ name, checked, onClick }) => (
    <div className="menu-item" onClick={onClick}>
        <span className="material-icons check-icon">
            {checked ? 'check_box' : 'check_box_outline_blank'}
        </span>
        <span>{name}</span>
    </div>
);

export const ViewMenu: React.FC<ViewMenuProps> = ({ model, onToggleDock }) => {
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    // This is a simple way to check visibility. A more robust solution might use node IDs.
    const isDockVisible = (dockName: DockName) => {
        let isVisible = false;
        model.visitNodes(node => {
            // Fix: Cast node to TabNode to safely access getName().
            if (node.getType() === 'tab' && (node as TabNode).getName() === dockName) {
                isVisible = true;
            }
        });
        return isVisible;
    };

    const dockingItems: DockName[] = [
        "Project Tree", "Screen Tree", "System Tree", "Tag Search", "Data Browser",
        "Property Tree", "IP Address", "Library", "Controller List", "Data View", "Screen Image List"
    ];

    const menuItems = [
        { name: "Preview", icon: "visibility" },
        { separator: true },
        {
            name: "Docking Window", icon: "view_quilt", subMenu: 'docking', items: dockingItems
        },
    ];

    return (
        <div className="menu-dropdown" onMouseLeave={() => setActiveSubMenu(null)} onClick={(e) => e.stopPropagation()}>
            {menuItems.map((item, index) => {
                if (item.separator) return <div key={index} className="menu-separator"></div>;
                const hasSubMenu = item.subMenu && item.items;

                return (
                    <div key={index}
                        className={`menu-item ${hasSubMenu ? 'menu-item-submenu' : ''}`}
                        onMouseEnter={() => hasSubMenu && setActiveSubMenu(item.subMenu!)}
                    >
                        <span className="material-icons">{item.icon}</span>
                        <span>{item.name}</span>
                        {hasSubMenu && activeSubMenu === item.subMenu && (
                            <div className="menu-dropdown submenu-dropdown">
                                {item.items.map(name => (
                                    <CheckableItem
                                        key={name}
                                        name={name}
                                        checked={isDockVisible(name as DockName)}
                                        onClick={() => onToggleDock(name as DockName)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
