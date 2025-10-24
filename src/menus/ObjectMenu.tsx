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

export const ObjectMenu: React.FC = () => {
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    const menuData = {
        button: [
            { icon: 'check_box_outline_blank', name: 'Push Button Square' },
            { icon: 'radio_button_unchecked', name: 'Push Button Circle' },
            { icon: 'toggle_on', name: 'Toggle Button' },
            { icon: 'check_box', name: 'Check Box' },
            { icon: 'radio_button_checked', name: 'Radio Button' },
            { icon: 'switch_left', name: 'Selector Switch' },
        ],
        lamp: [
            { icon: 'lightbulb', name: 'Bit Lamp' },
            { icon: 'wb_incandescent', name: 'Word Lamp' },
            { icon: 'highlight', name: 'Border Lamp' },
        ],
        numerical: [
            { icon: 'calculate', name: 'Numerical' },
            { icon: 'iso', name: 'Spin Box' },
        ],
        dateTime: [
            { icon: 'event', name: 'Date Display' },
            { icon: 'schedule', name: 'Time Display' },
            { icon: 'today', name: 'Date/Time Display' },
            { icon: 'date_range', name: 'Date/Time Picker' },
        ],
        comment: [
            { icon: 'chat_bubble_outline', name: 'Bit Comment' },
            { icon: 'chat_bubble', name: 'Word Comment' },
            { icon: 'comment', name: 'Simple Comment' },
        ],
        viewBox: [
            { icon: 'arrow_drop_down_circle', name: 'Combo Box' },
            { icon: 'checklist', name: 'Check List Box' },
            { icon: 'menu', name: 'Side Menu Bar' },
            { icon: 'group_work', name: 'Group Box' },
            { icon: 'grid_on', name: 'Data Grid' },
            { icon: 'view_list', name: 'List Box' },
            { icon: 'splitscreen', name: 'Splitter Panel' },
            { icon: 'dns', name: 'Status Bar' },
            { icon: 'tab', name: 'Tab View' },
            { icon: 'account_tree', name: 'Tree View' },
            { icon: 'linear_scale', name: 'Scroll Bar' },
        ],
        animation: [
            { icon: 'settings_ethernet', name: 'Progress Bar' },
            { icon: 'traffic', name: 'Tower Light' },
            { icon: 'settings', name: 'Gear' },
            { icon: 'smart_toy', name: 'Robot' },
            { icon: 'conveyor_belt', name: 'Conveyor' },
            { icon: '360', name: 'Fan' },
            { icon: 'print', name: 'Printer' },
        ],
        alarm: [
            { icon: 'notifications', name: 'Simple Alarm' },
            { icon: 'person', name: 'User Alarm' },
            { icon: 'memory', name: 'System Alarm' },
        ],
        graph: [
            { icon: 'show_chart', name: 'Line' },
            { icon: 'stacked_line_chart', name: 'Trend' },
            { icon: 'bar_chart', name: 'Bar' },
            { icon: 'pie_chart', name: 'Pie' },
            { icon: 'scatter_plot', name: 'Scatter' },
            { icon: 'multiline_chart', name: 'Combo' },
        ],
        graphicalMeter: [
            { icon: 'speed', name: 'Sector Meter' },
            { icon: 'thermostat', name: 'Semi Circle Meter' },
            { icon: 'analytics', name: 'Bar Meter' },
        ]
    };

    const topLevelItems = [
        { name: 'Button', icon: 'smart_button', subMenu: 'button', items: menuData.button },
        { name: 'Lamp', icon: 'lightbulb', subMenu: 'lamp', items: menuData.lamp },
        { name: 'Numerical Display/Input', icon: 'pin', subMenu: 'numerical', items: menuData.numerical },
        { name: 'Text Display/Input', icon: 'text_fields' },
        { name: 'Date/Time', icon: 'calendar_today', subMenu: 'dateTime', items: menuData.dateTime },
        { name: 'Comment', icon: 'comment', subMenu: 'comment', items: menuData.comment },
        { name: 'View Box', icon: 'web_asset', subMenu: 'viewBox', items: menuData.viewBox },
        { name: 'Image', icon: 'image' },
        { name: 'Video', icon: 'videocam' },
        { name: 'Animation', icon: 'movie', subMenu: 'animation', items: menuData.animation },
        { name: 'Historical Data', icon: 'history' },
        { name: 'Alarm', icon: 'alarm', subMenu: 'alarm', items: menuData.alarm },
        { name: 'Recipe', icon: 'receipt_long' },
        { name: 'Graph', icon: 'insert_chart', subMenu: 'graph', items: menuData.graph },
        { name: 'Graphical Meter', icon: 'speed', subMenu: 'graphicalMeter', items: menuData.graphicalMeter },
        { name: 'Slider', icon: 'linear_scale' },
        { name: 'Document', icon: 'description' },
        { name: 'Web Browser', icon: 'language' },
    ];

    return (
        <div className="menu-dropdown" onMouseLeave={() => setActiveSubMenu(null)} onClick={(e) => e.stopPropagation()}>
            {topLevelItems.map((item, index) => {
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