import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudentAttendance } from 'app/shared/model/student-attendance.model';

type EntityResponseType = HttpResponse<IStudentAttendance>;
type EntityArrayResponseType = HttpResponse<IStudentAttendance[]>;

@Injectable({ providedIn: 'root' })
export class StudentAttendanceService {
    private resourceUrl = SERVER_API_URL + 'api/student-attendances';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/student-attendances';

    constructor(private http: HttpClient) {}

    create(studentAttendance: IStudentAttendance): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(studentAttendance);
        return this.http
            .post<IStudentAttendance>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(studentAttendance: IStudentAttendance): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(studentAttendance);
        return this.http
            .put<IStudentAttendance>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStudentAttendance>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStudentAttendance[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStudentAttendance[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(studentAttendance: IStudentAttendance): IStudentAttendance {
        const copy: IStudentAttendance = Object.assign({}, studentAttendance, {
            attendanceDate:
                studentAttendance.attendanceDate != null && studentAttendance.attendanceDate.isValid()
                    ? studentAttendance.attendanceDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.attendanceDate = res.body.attendanceDate != null ? moment(res.body.attendanceDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((studentAttendance: IStudentAttendance) => {
            studentAttendance.attendanceDate = studentAttendance.attendanceDate != null ? moment(studentAttendance.attendanceDate) : null;
        });
        return res;
    }
}
