import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../users.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Router } from '@angular/router';

export interface User {
  name: string;
  avatar: string;
  role: number;
  email: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatToolbarModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatDividerModule, MatCardModule, MatSidenavModule, MatGridListModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {
  user: User = { name: '', avatar: '', role: 0, email: '' };
  displayedColumns: string[] = ['avatar', 'name', 'email', 'role'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};

    this.usersService.getUsers().subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator;
    })
  }

  constructor(private usersService: UsersService, private router: Router) {
  }

  gotoCatsApi() {
    this.router.navigate(['/cats']);
  }
}
