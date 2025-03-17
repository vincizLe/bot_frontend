import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metrics',
  imports:[
    MatCardModule,
    NgFor
  ],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent {
  constructor(private router: Router) {}

  metrics = [
    {
      title: 'Tokens consumidos',
      description: 'Este gráfico representa los tokens consumidos por un usuario en una determinada fecha.',
      image: 'https://cdnwebsite.databox.com/wp-content/uploads/2019/05/22115536/website-kpis.png',
      route: '/metrics/metric-01'
    },
    {
      title: 'Consultas',
      description: 'Esta lista muestra las consultas realizadas por el chatbot.',
      image: 'https://cdnwebsite.databox.com/wp-content/uploads/2019/05/22115536/website-kpis.png',
      route: '/metrics/metric-02'
    }
  ];

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
} 