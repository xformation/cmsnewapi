import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISemester } from 'app/shared/model/semester.model';

type EntityResponseType = HttpResponse<ISemester>;
type EntityArrayResponseType = HttpResponse<ISemester[]>;

@Injectable({ providedIn: 'root' })
export class SemesterService {
    private resourceUrl = SERVER_API_URL + 'api/semesters';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/semesters';

    constructor(private http: HttpClient) {}

    create(semester: ISemester): Observable<EntityResponseType> {
        return this.http.post<ISemester>(this.resourceUrl, semester, { observe: 'response' });
    }

    update(semester: ISemester): Observable<EntityResponseType> {
        return this.http.put<ISemester>(this.resourceUrl, semester, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISemester>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISemester[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISemester[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
