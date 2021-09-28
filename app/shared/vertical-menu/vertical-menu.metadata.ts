import { actions } from '../data/data.object';

// Sidebar route metadata
export interface RouteInfo {
    id: any;
    path: any;
    title: any;
    icon: any;
    className: any;
    badge?: any;
    badgeClass?: any;
    isExternalLink: any;
    submenu : RouteInfo[];
    actions: actions[];
    displayOrder: any[];
    moduleType: any;
    parentId: any;
}
