import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudentAttendance } from 'app/shared/model/student-attendance.model';

@Component({
    selector: 'jhi-student-attendance-detail',
    templateUrl: './student-attendance-detail.component.html'
})
export class StudentAttendanceDetailComponent implements OnInit {
    studentAttendance: IStudentAttendance;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ studentAttendance }) => {
            this.studentAttendance = studentAttendance;
        });
    }

    previousState() {
        window.history.back();
    }
}
