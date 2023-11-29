import { NgModule } from '@angular/core';
import { EspecialidadesPipe } from './especialidades.pipe';
import { FormatDatePipe } from './format-date.pipe';
import { FormatDateModifPipe } from './format-dateModif.pipe';
import { FormatHorarioAtencionPipe } from './format-horario-atencion.pipe';


@NgModule({
    declarations: [
        FormatHorarioAtencionPipe,
        FormatDatePipe,
        EspecialidadesPipe,
        FormatDateModifPipe

    ],
    imports: [
    ],
    exports: [
        FormatHorarioAtencionPipe,
        FormatDatePipe,
        EspecialidadesPipe,
        FormatDateModifPipe
    ]
})
export class PipesModule { }
