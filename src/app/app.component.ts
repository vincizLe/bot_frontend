import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        RouterOutlet, 
        MatToolbarModule, 
        MatButtonModule,
        NgIf
    ]
})
export class AppComponent {
    constructor(public router: Router) {}

    goToChatbot() {
        this.router.navigate(['/chatbot']);
    }

    goToMetrics() {
        this.router.navigate(['/metrics']);
    }

    goToLogout() {
        // Clear session storage or local storage if needed
        localStorage.removeItem('userId');
        sessionStorage.clear();
    
        // Redirect to login and force reload
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
    }
}

