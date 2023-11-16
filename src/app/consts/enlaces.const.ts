export const paginas = {
    Administrador:
        [
            {
                nombre: 'Usuarios',
                path: 'listados/usuarios'
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
            }
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