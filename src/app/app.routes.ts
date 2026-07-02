import { Routes } from '@angular/router';
import { Boot } from './core/boot/boot';
import { Login } from './core/login/login';

export const routes: Routes = [
  { path: 'boot', component: Boot, pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: '', redirectTo: 'boot', pathMatch: 'full' },
  { path: '**', redirectTo: 'boot' },
];
