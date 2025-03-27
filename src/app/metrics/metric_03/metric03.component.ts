import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { format, subDays, subWeeks, subMonths } from 'date-fns';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-metric-03',
  imports:[
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    NgxChartsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  templateUrl: './metric03.component.html',
  styleUrls: ['./metric03.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Metric03Component {
  currentDate = new Date();

  users = ['Usuario1', 'Usuario2', 'Usuario3'];
  selectedUser = new FormControl(this.users[0]);
  selectedDate = new FormControl(this.currentDate);
  selectedRange = new FormControl('día');

  queriesSerie: any[] = [];

  //colorScheme = {
  //  domain: ['#004cba', '#ba0001']
  //};

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#004cba', '#ba0001']
  };

  constructor() {
    this.updateChartData();
  }

  updateChartData() {
    const date = this.selectedDate.value??this.currentDate;
    const range = this.selectedRange.value;
    
    let startDate;
    if (range === 'día') {
      startDate = subDays(date, 0);
    } else if (range === 'semana') {
      startDate = subWeeks(date, 1);
      startDate = subDays(startDate, -1);
    } else {
      startDate = subMonths(date, 1);
      startDate = subDays(startDate, -1);
    }

    this.queriesSerie = [];
    let temporalDate = startDate;

    const authors=['Bot','Chatgpt']
    while (temporalDate <= date) {
      const serie=[]
      for (let i=0;i<2;i++){
        serie.push({
          name: authors[i],
          value: Math.floor(Math.random() * 1000)
        })
      }
      this.queriesSerie.push({
        name: format(temporalDate, 'yyyy-MM-dd'),
        series: serie
      });
      temporalDate = subDays(temporalDate, -1);
    }

    console.log(this.queriesSerie)
  }
}
