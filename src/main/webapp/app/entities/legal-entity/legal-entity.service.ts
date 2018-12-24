import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILegalEntity } from 'app/shared/model/legal-entity.model';

type EntityResponseType = HttpResponse<ILegalEntity>;
type EntityArrayResponseType = HttpResponse<ILegalEntity[]>;

@Injectable({ providedIn: 'root' })
export class LegalEntityService {
    private resourceUrl = SERVER_API_URL + 'api/legal-entities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/legal-entities';

    constructor(private http: HttpClient) {}

    create(legalEntity: ILegalEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(legalEntity);
        return this.http
            .post<ILegalEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(legalEntity: ILegalEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(legalEntity);
        return this.http
            .put<ILegalEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILegalEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILegalEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILegalEntity[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(legalEntity: ILegalEntity): ILegalEntity {
        const copy: ILegalEntity = Object.assign({}, legalEntity, {
            dateOfIncorporation:
                legalEntity.dateOfIncorporation != null && legalEntity.dateOfIncorporation.isValid()
                    ? legalEntity.dateOfIncorporation.format(DATE_FORMAT)
                    : null,
            registrationDate:
                legalEntity.registrationDate != null && legalEntity.registrationDate.isValid()
                    ? legalEntity.registrationDate.format(DATE_FORMAT)
                    : null,
            ptRegistrationDate:
                legalEntity.ptRegistrationDate != null && legalEntity.ptRegistrationDate.isValid()
                    ? legalEntity.ptRegistrationDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateOfIncorporation = res.body.dateOfIncorporation != null ? moment(res.body.dateOfIncorporation) : null;
        res.body.registrationDate = res.body.registrationDate != null ? moment(res.body.registrationDate) : null;
        res.body.ptRegistrationDate = res.body.ptRegistrationDate != null ? moment(res.body.ptRegistrationDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((legalEntity: ILegalEntity) => {
            legalEntity.dateOfIncorporation = legalEntity.dateOfIncorporation != null ? moment(legalEntity.dateOfIncorporation) : null;
            legalEntity.registrationDate = legalEntity.registrationDate != null ? moment(legalEntity.registrationDate) : null;
            legalEntity.ptRegistrationDate = legalEntity.ptRegistrationDate != null ? moment(legalEntity.ptRegistrationDate) : null;
        });
        return res;
    }
}
