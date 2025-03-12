import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatBotComponent } from './chatbot/chatbot.component';
import { MetricsComponent } from './metrics/metrics.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'chatbot', component: ChatBotComponent },
    { path: 'metrics', component: MetricsComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
