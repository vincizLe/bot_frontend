import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatBotComponent } from './chatbot/chatbot.component';
import { MetricsComponent } from './metrics/metrics.component';
import { Metric01Component } from './metrics/metric_01/metric01.component';
import { Metric02Component } from './metrics/metric_02/metric02.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'chatbot', component: ChatBotComponent },
    { path: 'metrics', component: MetricsComponent },
    { path: 'metrics/metric-01', component: Metric01Component },
    { path: 'metrics/metric-02', component: Metric02Component },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
