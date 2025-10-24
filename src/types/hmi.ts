
export type HmiComponentType = 'button' | 'label' | 'indicator';

interface HmiComponentBase {
  id: string;
  type: HmiComponentType;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface HmiButtonComponent extends HmiComponentBase {
  type: 'button';
  text: string;
}

export interface HmiLabelComponent extends HmiComponentBase {
  type: 'label';
  text: string;
  fontSize: number;
}

export interface HmiIndicatorComponent extends HmiComponentBase {
  type: 'indicator';
  color: string;
}

export type HmiComponent = HmiButtonComponent | HmiLabelComponent | HmiIndicatorComponent;

// --- Docking System Types ---
export type DockName = 
  | 'Project Tree'
  | 'Screen Tree'
  | 'System Tree'
  | 'Property Tree'
  | 'Library'
  | 'Screen Image List'
  | 'Tag Search'
  | 'Data Browser'
  | 'IP Address'
  | 'Controller List'
  | 'Data View';

export type DockVisibility = Record<DockName, boolean>;
