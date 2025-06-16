import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'register',
        loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'products/:id',
        loadComponent: () => import('./components/products/product-details/product-details.component').then(m => m.ProductDetailsComponent)
    },
    {
        path: 'basket',
        loadComponent: () => import('./components/basket/basket.component').then(m => m.BasketComponent)
    },
    {
        path: 'payment',
        loadComponent: () => import('./components/payment/payment.component').then(m => m.PaymentComponent)
    },
    {
        path: 'payment/confirmation',
        loadComponent: () => import('./components/payment-confirmation/payment-confirmation.component').then(m => m.PaymentConfirmationComponent)
    }
    
];
