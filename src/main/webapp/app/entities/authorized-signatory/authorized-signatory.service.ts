import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAuthorizedSignatory } from 'app/shared/model/authorized-signatory.model';

type EntityResponseType = HttpResponse<IAuthorizedSignatory>;
type EntityArrayResponseType = HttpResponse<IAuthorizedSignatory[]>;

@Injectable({ providedIn: 'root' })
export class AuthorizedSignatoryService {
    private resourceUrl = SERVER_API_URL + 'api/authorized-signatories';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/authorized-signatories';

    constructor(private http: HttpClient) {}

    create(authorizedSignatory: IAuthorizedSignatory): Observable<EntityResponseType> {
        return this.http.post<IAuthorizedSignatory>(this.resourceUrl, authorizedSignatory, { observe: 'response' });
    }

    update(authorizedSignatory: IAuthorizedSignatory): Observable<EntityResponseType> {
        return this.http.put<IAuthorizedSignatory>(this.resourceUrl, authorizedSignatory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAuthorizedSignatory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAuthorizedSignatory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAuthorizedSignatory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
