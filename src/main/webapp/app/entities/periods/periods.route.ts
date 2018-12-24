import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Periods } from 'app/shared/model/periods.model';
import { PeriodsService } from './periods.service';
import { PeriodsComponent } from './periods.component';
import { PeriodsDetailComponent } from './periods-detail.component';
import { PeriodsUpdateComponent } from './periods-update.component';
import { PeriodsDeletePopupComponent } from './periods-delete-dialog.component';
import { IPeriods } from 'app/shared/model/periods.model';

@Injectable({ providedIn: 'root' })
export class PeriodsResolve implements Resolve<IPeriods> {
    constructor(private service: PeriodsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((periods: HttpResponse<Periods>) => periods.body));
        }
        return of(new Periods());
    }
}

export const periodsRoute: Routes = [
    {
        path: 'periods',
        component: PeriodsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Periods'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'periods/:id/view',
        component: PeriodsDetailComponent,
        resolve: {
            periods: PeriodsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Periods'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'periods/new',
        component: PeriodsUpdateComponent,
        resolve: {
            periods: PeriodsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Periods'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'periods/:id/edit',
        component: PeriodsUpdateComponent,
        resolve: {
            periods: PeriodsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Periods'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const periodsPopupRoute: Routes = [
    {
        path: 'periods/:id/delete',
        component: PeriodsDeletePopupComponent,
        resolve: {
            periods: PeriodsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Periods'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
