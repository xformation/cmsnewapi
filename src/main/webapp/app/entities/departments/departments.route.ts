import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Departments } from 'app/shared/model/departments.model';
import { DepartmentsService } from './departments.service';
import { DepartmentsComponent } from './departments.component';
import { DepartmentsDetailComponent } from './departments-detail.component';
import { DepartmentsUpdateComponent } from './departments-update.component';
import { DepartmentsDeletePopupComponent } from './departments-delete-dialog.component';
import { IDepartments } from 'app/shared/model/departments.model';

@Injectable({ providedIn: 'root' })
export class DepartmentsResolve implements Resolve<IDepartments> {
    constructor(private service: DepartmentsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((departments: HttpResponse<Departments>) => departments.body));
        }
        return of(new Departments());
    }
}

export const departmentsRoute: Routes = [
    {
        path: 'departments',
        component: DepartmentsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'departments/:id/view',
        component: DepartmentsDetailComponent,
        resolve: {
            departments: DepartmentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'departments/new',
        component: DepartmentsUpdateComponent,
        resolve: {
            departments: DepartmentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'departments/:id/edit',
        component: DepartmentsUpdateComponent,
        resolve: {
            departments: DepartmentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const departmentsPopupRoute: Routes = [
    {
        path: 'departments/:id/delete',
        component: DepartmentsDeletePopupComponent,
        resolve: {
            departments: DepartmentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
