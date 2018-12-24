import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILegalEntity } from 'app/shared/model/legal-entity.model';
import { LegalEntityService } from './legal-entity.service';
import { IAuthorizedSignatory } from 'app/shared/model/authorized-signatory.model';
import { AuthorizedSignatoryService } from 'app/entities/authorized-signatory';

@Component({
    selector: 'jhi-legal-entity-update',
    templateUrl: './legal-entity-update.component.html'
})
export class LegalEntityUpdateComponent implements OnInit {
    private _legalEntity: ILegalEntity;
    isSaving: boolean;

    authorizedsignatories: IAuthorizedSignatory[];
    dateOfIncorporationDp: any;
    registrationDateDp: any;
    ptRegistrationDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private legalEntityService: LegalEntityService,
        private authorizedSignatoryService: AuthorizedSignatoryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ legalEntity }) => {
            this.legalEntity = legalEntity;
        });
        this.authorizedSignatoryService.query().subscribe(
            (res: HttpResponse<IAuthorizedSignatory[]>) => {
                this.authorizedsignatories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.legalEntity.id !== undefined) {
            this.subscribeToSaveResponse(this.legalEntityService.update(this.legalEntity));
        } else {
            this.subscribeToSaveResponse(this.legalEntityService.create(this.legalEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILegalEntity>>) {
        result.subscribe((res: HttpResponse<ILegalEntity>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAuthorizedSignatoryById(index: number, item: IAuthorizedSignatory) {
        return item.id;
    }
    get legalEntity() {
        return this._legalEntity;
    }

    set legalEntity(legalEntity: ILegalEntity) {
        this._legalEntity = legalEntity;
    }
}
