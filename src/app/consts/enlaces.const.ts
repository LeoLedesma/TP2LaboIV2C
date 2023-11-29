export const paginas = {
    Administrador:
        [
            {
                nombre: 'Usuarios',
                path: 'listados/usuarios'
            },
            {
                nombre: 'Turnos',
                path: 'turnos/turnos'
            },
            {
                nombre: 'Solicitar turno',
                path: 'turnos/solicitar'
            }            
        ]
    ,
    Especialista:
        [
            {
                nombre: 'Mis turnos',
                path: 'turnos/misturnos'
            },
            {
                nombre: 'Pacientes',
                path: 'pacientes'
            },
        ]
    ,
    Paciente:
        [{
            nombre: 'Mis turnos',
            path: 'turnos/misturnos'
        },
        {
            nombre: 'Solicitar turno',
            path: 'turnos/solicitar'
        }]
}