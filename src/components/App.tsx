


import React, { useState, useRef, createContext, useMemo } from 'react';
// Fix: Import Actions and TabNode for correct API usage.
import { Layout, Model, TabNode, Actions } from 'flexlayout-react';
import type { HmiComponent, DockName } from '../types/hmi';

import { MenuBar } from './MenuBar';
import { Toolbar } from './Toolbar';
import { DrawingToolbar } from './DrawingToolbar';
import { StatusBar } from './StatusBar';
import { Canvas } from './Canvas';

// Docks
import { ProjectTreeDock } from '../docks/ProjectTreeDock';
import { ScreenTreeDock } from '../docks/ScreenTreeDock';
import { SystemTreeDock } from '../docks/SystemTreeDock';
import { PropertyTreeDock } from '../docks/PropertyTreeDock';
import { LibraryDock } from '../docks/LibraryDock';
import { ScreenImageListDock } from '../docks/ScreenImageListDock';
import { TagSearchDock } from '../docks/TagSearchDock';
import { DataBrowserDock } from '../docks/DataBrowserDock';
import { IPAddressDock } from '../docks/IPAddressDock';
import { ControllerListDock } from '../docks/ControllerListDock';
import { DataViewDock } from '../docks/DataViewDock';

// --- Shared State Context ---
interface SharedState {
    components: HmiComponent[];
    setComponents: React.Dispatch<React.SetStateAction<HmiComponent[]>>;
    selectedComponent: HmiComponent | null;
    setSelectedComponentId: (id: string | null) => void;
}
export const SharedStateContext = createContext<SharedState | null>(null);


// --- Main App Component ---
export const App: React.FC = () => {
    const [components, setComponents] = useState<HmiComponent[]>([]);
    const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const layoutRef = useRef<Layout>(null);

    const initialModel: any = Model.fromJson({
        // Fix: Removed unsupported 'tabEnableFloat' property. It may be enabled by default or configured differently in this version of flexlayout-react.
        global: { },
        borders: [
            // Fix: Removed unsupported 'id' property from border definition.
            { type: "border", location: "left", size: 250, children: [
                { type: "tab", name: "Project Tree", component: "Project Tree" }
            ]},
            // Fix: Removed unsupported 'id' property from border definition.
            { type: "border", location: "right", size: 250, children: [
                { type: "tab", name: "Property Tree", component: "Property Tree" }, { type: "tab", name: "Library", component: "Library" }
            ]},
            { type: "border", location: "bottom", size: 200, children: [] } // Pre-defined empty bottom border
        ],
        layout: { type: "row", children: [ { type: "tabset", id: "main", children: [ { type: "tab", name: "Canvas", component: "canvas" } ] } ] }
    });
    
    const [model, setModel] = useState<Model>(initialModel);

    const factory = (node: TabNode) => {
        const component = node.getComponent();
        switch (component) {
            case 'canvas': return <Canvas setCoords={setCoords} />;
            case 'Project Tree': return <ProjectTreeDock />;
            case 'Screen Tree': return <ScreenTreeDock />;
            case 'System Tree': return <SystemTreeDock />;
            case 'Property Tree': return <PropertyTreeDock />;
            case 'Library': return <LibraryDock />;
            case 'Screen Image List': return <ScreenImageListDock />;
            case 'Tag Search': return <TagSearchDock />;
            case 'Data Browser': return <DataBrowserDock />;
            case 'IP Address': return <IPAddressDock />;
            case 'Controller List': return <ControllerListDock />;
            case 'Data View': return <DataViewDock />;
            default: return <div>Unknown component: {component}</div>;
        }
    };

    // Fix: Updated onToggleDock to use the current flexlayout-react API.
    // Actions should be performed on the model, not the layout component.
    const onToggleDock = (dockName: DockName) => {
        let nodeToDeleteId: string | null = null;
        model.visitNodes(node => {
            // Fix: Cast node to TabNode to safely access getName().
            if (node.getType() === 'tab' && (node as TabNode).getName() === dockName) {
                nodeToDeleteId = node.getId();
            }
        });
        
        if (nodeToDeleteId) {
            // Fix: Use model.doAction(Actions.deleteTab(...))
            model.doAction(Actions.deleteTab(nodeToDeleteId));
        } else {
            const dockConfig = getDockConfig(dockName);
            // Fix: Use model.doAction(Actions.addNode(...))
            model.doAction(Actions.addNode(
                { type: 'tab', name: dockName, component: dockName },
                dockConfig.target,
                dockConfig.location as any, // Using 'as any' for simplicity, 'self' is a valid DockLocation.
                0
            ));
        }
    };
    
    const getDockConfig = (dockName: DockName) => {
        const leftDocks: DockName[] = ["Project Tree", "Screen Tree", "System Tree"];
        const rightDocks: DockName[] = ["Property Tree", "Library"];

        // Fix: Use default border IDs ('border_left', 'border_right') for targeting, as custom IDs on borders are not supported.
        if (leftDocks.includes(dockName)) return { target: "border_left", location: "self" };
        if (rightDocks.includes(dockName)) return { target: "border_right", location: "self" };
        return { target: "border_bottom", location: "self" }; // Default to bottom
    };
    
    const sharedStateValue = useMemo(() => ({
        components,
        setComponents,
        selectedComponent: components.find(c => c.id === selectedComponentId) ?? null,
        setSelectedComponentId
    }), [components, selectedComponentId]);

    return (
        <SharedStateContext.Provider value={sharedStateValue}>
            <div className="ide-container">
                <MenuBar model={model} onToggleDock={onToggleDock} />
                <Toolbar />
                <div className="ide-body">
                    <DrawingToolbar />
                    <div className="ide-main-content">
                         <Layout ref={layoutRef} model={model} factory={factory} />
                    </div>
                </div>
                <StatusBar coords={coords} />
            </div>
        </SharedStateContext.Provider>
    );
};