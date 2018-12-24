import { NgModule } from '@angular/core';

import { CmsprojectSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [CmsprojectSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [CmsprojectSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class CmsprojectSharedCommonModule {}
