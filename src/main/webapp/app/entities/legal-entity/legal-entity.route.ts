import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LegalEntity } from 'app/shared/model/legal-entity.model';
import { LegalEntityService } from './legal-entity.service';
import { LegalEntityComponent } from './legal-entity.component';
import { LegalEntityDetailComponent } from './legal-entity-detail.component';
import { LegalEntityUpdateComponent } from './legal-entity-update.component';
import { LegalEntityDeletePopupComponent } from './legal-entity-delete-dialog.component';
import { ILegalEntity } from 'app/shared/model/legal-entity.model';

@Injectable({ providedIn: 'root' })
export class LegalEntityResolve implements Resolve<ILegalEntity> {
    constructor(private service: LegalEntityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((legalEntity: HttpResponse<LegalEntity>) => legalEntity.body));
        }
        return of(new LegalEntity());
    }
}

export const legalEntityRoute: Routes = [
    {
        path: 'legal-entity',
        component: LegalEntityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LegalEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'legal-entity/:id/view',
        component: LegalEntityDetailComponent,
        resolve: {
            legalEntity: LegalEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LegalEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'legal-entity/new',
        component: LegalEntityUpdateComponent,
        resolve: {
            legalEntity: LegalEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LegalEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'legal-entity/:id/edit',
        component: LegalEntityUpdateComponent,
        resolve: {
            legalEntity: LegalEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LegalEntities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const legalEntityPopupRoute: Routes = [
    {
        path: 'legal-entity/:id/delete',
        component: LegalEntityDeletePopupComponent,
        resolve: {
            legalEntity: LegalEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LegalEntities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
