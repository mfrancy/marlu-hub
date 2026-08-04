import { Routes } from '@angular/router';
import { ProductList } from './features/products/pages/product-list/product-list';
import { MainLayout } from './layouts/main-layout/main-layout';
import { ProductForm } from './features/products/pages/product-form/product-form';
import { RegisterUser } from './features/users/pages/register-user/register-user';
import { RegisterPage } from './features/auth/pages/register-page/register-page';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: '',
    component: RegisterPage,
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
