import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from './subject.service';
import { IPeriods } from 'app/shared/model/periods.model';
import { PeriodsService } from 'app/entities/periods';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from 'app/entities/teacher';

@Component({
    selector: 'jhi-subject-update',
    templateUrl: './subject-update.component.html'
})
export class SubjectUpdateComponent implements OnInit {
    private _subject: ISubject;
    isSaving: boolean;

    periods: IPeriods[];

    students: IStudent[];

    teachers: ITeacher[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private subjectService: SubjectService,
        private periodsService: PeriodsService,
        private studentService: StudentService,
        private teacherService: TeacherService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subject }) => {
            this.subject = subject;
        });
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
        this.teacherService.query().subscribe(
            (res: HttpResponse<ITeacher[]>) => {
                this.teachers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.subject.id !== undefined) {
            this.subscribeToSaveResponse(this.subjectService.update(this.subject));
        } else {
            this.subscribeToSaveResponse(this.subjectService.create(this.subject));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISubject>>) {
        result.subscribe((res: HttpResponse<ISubject>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPeriodsById(index: number, item: IPeriods) {
        return item.id;
    }

    trackStudentById(index: number, item: IStudent) {
        return item.id;
    }

    trackTeacherById(index: number, item: ITeacher) {
        return item.id;
    }
    get subject() {
        return this._subject;
    }

    set subject(subject: ISubject) {
        this._subject = subject;
    }
}
