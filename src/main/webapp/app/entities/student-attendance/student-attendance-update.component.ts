import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStudentAttendance } from 'app/shared/model/student-attendance.model';
import { StudentAttendanceService } from './student-attendance.service';
import { IStudentYear } from 'app/shared/model/student-year.model';
import { StudentYearService } from 'app/entities/student-year';
import { IDepartments } from 'app/shared/model/departments.model';
import { DepartmentsService } from 'app/entities/departments';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject';
import { ISemester } from 'app/shared/model/semester.model';
import { SemesterService } from 'app/entities/semester';
import { ISection } from 'app/shared/model/section.model';
import { SectionService } from 'app/entities/section';
import { IPeriods } from 'app/shared/model/periods.model';
import { PeriodsService } from 'app/entities/periods';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student';

@Component({
    selector: 'jhi-student-attendance-update',
    templateUrl: './student-attendance-update.component.html'
})
export class StudentAttendanceUpdateComponent implements OnInit {
    private _studentAttendance: IStudentAttendance;
    isSaving: boolean;

    studentyears: IStudentYear[];

    departments: IDepartments[];

    subjects: ISubject[];

    semesters: ISemester[];

    sections: ISection[];

    periods: IPeriods[];

    students: IStudent[];
    attendanceDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private studentAttendanceService: StudentAttendanceService,
        private studentYearService: StudentYearService,
        private departmentsService: DepartmentsService,
        private subjectService: SubjectService,
        private semesterService: SemesterService,
        private sectionService: SectionService,
        private periodsService: PeriodsService,
        private studentService: StudentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ studentAttendance }) => {
            this.studentAttendance = studentAttendance;
        });
        this.studentYearService.query().subscribe(
            (res: HttpResponse<IStudentYear[]>) => {
                this.studentyears = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.departmentsService.query().subscribe(
            (res: HttpResponse<IDepartments[]>) => {
                this.departments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.subjectService.query().subscribe(
            (res: HttpResponse<ISubject[]>) => {
                this.subjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.semesterService.query().subscribe(
            (res: HttpResponse<ISemester[]>) => {
                this.semesters = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.sectionService.query().subscribe(
            (res: HttpResponse<ISection[]>) => {
                this.sections = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.periodsService.query().subscribe(
            (res: HttpResponse<IPeriods[]>) => {
                this.periods = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.studentService.query().subscribe(
            (res: HttpResponse<IStudent[]>) => {
                this.students = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.studentAttendance.id !== undefined) {
            this.subscribeToSaveResponse(this.studentAttendanceService.update(this.studentAttendance));
        } else {
            this.subscribeToSaveResponse(this.studentAttendanceService.create(this.studentAttendance));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStudentAttendance>>) {
        result.subscribe((res: HttpResponse<IStudentAttendance>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStudentYearById(index: number, item: IStudentYear) {
        return item.id;
    }

    trackDepartmentsById(index: number, item: IDepartments) {
        return item.id;
    }

    trackSubjectById(index: number, item: ISubject) {
        return item.id;
    }

    trackSemesterById(index: number, item: ISemester) {
        return item.id;
    }

    trackSectionById(index: number, item: ISection) {
        return item.id;
    }

    trackPeriodsById(index: number, item: IPeriods) {
        return item.id;
    }

    trackStudentById(index: number, item: IStudent) {
        return item.id;
    }
    get studentAttendance() {
        return this._studentAttendance;
    }

    set studentAttendance(studentAttendance: IStudentAttendance) {
        this._studentAttendance = studentAttendance;
    }
}
