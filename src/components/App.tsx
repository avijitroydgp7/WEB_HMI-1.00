import React, { useState, useCallback, createContext, useMemo } from "react";
import { Layout, Model, TabNode, Actions, DockLocation } from "flexlayout-react";
import type { HmiComponent, DockName } from "../types/hmi";

import { MenuBar } from "./MenuBar";
import { Toolbar } from "./Toolbar";
import { DrawingToolbar } from "./DrawingToolbar";
import { StatusBar } from "./StatusBar";
import { Canvas } from "./Canvas";

import { ProjectTreeDock } from "../docks/ProjectTreeDock";
import { ScreenTreeDock } from "../docks/ScreenTreeDock";
import { SystemTreeDock } from "../docks/SystemTreeDock";
import { PropertyTreeDock } from "../docks/PropertyTreeDock";
import { LibraryDock } from "../docks/LibraryDock";
import { ScreenImageListDock } from "../docks/ScreenImageListDock";
import { TagSearchDock } from "../docks/TagSearchDock";
import { DataBrowserDock } from "../docks/DataBrowserDock";
import { IPAddressDock } from "../docks/IPAddressDock";
import { ControllerListDock } from "../docks/ControllerListDock";
import { DataViewDock } from "../docks/DataViewDock";

interface SharedState {
    components: HmiComponent[];
    setComponents: React.Dispatch<React.SetStateAction<HmiComponent[]>>;
    selectedComponent: HmiComponent | null;
    setSelectedComponentId: (id: string | null) => void;
}

export const SharedStateContext = createContext<SharedState | null>(null);

const defaultLayout = {
    global: {},
    borders: [
        {
            type: "border",
            location: "left",
            size: 250,
            children: [
                { type: "tab", name: "Project Tree", component: "Project Tree", id: "Project Tree" },
                { type: "tab", name: "Screen Tree", component: "Screen Tree", id: "Screen Tree" },
                { type: "tab", name: "System Tree", component: "System Tree", id: "System Tree" }
            ]
        },
        {
            type: "border",
            location: "right",
            size: 250,
            children: [
                { type: "tab", name: "Property Tree", component: "Property Tree", id: "Property Tree" },
                { type: "tab", name: "Library", component: "Library", id: "Library" },
                { type: "tab", name: "Screen Image List", component: "Screen Image List", id: "Screen Image List" }
            ]
        },
        {
            type: "border",
            location: "bottom",
            size: 200,
            children: [
                { type: "tab", name: "Tag Search", component: "Tag Search", id: "Tag Search" },
                { type: "tab", name: "Data Browser", component: "Data Browser", id: "Data Browser" },
                { type: "tab", name: "IP Address", component: "IP Address", id: "IP Address" },
                { type: "tab", name: "Controller List", component: "Controller List", id: "Controller List" },
                { type: "tab", name: "Data View", component: "Data View", id: "Data View" }
            ]
        }
    ],
    layout: {
        type: "row",
        children: [
            {
                type: "tabset",
                children: [
                    { type: "tab", name: "Canvas", component: "canvas", id: "canvas" }
                ]
            }
        ]
    }
};

export const App: React.FC = () => {
    const [components, setComponents] = useState<HmiComponent[]>([]);
    const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [model] = useState(() => Model.fromJson(defaultLayout));

    const factory = (node: TabNode) => {
        const component = node.getComponent();
        switch (component) {
            case "canvas": return <Canvas setCoords={setCoords} />;
            case "Project Tree": return <ProjectTreeDock />;
            case "Screen Tree": return <ScreenTreeDock />;
            case "System Tree": return <SystemTreeDock />;
            case "Property Tree": return <PropertyTreeDock />;
            case "Library": return <LibraryDock />;
            case "Screen Image List": return <ScreenImageListDock />;
            case "Tag Search": return <TagSearchDock />;
            case "Data Browser": return <DataBrowserDock />;
            case "IP Address": return <IPAddressDock />;
            case "Controller List": return <ControllerListDock />;
            case "Data View": return <DataViewDock />;
            default: return <div>Unknown component: {component}</div>;
        }
    };

    const getDockConfig = useCallback((dockName: DockName): { id: string } => {
        const leftDocks: DockName[] = ["Project Tree", "Screen Tree", "System Tree"];
        const rightDocks: DockName[] = ["Property Tree", "Library", "Screen Image List"];
        const bottomDocks: DockName[] = ["Tag Search", "Data Browser", "IP Address", "Controller List", "Data View"];

        if (leftDocks.includes(dockName)) return { id: "border_left" };
        if (rightDocks.includes(dockName)) return { id: "border_right" };
        return { id: "border_bottom" };
    }, []);

    const onToggleDock = useCallback((dockName: DockName) => {
        try {
            const existingNode = model.getNodeById(dockName);
            
            if (existingNode) {
                // Remove the dock using the standard delete action
                model.doAction(Actions.deleteTab(dockName));
            } else {
                // Get the target border for this dock
                const { id: borderId } = getDockConfig(dockName);
                const borderSet = model.getNodeById(borderId);
                
                if (borderSet) {
                    // Create a standard tab node configuration
                    const tabNode = {
                        type: "tab",
                        name: dockName,
                        component: dockName,
                        id: dockName
                    };
                    
                    // Add the node to the specified border
                    model.doAction(Actions.addNode(
                        tabNode,
                        borderId,
                        DockLocation.CENTER,
                        0
                    ));
                }
            }
        } catch (error) {
            console.error('Error toggling dock:', error);
        }
    }, [model, getDockConfig]);

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
                        <Layout model={model} factory={factory} />
                    </div>
                </div>
                <StatusBar coords={coords} />
            </div>
        </SharedStateContext.Provider>
    );
};
