import React from 'react';

export const FileMenu: React.FC = () => {
    return (
        <div className="menu-dropdown" onClick={(e) => e.stopPropagation()}>
            <div className="menu-item">
                <span className="material-icons">note_add</span>
                <span>New</span>
                <span className="shortcut">Ctrl+N</span>
            </div>
            <div className="menu-item">
                <span className="material-icons">folder_open</span>
                <span>Open</span>
                <span className="shortcut">Ctrl+O</span>
            </div>
            <div className="menu-separator"></div>
            <div className="menu-item">
                <span className="material-icons">save</span>
                <span>Save</span>
                <span className="shortcut">Ctrl+S</span>
            </div>
            <div className="menu-item">
                <span className="material-icons">save_as</span>
                <span>Save As...</span>
                <span className="shortcut">Ctrl+Shift+S</span>
            </div>
             <div className="menu-separator"></div>
            <div className="menu-item">
                <span className="material-icons">play_circle_outline</span>
                <span>Run</span>
                <span className="shortcut">F4</span>
            </div>
            <div className="menu-separator"></div>
            <div className="menu-item">
                <span className="material-icons">close</span>
                <span>Close Tab</span>
                <span className="shortcut">Ctrl+W</span>
            </div>
            <div className="menu-item">
                <span className="material-icons">clear_all</span>
                <span>Close All Tabs</span>
                <span className="shortcut">Ctrl+Shift+W</span>
            </div>
            <div className="menu-separator"></div>
            <div className="menu-item">
                <span className="material-icons">exit_to_app</span>
                <span>Exit</span>
                <span className="shortcut">Ctrl+Q</span>
            </div>
        </div>
    );
};
