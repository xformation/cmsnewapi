import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Teacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';
import { TeacherComponent } from './teacher.component';
import { TeacherDetailComponent } from './teacher-detail.component';
import { TeacherUpdateComponent } from './teacher-update.component';
import { TeacherDeletePopupComponent } from './teacher-delete-dialog.component';
import { ITeacher } from 'app/shared/model/teacher.model';

@Injectable({ providedIn: 'root' })
export class TeacherResolve implements Resolve<ITeacher> {
    constructor(private service: TeacherService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((teacher: HttpResponse<Teacher>) => teacher.body));
        }
        return of(new Teacher());
    }
}

export const teacherRoute: Routes = [
    {
        path: 'teacher',
        component: TeacherComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teacher/:id/view',
        component: TeacherDetailComponent,
        resolve: {
            teacher: TeacherResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teacher/new',
        component: TeacherUpdateComponent,
        resolve: {
            teacher: TeacherResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teacher/:id/edit',
        component: TeacherUpdateComponent,
        resolve: {
            teacher: TeacherResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teacherPopupRoute: Routes = [
    {
        path: 'teacher/:id/delete',
        component: TeacherDeletePopupComponent,
        resolve: {
            teacher: TeacherResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
