import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  keys: string[] = [];
  typesArray: IdValueViewModel[];
  dataForm!: FormGroup;
  isFormSubmitted: boolean = false;
  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder
  ) {
    this.typesArray = this.ConvertEnumToArray(this.types);
  }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      arabicName: ['', [Validators.required]],
      englishName: ['', [Validators.required]],
      type: ['0', [Validators.required]],
    });
  }

  saveCompany() {
    this.isFormSubmitted = true;
    if (this.dataForm.invalid) {
      return;
    } else {
      console.log(this.dataForm.value);
      this.companyService.create(this.dataForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e),
      });
    }
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
