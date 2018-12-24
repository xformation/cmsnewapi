import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPeriods } from 'app/shared/model/periods.model';
import { PeriodsService } from './periods.service';
import { ISection } from 'app/shared/model/section.model';
import { SectionService } from 'app/entities/section';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from 'app/entities/teacher';

@Component({
    selector: 'jhi-periods-update',
    templateUrl: './periods-update.component.html'
})
export class PeriodsUpdateComponent implements OnInit {
    private _periods: IPeriods;
    isSaving: boolean;

    sections: ISection[];

    teachers: ITeacher[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private periodsService: PeriodsService,
        private sectionService: SectionService,
        private teacherService: TeacherService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ periods }) => {
            this.periods = periods;
        });
        this.sectionService.query().subscribe(
            (res: HttpResponse<ISection[]>) => {
                this.sections = res.body;
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
        if (this.periods.id !== undefined) {
            this.subscribeToSaveResponse(this.periodsService.update(this.periods));
        } else {
            this.subscribeToSaveResponse(this.periodsService.create(this.periods));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPeriods>>) {
        result.subscribe((res: HttpResponse<IPeriods>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSectionById(index: number, item: ISection) {
        return item.id;
    }

    trackTeacherById(index: number, item: ITeacher) {
        return item.id;
    }
    get periods() {
        return this._periods;
    }

    set periods(periods: IPeriods) {
        this._periods = periods;
    }
}
