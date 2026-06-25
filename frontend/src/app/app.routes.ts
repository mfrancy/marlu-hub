import { Routes } from '@angular/router';
import { ProductList } from './features/products/pages/product-list/product-list';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
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
        path: 'products',
        component: ProductList
      }
    ],
  },
];
