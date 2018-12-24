import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartments } from 'app/shared/model/departments.model';

@Component({
    selector: 'jhi-departments-detail',
    templateUrl: './departments-detail.component.html'
})
export class DepartmentsDetailComponent implements OnInit {
    departments: IDepartments;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ departments }) => {
            this.departments = departments;
        });
    }

    previousState() {
        window.history.back();
    }
}
