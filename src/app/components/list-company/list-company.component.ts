import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from '../company.services';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css'],
})
export class ListCompanyComponent implements OnInit {
  companies?: Company[];
  arabicName = '';
  company: Company = new Company();

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.GetCompanies();
  }
  GetCompanies(): void {
    this.companies = [
      {
        id: 1,
        englishName: 'asdsd',
        arabicName: 'Rahul',
        type: '21',
      },
      {
        id: 2,
        englishName: '2',
        arabicName: 'Ajay',
        type: '25',
      },
    ];

    this.companyService.getAll().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  search(): void {
    this.companyService.findByTitle(this.arabicName).subscribe({
      next: (data) => {
        this.companies = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  getId(id: any, status: number) {
    if (status == 1) {
      this.router.navigate(['/update', id]);
    } else {
      this.router.navigate(['/details', id]);
    }
  }

  deleteCompany(id: any): void {
    this.companyService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/company']);
      },
      error: (e) => console.error(e),
    });
  }
}
