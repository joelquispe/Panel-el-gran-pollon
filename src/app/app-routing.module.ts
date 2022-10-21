import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { CategoryComponent } from './components/category/category.component';
import { PlatilloFormComponent } from './components/platillo/platillo-form/platillo-form.component';
import { PlatilloComponent } from './components/platillo/platillo.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerFormComponent } from './components/customer/customer-form/customer-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path:'usuarios',
        component: UserComponent,
        data: { title:"Usuarios"}
      },
      {
        path:'usuario/create',
        component: UserFormComponent,
        data: { title:"Crear Usuario "}
      },
      {
        path:'usuario/edit/:id',
        component: UserFormComponent,
        data: { title:"Editar Usuario"}
      },
      {
        path:'platillos',
        component: PlatilloComponent,
        data: { title:"platillos"}
      },
      {
        path:'platillos/create',
        component: PlatilloFormComponent,
        data: { title:"Crear Usuario "}
      },
      {
        path:'platillos/edit/:id',
        component: PlatilloFormComponent,
        data: { title:"Editar Usuario"}
      },
      {
        path:'categorias',
        component: CategoryComponent,
        data: { title:"Categorias"}
      },
      {
        path:'categoria/create',
        component: CategoryFormComponent,
        data: { title:"Crear Categoria "}
      },
      {
        path:'categoria/edit/:id',
        component: CategoryFormComponent,
        data: { title:"Editar Categoria"}
      },
      {
        path:'clientes',
        component: CustomerComponent,
        data: { title:"Categorias"}
      },
      {
        path:'cliente/create',
        component: CustomerFormComponent,
        data: { title:"Crear cliente "}
      },
      {
        path:'cliente/edit/:id',
        component: CustomerFormComponent,
        data: { title:"Editar cliente"}
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
