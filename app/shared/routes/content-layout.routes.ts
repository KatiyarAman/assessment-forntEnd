import { Routes, RouterModule } from '@angular/router';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
    {
        path: 'pages',
        loadChildren: () => import('../../pages/content-pages/content-pages.module').then(m => m.ContentPagesModule)
    },
    {
        path: 'portal',
        loadChildren: () => import('../../pages/portal-pages/portal-pages.module').then(m => m.PortalModule)
    },
    {
        path: 'shivitErp',
        loadChildren: () => import('../../erp/erp.module').then(m => m.ERPModule)
    }
];
