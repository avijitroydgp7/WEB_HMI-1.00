import React from 'react';

export const ProjectTreeDock: React.FC = () => {
    return (
        <div className="dock-item-content">
            <ul className="tree-view">
                <li className="tree-item">
                    <span className="material-icons">folder</span>
                    <span>Project</span>
                    <ul className="tree-view">
                        <li className="tree-item"><span className="material-icons">folder_open</span> System</li>
                        <li className="tree-item"><span className="material-icons">folder_open</span> Screen
                            <ul className="tree-view">
                                <li className="tree-item"><span className="material-icons">web_asset</span> B-1: (All Layers)</li>
                            </ul>
                        </li>
                        <li className="tree-item"><span className="material-icons">label</span> Label/Tag</li>
                        <li className="tree-item"><span className="material-icons">comment</span> Comment</li>
                        <li className="tree-item"><span className="material-icons">alarm</span> Alarm</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};
