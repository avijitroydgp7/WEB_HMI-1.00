
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
    const [dockStates, setDockStates] = useState<Record<DockName, boolean>>({});

    // Initialize dock states on mount
    React.useEffect(() => {
        const initialStates: Record<DockName, boolean> = {};
        const dockingItems: DockName[] = [
            "Project Tree", "Screen Tree", "System Tree", "Tag Search", "Data Browser",
            "Property Tree", "IP Address", "Library", "Controller List", "Data View", "Screen Image List"
        ];
        
        dockingItems.forEach(dock => {
            try {
                const node = model.getNodeById(dock);
                initialStates[dock] = node !== null;
            } catch {
                initialStates[dock] = false;
            }
        });
        
        setDockStates(initialStates);
    }, [model]);

    const handleDockToggle = (dockName: DockName) => {
        setDockStates(prev => ({
            ...prev,
            [dockName]: !prev[dockName]
        }));
        onToggleDock(dockName);
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
                                        checked={dockStates[name as DockName] || false}
                                        onClick={() => handleDockToggle(name as DockName)}
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
