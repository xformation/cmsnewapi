import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICollegeBranches } from 'app/shared/model/college-branches.model';

@Component({
    selector: 'jhi-college-branches-detail',
    templateUrl: './college-branches-detail.component.html'
})
export class CollegeBranchesDetailComponent implements OnInit {
    collegeBranches: ICollegeBranches;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ collegeBranches }) => {
            this.collegeBranches = collegeBranches;
        });
    }

    previousState() {
        window.history.back();
    }
}
