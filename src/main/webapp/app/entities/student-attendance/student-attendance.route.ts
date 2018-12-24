import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentAttendance } from 'app/shared/model/student-attendance.model';
import { StudentAttendanceService } from './student-attendance.service';
import { StudentAttendanceComponent } from './student-attendance.component';
import { StudentAttendanceDetailComponent } from './student-attendance-detail.component';
import { StudentAttendanceUpdateComponent } from './student-attendance-update.component';
import { StudentAttendanceDeletePopupComponent } from './student-attendance-delete-dialog.component';
import { IStudentAttendance } from 'app/shared/model/student-attendance.model';

@Injectable({ providedIn: 'root' })
export class StudentAttendanceResolve implements Resolve<IStudentAttendance> {
    constructor(private service: StudentAttendanceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((studentAttendance: HttpResponse<StudentAttendance>) => studentAttendance.body));
        }
        return of(new StudentAttendance());
    }
}

export const studentAttendanceRoute: Routes = [
    {
        path: 'student-attendance',
        component: StudentAttendanceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentAttendances'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-attendance/:id/view',
        component: StudentAttendanceDetailComponent,
        resolve: {
            studentAttendance: StudentAttendanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentAttendances'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-attendance/new',
        component: StudentAttendanceUpdateComponent,
        resolve: {
            studentAttendance: StudentAttendanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentAttendances'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-attendance/:id/edit',
        component: StudentAttendanceUpdateComponent,
        resolve: {
            studentAttendance: StudentAttendanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentAttendances'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentAttendancePopupRoute: Routes = [
    {
        path: 'student-attendance/:id/delete',
        component: StudentAttendanceDeletePopupComponent,
        resolve: {
            studentAttendance: StudentAttendanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentAttendances'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
