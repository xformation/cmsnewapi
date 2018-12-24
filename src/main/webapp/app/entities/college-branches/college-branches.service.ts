import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICollegeBranches } from 'app/shared/model/college-branches.model';

type EntityResponseType = HttpResponse<ICollegeBranches>;
type EntityArrayResponseType = HttpResponse<ICollegeBranches[]>;

@Injectable({ providedIn: 'root' })
export class CollegeBranchesService {
    private resourceUrl = SERVER_API_URL + 'api/college-branches';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/college-branches';

    constructor(private http: HttpClient) {}

    create(collegeBranches: ICollegeBranches): Observable<EntityResponseType> {
        return this.http.post<ICollegeBranches>(this.resourceUrl, collegeBranches, { observe: 'response' });
    }

    update(collegeBranches: ICollegeBranches): Observable<EntityResponseType> {
        return this.http.put<ICollegeBranches>(this.resourceUrl, collegeBranches, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICollegeBranches>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICollegeBranches[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICollegeBranches[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
