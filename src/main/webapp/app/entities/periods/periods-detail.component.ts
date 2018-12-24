import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPeriods } from 'app/shared/model/periods.model';

@Component({
    selector: 'jhi-periods-detail',
    templateUrl: './periods-detail.component.html'
})
export class PeriodsDetailComponent implements OnInit {
    periods: IPeriods;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ periods }) => {
            this.periods = periods;
        });
    }

    previousState() {
        window.history.back();
    }
}
