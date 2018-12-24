import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPeriods } from 'app/shared/model/periods.model';

type EntityResponseType = HttpResponse<IPeriods>;
type EntityArrayResponseType = HttpResponse<IPeriods[]>;

@Injectable({ providedIn: 'root' })
export class PeriodsService {
    private resourceUrl = SERVER_API_URL + 'api/periods';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/periods';

    constructor(private http: HttpClient) {}

    create(periods: IPeriods): Observable<EntityResponseType> {
        return this.http.post<IPeriods>(this.resourceUrl, periods, { observe: 'response' });
    }

    update(periods: IPeriods): Observable<EntityResponseType> {
        return this.http.put<IPeriods>(this.resourceUrl, periods, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPeriods>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPeriods[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPeriods[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
