import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {  FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MetricsService } from '../../services/metrics.service';
import { Author } from '../../domain/enums';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { User } from '../../domain/models';

interface Data{
  question: string;
  response: string;
  user: string;
  author:Author
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
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './metric02.component.html',
  styleUrls: ['./metric02.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Metric02Component {
  displayedColumns: string[];
  userId:number;
  users: User[];
  userDict:{[key:number]:User}
  data: Array<Data>;
  dataSource:MatTableDataSource<Data>;
  selectedUser: FormControl ;
  selectedStartDate: Date | null ;
  selectedEndDate: Date | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  constructor(private userService:UserService,private metricsService:MetricsService,private cdr: ChangeDetectorRef) {
    this.displayedColumns= ['question', 'response', 'user', 'token', 'datetime'];
    this.userId = Number(localStorage.getItem('userId'));
    this.users = [] ;
    this.userDict = {}
    this.data = [];
    this.dataSource = new MatTableDataSource<Data>([]);
    this.selectedUser = new FormControl();
    this.selectedStartDate = null;
    this.selectedEndDate = null;
  }

  ngOnInit(): void {
    this.loadUsers();
  }


  onStartDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedStartDate = event.value;  
    this.loadQueries()
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedEndDate = event.value; 
    this.loadQueries()
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (result) => {

        for(const user of result as User[]){
          this.users.push({ 
            id: user.id, 
            username: user.username,
            password:user.password,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt
          })

          this.userDict[user.id] = user
        }

        this.loadQueries()
      },
      error: (error) => console.error('Error fetching users:', error)
    });
  }

  loadQueries():void{
    let startDate = undefined
    let endDate = undefined

    if (this.selectedStartDate != null){
      startDate = this.selectedStartDate.toISOString().split('T')[0]
    }

    if(this.selectedEndDate != null){
      endDate = this.selectedEndDate.toISOString().split('T')[0]
    }

    let ids:number[] = []

    if (this.selectedUser.value != null){
      ids.push(this.selectedUser.value)
    }

    if(startDate == null){
      startDate = undefined
    }

    this.metricsService.listQueries(ids,startDate,endDate).subscribe({
      next: (queries) => {
        this.data = queries.map(query => ({
          question:query.question,
          response:query.response,
          user:this.userDict[(query.userId == 0 ?1:query.userId)].username,
          author:query.author,
          token:query.totalTokens,
          datetime:query.createdAt}))

        this.dataSource.data = this.data
        this.cdr.markForCheck()
        
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
          
      },
      error: (error) => console.error('Error fetching queries:', error)
    });
  }
}
