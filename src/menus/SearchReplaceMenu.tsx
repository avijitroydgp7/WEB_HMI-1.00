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

export const SearchReplaceMenu: React.FC = () => {
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    const menuItems = [
        { icon: 'tag', name: 'Tag Search' },
        { icon: 'view_list', name: 'Tag List' },
        { icon: 'article', name: 'Text List' },
        { separator: true },
        {
            icon: 'edit_note', name: 'Batch Edit', subMenu: 'batchEdit',
            items: [
                { icon: 'style', name: 'Tags' },
                { icon: 'palette', name: 'Color' },
                { icon: 'category', name: 'Shape' },
                { icon: 'text_fields', name: 'Text' },
            ]
        },
        { icon: 'dataset', name: 'Data Browser' },
        { icon: 'lan', name: 'IP Address List' },
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
