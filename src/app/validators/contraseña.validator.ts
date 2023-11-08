import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmarContraseñaValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {

      const clave = formGroup.get('password');
      const repiteClave = formGroup.get('password2');
      const respuestaError = { noCoincide: 'La contraseña no coincide' };

      if (clave?.value !== repiteClave?.value) {
        formGroup.get('password2')?.setErrors(respuestaError);        
        return respuestaError;

      } else {
        formGroup.get('password2')?.valid;        
        return null;
      }
    };
  }