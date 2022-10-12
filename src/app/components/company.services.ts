import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

const baseUrl = 'http://localhost:8080/api/companies';

@Injectable({
  providedIn: 'root'
})
export class CompanyService{
  constructor(private http: HttpClient) { }
  getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(baseUrl);
  }

  getCompanyById(id: any): Observable<Company> {
    return this.http.get<Company>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Company[]> {
    return this.http.get<Company[]>(`${baseUrl}?title=${title}`);
  }
}
