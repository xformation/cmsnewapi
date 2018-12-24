import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISection } from 'app/shared/model/section.model';
import { SectionService } from './section.service';
import { IStudentYear } from 'app/shared/model/student-year.model';
import { StudentYearService } from 'app/entities/student-year';

@Component({
    selector: 'jhi-section-update',
    templateUrl: './section-update.component.html'
})
export class SectionUpdateComponent implements OnInit {
    private _section: ISection;
    isSaving: boolean;

    studentyears: IStudentYear[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sectionService: SectionService,
        private studentYearService: StudentYearService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ section }) => {
            this.section = section;
        });
        this.studentYearService.query().subscribe(
            (res: HttpResponse<IStudentYear[]>) => {
                this.studentyears = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.section.id !== undefined) {
            this.subscribeToSaveResponse(this.sectionService.update(this.section));
        } else {
            this.subscribeToSaveResponse(this.sectionService.create(this.section));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISection>>) {
        result.subscribe((res: HttpResponse<ISection>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get section() {
        return this._section;
    }

    set section(section: ISection) {
        this._section = section;
    }
}
