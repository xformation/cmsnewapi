import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAuthorizedSignatory } from 'app/shared/model/authorized-signatory.model';

@Component({
    selector: 'jhi-authorized-signatory-detail',
    templateUrl: './authorized-signatory-detail.component.html'
})
export class AuthorizedSignatoryDetailComponent implements OnInit {
    authorizedSignatory: IAuthorizedSignatory;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ authorizedSignatory }) => {
            this.authorizedSignatory = authorizedSignatory;
        });
    }

    previousState() {
        window.history.back();
    }
}
