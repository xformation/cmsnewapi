import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CollegeBranches } from 'app/shared/model/college-branches.model';
import { CollegeBranchesService } from './college-branches.service';
import { CollegeBranchesComponent } from './college-branches.component';
import { CollegeBranchesDetailComponent } from './college-branches-detail.component';
import { CollegeBranchesUpdateComponent } from './college-branches-update.component';
import { CollegeBranchesDeletePopupComponent } from './college-branches-delete-dialog.component';
import { ICollegeBranches } from 'app/shared/model/college-branches.model';

@Injectable({ providedIn: 'root' })
export class CollegeBranchesResolve implements Resolve<ICollegeBranches> {
    constructor(private service: CollegeBranchesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((collegeBranches: HttpResponse<CollegeBranches>) => collegeBranches.body));
        }
        return of(new CollegeBranches());
    }
}

export const collegeBranchesRoute: Routes = [
    {
        path: 'college-branches',
        component: CollegeBranchesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CollegeBranches'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'college-branches/:id/view',
        component: CollegeBranchesDetailComponent,
        resolve: {
            collegeBranches: CollegeBranchesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CollegeBranches'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'college-branches/new',
        component: CollegeBranchesUpdateComponent,
        resolve: {
            collegeBranches: CollegeBranchesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CollegeBranches'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'college-branches/:id/edit',
        component: CollegeBranchesUpdateComponent,
        resolve: {
            collegeBranches: CollegeBranchesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CollegeBranches'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const collegeBranchesPopupRoute: Routes = [
    {
        path: 'college-branches/:id/delete',
        component: CollegeBranchesDeletePopupComponent,
        resolve: {
            collegeBranches: CollegeBranchesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CollegeBranches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
