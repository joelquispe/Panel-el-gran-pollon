import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './components/login/login.component';

import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { CategoryComponent } from './components/category/category.component';
import { PlatilloFormComponent } from './components/platillo/platillo-form/platillo-form.component';
import { PlatilloComponent } from './components/platillo/platillo.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerFormComponent } from './components/customer/customer-form/customer-form.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EmployeComponent } from './components/employe/employe.component';
import { EmployeFormComponent } from './components/employe/employe-form/employe-form.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MotorizedComponent } from './components/motorized/motorized.component';
import { MotorizedFormComponent } from './components/motorized/motorized-form/motorized-form.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  
  {
    path:'',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path:'perfil',
        component: ProfileComponent,
        data: { title:"Perfil"}
      },
      {
        path:'usuarios',
        component: UserComponent,
        data: { title:"Usuarios"}
      },
      {
        path:'usuarios/create',
        component: UserFormComponent,
        data: { title:"Crear Usuario "}
      },
      {
        path:'usuarios/edit/:id',
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
        path:'categorias/create',
        component: CategoryFormComponent,
        data: { title:"Crear Categoria "}
      },
      {
        path:'categorias/edit/:id',
        component: CategoryFormComponent,
        data: { title:"Editar Categoria"}
      },
      {
        path:'clientes',
        component: CustomerComponent,
        data: { title:"Clientes"}
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
        path:'empleados',
        component: EmployeComponent,
        data: { title:"Empleados"}
      },
      {
        path:'empleados/create',
        component: EmployeFormComponent,
        data: { title:"Crear empleado "}
      },
      {
        path:'empleados/edit/:id',
        component: EmployeFormComponent,
        data: { title:"Editar empleado"}
      },
      {
        path:'ordenes',
        component: OrdersComponent,
        data: { title:"Ordenes"}
      },
      {
        path:'motorizados',
        component: MotorizedComponent,
        data: { title:"Motorizados"}
      },
      {
        path:'motorizados/create',
        component: MotorizedFormComponent,
        data: { title:"Crear motorizado "}
      },
      {
        path:'motorizados/edit/:id',
        component: MotorizedFormComponent,
        data: { title:"Editar motorizado"}
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
  {path:'**',component:DashboardComponent}
  
 
  
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
