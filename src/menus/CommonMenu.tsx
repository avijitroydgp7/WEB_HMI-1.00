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

export const CommonMenu: React.FC = () => {
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    const menuData = {
        environment: [
            { icon: 'switch_account', name: 'Screen Switching' },
            { icon: 'open_in_new', name: 'Dialog Window' },
            { icon: 'info', name: 'System Information' },
            { icon: 'security', name: 'Security' },
        ],
        peripheral: [
            { icon: 'qr_code_scanner', name: 'Barcode' },
            { icon: 'rss_feed', name: 'RFID' },
            { icon: 'precision_manufacturing', name: 'Servo' },
            { icon: 'smart_toy', name: 'Robot' },
            { icon: 'camera_alt', name: 'Camera' },
        ],
        tags: [
            { icon: 'folder_open', name: 'Open' },
            { icon: 'add_box', name: 'New' },
            { icon: 'add', name: 'Add' },
            { icon: 'edit', name: 'Edit' },
            { icon: 'remove', name: 'Remove' },
            { icon: 'file_upload', name: 'Import' },
            { icon: 'file_download', name: 'Export' },
        ],
        comment: [
            { icon: 'folder_open', name: 'Open' },
            { icon: 'add_box', name: 'New' },
            { icon: 'file_upload', name: 'Import' },
            { icon: 'file_download', name: 'Export' },
            { separator: true },
            { icon: 'view_week', name: 'Add Column' },
            { icon: 'view_headline', name: 'Add Row' },
            { icon: 'view_module', name: 'Remove Column' },
            { icon: 'table_rows', name: 'Remove Row' },
            { separator: true },
            { icon: 'search', name: 'Find' },
            { separator: true },
            {
                icon: 'palette', name: 'Style', subMenu: 'style',
                items: [
                    { icon: 'format_bold', name: 'Bold' },
                    { icon: 'format_italic', name: 'Italic' },
                    { icon: 'format_underlined', name: 'Underline' },
                    { icon: 'format_color_text', name: 'Fill Text' },
                    { icon: 'format_color_fill', name: 'Fill Background' },
                ]
            }
        ],
        alarm: [
            { icon: 'person', name: 'User Alarm' },
            { icon: 'memory', name: 'System Alarm' },
            { icon: 'feedback', name: 'Popup Alarm' },
        ]
    };

    const handleMouseEnter = (menu: string | null) => {
        // Prevent submenus of submenus from closing their parent
        if (menu === 'style' && activeSubMenu?.startsWith('comment')) {
             setActiveSubMenu('comment-style');
        } else {
             setActiveSubMenu(menu);
        }
    };
    
    const isSubMenuActive = (menu: string | null) => {
        if (!activeSubMenu || !menu) return false;
        return activeSubMenu.startsWith(menu);
    }

    return (
        <div className="menu-dropdown" onMouseLeave={() => setActiveSubMenu(null)} onClick={(e) => e.stopPropagation()}>
            {/* Environment */}
            <div className="menu-item menu-item-submenu" onMouseEnter={() => handleMouseEnter('environment')}>
                <span className="material-icons">public</span><span>Environment</span>
                {isSubMenuActive('environment') && <SubMenu items={menuData.environment} />}
            </div>
            {/* Top Level Items */}
            <div className="menu-item"><span className="material-icons">lan</span><span>Ethernet</span></div>
            <div className="menu-item"><span className="material-icons">settings_input_component</span><span>Controller Setting</span></div>
            {/* Peripheral Device */}
            <div className="menu-item menu-item-submenu" onMouseEnter={() => handleMouseEnter('peripheral')}>
                <span className="material-icons">usb</span><span>Peripheral Device</span>
                {isSubMenuActive('peripheral') && <SubMenu items={menuData.peripheral} />}
            </div>
            <div className="menu-separator"></div>
            {/* Tags */}
            <div className="menu-item menu-item-submenu" onMouseEnter={() => handleMouseEnter('tags')}>
                <span className="material-icons">style</span><span>Tags</span>
                {isSubMenuActive('tags') && <SubMenu items={menuData.tags} />}
            </div>
            {/* Comment */}
            <div className="menu-item menu-item-submenu" onMouseEnter={() => handleMouseEnter('comment')}>
                <span className="material-icons">comment</span><span>Comment</span>
                {isSubMenuActive('comment') && (
                     <div className="menu-dropdown submenu-dropdown">
                        {menuData.comment.map((item, index) => {
                             if (item.separator) return <div key={index} className="menu-separator"></div>;
                             const hasSubMenu = item.subMenu && item.items;
                             return (
                                 <div key={index} className={`menu-item ${hasSubMenu ? 'menu-item-submenu' : ''}`} onMouseEnter={() => handleMouseEnter(item.subMenu || 'comment')}>
                                     <span className="material-icons">{item.icon}</span><span>{item.name}</span>
                                     {hasSubMenu && isSubMenuActive('style') && <SubMenu items={item.items!} />}
                                 </div>
                             );
                        })}
                    </div>
                )}
            </div>
            {/* Alarm */}
            <div className="menu-item menu-item-submenu" onMouseEnter={() => handleMouseEnter('alarm')}>
                <span className="material-icons">alarm</span><span>Alarm</span>
                {isSubMenuActive('alarm') && <SubMenu items={menuData.alarm} />}
            </div>
            <div className="menu-item"><span className="material-icons">plagiarism</span><span>Logging..</span></div>
            <div className="menu-separator"></div>
            <div className="menu-item"><span className="material-icons">code</span><span>Script</span></div>
            <div className="menu-item"><span className="material-icons">sync_alt</span><span>Tags Data Transfer</span></div>
            <div className="menu-item"><span className="material-icons">control_camera</span><span>Trigger Action..</span></div>
            <div className="menu-item"><span className="material-icons">schedule</span><span>Time Action..</span></div>
        </div>
    );
};
