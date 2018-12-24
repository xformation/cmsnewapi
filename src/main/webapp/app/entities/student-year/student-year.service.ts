import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudentYear } from 'app/shared/model/student-year.model';

type EntityResponseType = HttpResponse<IStudentYear>;
type EntityArrayResponseType = HttpResponse<IStudentYear[]>;

@Injectable({ providedIn: 'root' })
export class StudentYearService {
    private resourceUrl = SERVER_API_URL + 'api/student-years';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/student-years';

    constructor(private http: HttpClient) {}

    create(studentYear: IStudentYear): Observable<EntityResponseType> {
        return this.http.post<IStudentYear>(this.resourceUrl, studentYear, { observe: 'response' });
    }

    update(studentYear: IStudentYear): Observable<EntityResponseType> {
        return this.http.put<IStudentYear>(this.resourceUrl, studentYear, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStudentYear>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStudentYear[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStudentYear[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
