import React, { useState } from 'react';

const SubMenu: React.FC<{ items: { icon: string, name: string }[] }> = ({ items }) => (
    <div className="menu-dropdown submenu-dropdown">
        {items.map((item, index) => (
            <div key={index} className="menu-item">
                <span className="material-icons">{item.icon}</span>
                <span>{item.name}</span>
            </div>
        ))}
    </div>
);

export const ScreenMenu: React.FC = () => {
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    const menuItems = [
        {
            icon: 'post_add', name: 'New Screen', subMenu: 'newScreen',
            items: [
                { icon: 'space_dashboard', name: 'Base Screen' },
                { icon: 'open_in_new', name: 'Window Screen' },
                { icon: 'view_quilt', name: 'Template Screen' },
                { icon: 'widgets', name: 'Widgets' },
            ]
        },
        { icon: 'folder_open', name: 'Open Screen' },
        { icon: 'close', name: 'Close Screen' },
        { icon: 'clear_all', name: 'Close All Screens' },
        { separator: true },
        { icon: 'design_services', name: 'Screen Design...' },
        { icon: 'tune', name: 'Screen Property...' },
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
                        {hasSubMenu && activeSubMenu === item.subMenu && <SubMenu items={item.items!} />}
                    </div>
                );
            })}
        </div>
    );
};
