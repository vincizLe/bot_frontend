import { ChangeDetectionStrategy, Component} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


export interface Data {
  question: string;
  response: string;
  user: string;
  token: number;
  datetime: Date;
}

@Component({
  selector: 'app-metric-02',
  imports:[
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    NgxChartsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatTableModule
  ],
  templateUrl: './metric02.component.html',
  styleUrls: ['./metric02.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Metric02Component {
  displayedColumns: string[] = ['question', 'response', 'user', 'token', 'datetime'];
  dataSource: Data[] = [
    { question: 'What is Angular?', response: 'A framework', user: 'John', token: 1, datetime: new Date() },
    { question: 'What is TypeScript?', response: 'A superset of JavaScript', user: 'Jane', token: 2, datetime: new Date() },
    { question: 'What is RxJS?', response: 'A library for reactive programming', user: 'Alice', token: 3, datetime: new Date() },
    { question: 'What is Node.js?', response: 'A JavaScript runtime', user: 'Bob', token: 4, datetime: new Date() }
  ];

  users: string[] = ['John', 'Jane', 'Alice', 'Bob'];
  selectedUser: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  onStartDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.startDate = event.value;  
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.endDate = event.value; 
  }


  filteredData(): Data[] {
    const test = this.endDate??new Date()
    
    return this.dataSource.filter(item => {

      const isDateInRange = (!this.startDate || item.datetime >= this.startDate) && (!this.endDate || item.datetime <= this.endDate);
      const isUserMatch = !this.selectedUser || item.user === this.selectedUser;
      return isDateInRange && isUserMatch;
    });
  }
}
