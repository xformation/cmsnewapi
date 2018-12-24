import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';
import { IPeriods } from 'app/shared/model/periods.model';
import { PeriodsService } from 'app/entities/periods';

@Component({
    selector: 'jhi-teacher-update',
    templateUrl: './teacher-update.component.html'
})
export class TeacherUpdateComponent implements OnInit {
    private _teacher: ITeacher;
    isSaving: boolean;

    periods: IPeriods[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private teacherService: TeacherService,
        private periodsService: PeriodsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ teacher }) => {
            this.teacher = teacher;
        });
        this.periodsService.query({ filter: 'teacher-is-null' }).subscribe(
            (res: HttpResponse<IPeriods[]>) => {
                if (!this.teacher.periodsId) {
                    this.periods = res.body;
                } else {
                    this.periodsService.find(this.teacher.periodsId).subscribe(
                        (subRes: HttpResponse<IPeriods>) => {
                            this.periods = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.teacher.id !== undefined) {
            this.subscribeToSaveResponse(this.teacherService.update(this.teacher));
        } else {
            this.subscribeToSaveResponse(this.teacherService.create(this.teacher));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITeacher>>) {
        result.subscribe((res: HttpResponse<ITeacher>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get teacher() {
        return this._teacher;
    }

    set teacher(teacher: ITeacher) {
        this._teacher = teacher;
    }
}
