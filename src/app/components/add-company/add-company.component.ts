import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Type } from 'src/Enum/Enum';
import { IdValueViewModel } from 'src/InterFace/IdValueViewModel';
import { CompanyService } from '../company.services';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
})
export class AddCompanyComponent implements OnInit {
  types = Type;
  typesArray: IdValueViewModel[];
  dataForm!: FormGroup;
  isFormSubmitted: boolean = false;
  id: number = 0;

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.typesArray = this.ConvertEnumToArray(this.types);
  }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      arabicName: ['', [Validators.required]],
      englishName: ['', [Validators.required]],
      type: ['0', [Validators.required]],
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['id'] != null) {
        this.dataForm.get('Id')?.setValue(params['id']);
        const data = this.companyService.getCompanyById(this.id);
        if (data) {
          this.dataForm.setValue(data);
        }
      }
    });
  }

  saveCompany() {
    this.isFormSubmitted = true;
    if (this.dataForm.invalid)
      return;

      if (this.dataForm.get('id')?.value === 0) {
        // on Create New User
        this.companyService.create(this.dataForm.value).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e),
        });
      } else {
        // on Update User info
        this.companyService.update(this.dataForm.value.id, this.dataForm.value).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e),
        });
      }

    this.router.navigate(['/company']);
  }

  ConvertEnumToArray(typeEnum: any) {

    const arr = Object.keys(typeEnum)
      .filter((v) => isNaN(Number(v)))
      .map((value) => {
        return {
          id: typeEnum[value as keyof typeof typeEnum],
          value,
        };
      });
    return arr;
  }
}
