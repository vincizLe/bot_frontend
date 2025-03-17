import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { format, subDays, subWeeks, subMonths } from 'date-fns';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-metric-01',
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
  templateUrl: './metric01.component.html',
  styleUrls: ['./metric01.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Metric01Component {
  currentDate = new Date();

  users = ['Usuario1', 'Usuario2', 'Usuario3'];
  selectedUser = new FormControl(this.users[0]);
  selectedDate = new FormControl(this.currentDate);
  selectedRange = new FormControl('día');

  tokenData: any[] = [];

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

    this.tokenData = [];
    let temporalDate = startDate;
    while (temporalDate <= date) {
      this.tokenData.push({
        name: format(temporalDate, 'yyyy-MM-dd'),
        value: Math.floor(Math.random() * 1000)
      });
      temporalDate = subDays(temporalDate, -1);
    }
  }
}
