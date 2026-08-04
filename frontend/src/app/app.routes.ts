import { Routes } from '@angular/router';
import { ProductList } from './features/products/pages/product-list/product-list';
import { MainLayout } from './layouts/main-layout/main-layout';
import { ProductForm } from './features/products/pages/product-form/product-form';
import { RegisterUser } from './features/users/pages/register-user/register-user';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterUser
  },
  {
    path: '',
    component: MainLayout,
    children: [
       {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        component: ProductList
      },
      {
        path: 'new-product',
        component: ProductForm
      }
    ],
  },
];
