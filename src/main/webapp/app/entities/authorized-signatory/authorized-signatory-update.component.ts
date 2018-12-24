import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAuthorizedSignatory } from 'app/shared/model/authorized-signatory.model';
import { AuthorizedSignatoryService } from './authorized-signatory.service';

@Component({
    selector: 'jhi-authorized-signatory-update',
    templateUrl: './authorized-signatory-update.component.html'
})
export class AuthorizedSignatoryUpdateComponent implements OnInit {
    private _authorizedSignatory: IAuthorizedSignatory;
    isSaving: boolean;

    constructor(private authorizedSignatoryService: AuthorizedSignatoryService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ authorizedSignatory }) => {
            this.authorizedSignatory = authorizedSignatory;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.authorizedSignatory.id !== undefined) {
            this.subscribeToSaveResponse(this.authorizedSignatoryService.update(this.authorizedSignatory));
        } else {
            this.subscribeToSaveResponse(this.authorizedSignatoryService.create(this.authorizedSignatory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAuthorizedSignatory>>) {
        result.subscribe((res: HttpResponse<IAuthorizedSignatory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get authorizedSignatory() {
        return this._authorizedSignatory;
    }

    set authorizedSignatory(authorizedSignatory: IAuthorizedSignatory) {
        this._authorizedSignatory = authorizedSignatory;
    }
}
