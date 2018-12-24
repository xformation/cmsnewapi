import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizedSignatory } from 'app/shared/model/authorized-signatory.model';
import { AuthorizedSignatoryService } from './authorized-signatory.service';
import { AuthorizedSignatoryComponent } from './authorized-signatory.component';
import { AuthorizedSignatoryDetailComponent } from './authorized-signatory-detail.component';
import { AuthorizedSignatoryUpdateComponent } from './authorized-signatory-update.component';
import { AuthorizedSignatoryDeletePopupComponent } from './authorized-signatory-delete-dialog.component';
import { IAuthorizedSignatory } from 'app/shared/model/authorized-signatory.model';

@Injectable({ providedIn: 'root' })
export class AuthorizedSignatoryResolve implements Resolve<IAuthorizedSignatory> {
    constructor(private service: AuthorizedSignatoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((authorizedSignatory: HttpResponse<AuthorizedSignatory>) => authorizedSignatory.body));
        }
        return of(new AuthorizedSignatory());
    }
}

export const authorizedSignatoryRoute: Routes = [
    {
        path: 'authorized-signatory',
        component: AuthorizedSignatoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AuthorizedSignatories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'authorized-signatory/:id/view',
        component: AuthorizedSignatoryDetailComponent,
        resolve: {
            authorizedSignatory: AuthorizedSignatoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AuthorizedSignatories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'authorized-signatory/new',
        component: AuthorizedSignatoryUpdateComponent,
        resolve: {
            authorizedSignatory: AuthorizedSignatoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AuthorizedSignatories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'authorized-signatory/:id/edit',
        component: AuthorizedSignatoryUpdateComponent,
        resolve: {
            authorizedSignatory: AuthorizedSignatoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AuthorizedSignatories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const authorizedSignatoryPopupRoute: Routes = [
    {
        path: 'authorized-signatory/:id/delete',
        component: AuthorizedSignatoryDeletePopupComponent,
        resolve: {
            authorizedSignatory: AuthorizedSignatoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AuthorizedSignatories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
