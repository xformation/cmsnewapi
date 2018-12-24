import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDepartments } from 'app/shared/model/departments.model';

type EntityResponseType = HttpResponse<IDepartments>;
type EntityArrayResponseType = HttpResponse<IDepartments[]>;

@Injectable({ providedIn: 'root' })
export class DepartmentsService {
    private resourceUrl = SERVER_API_URL + 'api/departments';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/departments';

    constructor(private http: HttpClient) {}

    create(departments: IDepartments): Observable<EntityResponseType> {
        return this.http.post<IDepartments>(this.resourceUrl, departments, { observe: 'response' });
    }

    update(departments: IDepartments): Observable<EntityResponseType> {
        return this.http.put<IDepartments>(this.resourceUrl, departments, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDepartments>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDepartments[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDepartments[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
