import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { format, subDays, subWeeks, subMonths } from 'date-fns';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MetricsService } from '../../services/metrics.service';
import { UserService } from '../../services/user.service';
import { User } from '../../domain/models';

@Component({
  selector: 'app-metric-01',
  standalone: true,
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
  userId:number
  currentDate:Date
  users:Array<User>
  selectedUser:FormControl 
  selectedDate:FormControl 
  selectedRange:FormControl 
  data:any[]

  constructor(private userService:UserService, private metricsService:MetricsService,private cdr: ChangeDetectorRef ) {
    this.userId = Number(localStorage.getItem('userId'));
    this.currentDate = new Date()
    this.users = []
    this.selectedUser = new FormControl()
    this.selectedDate = new FormControl(this.currentDate)
    this.selectedRange = new FormControl('día')
    this.data = []
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  updateChartData():void {
    const endDate = this.selectedDate.value??this.currentDate;
    const range = this.selectedRange.value;

    let startDate;
    if (range === 'día') {
      startDate = subDays(endDate, 0);
    } else if (range === 'semana') {
      startDate = subWeeks(endDate, 1);
      startDate = subDays(startDate, -1);
    } else {
      startDate = subMonths(endDate, 1);
      startDate = subDays(startDate, -1);
    }

    let selectedUsers:[] = this.selectedUser.value
    let selectedUserids: number[]=selectedUsers.map(user => user['id'])

    this.metricsService.countQueriesPerDateAndUsers(selectedUserids,startDate.toISOString().split('T')[0],endDate.toISOString().split('T')[0]).subscribe({
      next: (metricData) =>{
        this.data = [...metricData]
        console.log("Data: ",this.data)
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('API call completed.');
      }
    })
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (result) => {
        this.users = result.map(user => ({ 
          id: user.id, 
          username: user.username,
          password:user.password,
          createdAt:user.createdAt,
          updatedAt:user.updatedAt}));

        if (this.users.length) {
          this.selectedUser = new FormControl(this.users.filter(user => (user.id === this.userId)));
        }

        this.updateChartData();
      },
      error: (error) => console.error('Error fetching users:', error)
    });
  }


  updateChartData1():void {
    const date = this.selectedDate.value??this.currentDate;
    const range = this.selectedRange.value;
    
    let endDate;
    if (range === 'día') {
      endDate = subDays(date, 0);
    } else if (range === 'semana') {
      endDate = subWeeks(date, 1);
      endDate = subDays(endDate, -1);
    } else {
      endDate = subMonths(date, 1);
      endDate = subDays(endDate, -1);
    }

    this.data = []
    let temporalDate = endDate;

    const authors=['admin','lenin']
    while (temporalDate <= date) {
      const serie=[]
      for (let i=0;i<2;i++){
        serie.push({
          name: authors[i],
          value: Math.floor(Math.random() * 1000)
        })
      }
      this.data.push({
        name: format(temporalDate, 'yyyy-MM-dd'),
        series: serie
      });
      temporalDate = subDays(temporalDate, -1);
    }

    console.log("Data: ",this.data)
    this.cdr.markForCheck();
  }



}
