import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICollege } from 'app/shared/model/college.model';

type EntityResponseType = HttpResponse<ICollege>;
type EntityArrayResponseType = HttpResponse<ICollege[]>;

@Injectable({ providedIn: 'root' })
export class CollegeService {
    private resourceUrl = SERVER_API_URL + 'api/colleges';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/colleges';

    constructor(private http: HttpClient) {}

    create(college: ICollege): Observable<EntityResponseType> {
        return this.http.post<ICollege>(this.resourceUrl, college, { observe: 'response' });
    }

    update(college: ICollege): Observable<EntityResponseType> {
        return this.http.put<ICollege>(this.resourceUrl, college, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICollege>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICollege[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICollege[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
