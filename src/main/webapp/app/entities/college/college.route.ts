import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { College } from 'app/shared/model/college.model';
import { CollegeService } from './college.service';
import { CollegeComponent } from './college.component';
import { CollegeDetailComponent } from './college-detail.component';
import { CollegeUpdateComponent } from './college-update.component';
import { CollegeDeletePopupComponent } from './college-delete-dialog.component';
import { ICollege } from 'app/shared/model/college.model';

@Injectable({ providedIn: 'root' })
export class CollegeResolve implements Resolve<ICollege> {
    constructor(private service: CollegeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((college: HttpResponse<College>) => college.body));
        }
        return of(new College());
    }
}

export const collegeRoute: Routes = [
    {
        path: 'college',
        component: CollegeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colleges'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'college/:id/view',
        component: CollegeDetailComponent,
        resolve: {
            college: CollegeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colleges'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'college/new',
        component: CollegeUpdateComponent,
        resolve: {
            college: CollegeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colleges'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'college/:id/edit',
        component: CollegeUpdateComponent,
        resolve: {
            college: CollegeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colleges'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const collegePopupRoute: Routes = [
    {
        path: 'college/:id/delete',
        component: CollegeDeletePopupComponent,
        resolve: {
            college: CollegeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colleges'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
