import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentYear } from 'app/shared/model/student-year.model';
import { StudentYearService } from './student-year.service';
import { StudentYearComponent } from './student-year.component';
import { StudentYearDetailComponent } from './student-year-detail.component';
import { StudentYearUpdateComponent } from './student-year-update.component';
import { StudentYearDeletePopupComponent } from './student-year-delete-dialog.component';
import { IStudentYear } from 'app/shared/model/student-year.model';

@Injectable({ providedIn: 'root' })
export class StudentYearResolve implements Resolve<IStudentYear> {
    constructor(private service: StudentYearService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((studentYear: HttpResponse<StudentYear>) => studentYear.body));
        }
        return of(new StudentYear());
    }
}

export const studentYearRoute: Routes = [
    {
        path: 'student-year',
        component: StudentYearComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentYears'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-year/:id/view',
        component: StudentYearDetailComponent,
        resolve: {
            studentYear: StudentYearResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentYears'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-year/new',
        component: StudentYearUpdateComponent,
        resolve: {
            studentYear: StudentYearResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentYears'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-year/:id/edit',
        component: StudentYearUpdateComponent,
        resolve: {
            studentYear: StudentYearResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentYears'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentYearPopupRoute: Routes = [
    {
        path: 'student-year/:id/delete',
        component: StudentYearDeletePopupComponent,
        resolve: {
            studentYear: StudentYearResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentYears'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
