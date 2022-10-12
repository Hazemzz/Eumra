import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from '../company.services';

@Component({
  selector: 'app-details-company',
  templateUrl: './details-company.component.html',
  styleUrls: ['./details-company.component.css'],
})
export class DetailsCompanyComponent implements OnInit {
  company: Company = new Company();
  id: any;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.getDetailsById(this.id);
  }

  getDetailsById(id: any) {
    this.companyService.getCompanyById(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
