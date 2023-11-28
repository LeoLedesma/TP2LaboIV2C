import { NgModule } from '@angular/core';
import { EspecialidadesPipe } from './especialidades.pipe';
import { FormatDatePipe } from './format-date.pipe';
import { FormatHorarioAtencionPipe } from './format-horario-atencion.pipe';


@NgModule({
    declarations: [
        FormatHorarioAtencionPipe,
        FormatDatePipe,
        EspecialidadesPipe
    ],
    imports: [
    ],
    exports: [
        FormatHorarioAtencionPipe,
        FormatDatePipe,
        EspecialidadesPipe
    ]
})
export class PipesModule { }
