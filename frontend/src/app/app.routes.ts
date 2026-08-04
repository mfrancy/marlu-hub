import { Routes } from '@angular/router';
import { ProductList } from './features/products/pages/product-list/product-list';
import { MainLayout } from './layouts/main-layout/main-layout';
import { ProductForm } from './features/products/pages/product-form/product-form';
import { RegisterUser } from './features/users/pages/register-user/register-user';
import { RegisterPage } from './features/auth/pages/register-page/register-page';
import { LoginPage } from './features/auth/pages/login-page/login-page';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'products',
    component: MainLayout,
    children: [
      {
        path: '',
        component: ProductList,
      },
      {
        path: 'new-product',
        component: ProductForm,
      },
    ],
  },
  {
    path: 'new-product',
    component: MainLayout,
    children: [
      {
        path: '',
        component: ProductForm,
      },
    ],
  },
];
