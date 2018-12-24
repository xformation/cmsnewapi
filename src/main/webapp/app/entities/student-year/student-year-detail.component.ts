import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudentYear } from 'app/shared/model/student-year.model';

@Component({
    selector: 'jhi-student-year-detail',
    templateUrl: './student-year-detail.component.html'
})
export class StudentYearDetailComponent implements OnInit {
    studentYear: IStudentYear;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ studentYear }) => {
            this.studentYear = studentYear;
        });
    }

    previousState() {
        window.history.back();
    }
}
