window.onload = function() {
    const datosAsistencia = JSON.parse(localStorage.getItem('datosAsistencia'));

    if (datosAsistencia) {
        const horasPorDia = {
            lunes: parseInt(datosAsistencia.horasLunes),
            martes: parseInt(datosAsistencia.horasMartes),
            miercoles: parseInt(datosAsistencia.horasMiercoles),
            jueves: parseInt(datosAsistencia.horasJueves),
            viernes: parseInt(datosAsistencia.horasViernes),
            sabado: parseInt(datosAsistencia.horasSabado),
        };

        const encabezadoHtml = `
            <table class="tabla-encabezado">
                <tr>
                    <th>Asignatura:</th>
                    <td>${datosAsistencia.asignatura}</td>
                    <th>Docente:</th>
                    <td>${datosAsistencia.docente}</td>
                </tr>
                <tr>
                    <th>Grupo:</th>
                    <td>${datosAsistencia.grupo}</td>
                    <th>Periodo:</th>
                    <td>${datosAsistencia.periodo}</td>
                </tr>
                <tr>
                    <th>Año:</th>
                    <td>${datosAsistencia.año}</td>
                    <th>Inicio Cuatrimestre:</th>
                    <td>${datosAsistencia.inicioCuatrimestre}</td>
                </tr>
                <tr>
                    <th>Fin Cuatrimestre:</th>
                    <td>${datosAsistencia.finCuatrimestre}</td>
                </tr>
            </table>
        `;
        document.getElementById('encabezadoAsistencia').innerHTML = encabezadoHtml;

        const año = datosAsistencia.año;
        const periodo = datosAsistencia.periodo;
        let meses = [];
        if (periodo === "Septiembre-Diciembre") {
            meses = ["Septiembre", "Octubre", "Noviembre", "Diciembre"];
        } else if (periodo === "Enero-Abril") {
            meses = ["Enero", "Febrero", "Marzo", "Abril"];
        } else if (periodo === "Mayo-Agosto") {
            meses = ["Mayo", "Junio", "Julio", "Agosto"];
        }

        const díasPorMes = meses.map(mes => {
            const mesIndex = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].indexOf(mes);
            return new Date(año, mesIndex + 1, 0).getDate();
        });

        const diasFestivos = [
            `${año}-01-01`, 
            `${año}-02-05`, 
            `${año}-03-21`, 
            `${año}-05-01`, 
            `${año}-09-16`,
            `${año}-10-01`, 
            `${año}-11-02`, 
            `${año}-11-20`, 
            `${año}-12-25`
        ];

        function obtenerRepeticionesDia(fecha) {
            switch (fecha.getDay()) {
                case 1: return horasPorDia.lunes;     // Lunes
                case 2: return horasPorDia.martes;    // Martes
                case 3: return horasPorDia.miercoles; // Miércoles
                case 4: return horasPorDia.jueves;    // Jueves
                case 5: return horasPorDia.viernes;   // Viernes
                case 6: return horasPorDia.sabado;    // Sábado
                default: return 0;                    // Domingo (no se incluye)
            }
        }

        function esDiaValido(fechaActual, diasFestivos) {
            const fechaString = fechaActual.toISOString().split('T')[0];
            return (fechaActual.getDay() !== 0 && !diasFestivos.includes(fechaString));
        }

        // Generar la tabla con el diseño modificado
        let tablaHtml = `
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Nombre del Estudiante</th>
        `;

        for (let mes of meses) {
            let diasActivos = 0;
            const mesIndex = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].indexOf(mes);
            const numDias = díasPorMes[meses.indexOf(mes)];

            // Contar solo los días no festivos y no domingos
            for (let j = 1; j <= numDias; j++) {
                const fechaActual = new Date(año, mesIndex, j);
                if (esDiaValido(fechaActual, diasFestivos)) {
                    diasActivos += obtenerRepeticionesDia(fechaActual); // Contar repeticiones según las horas
                }
            }

            tablaHtml += `<th colspan="${diasActivos}">${mes}</th>`;
        }

        tablaHtml += `
                </tr>
                <tr>
                    <th></th>
                    <th></th>
        `;

        for (let mes of meses) {
            const mesIndex = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].indexOf(mes);
            const numDias = díasPorMes[meses.indexOf(mes)];
            const diasDeLaSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

            for (let j = 1; j <= numDias; j++) {
                const fechaActual = new Date(año, mesIndex, j);

                if (esDiaValido(fechaActual, diasFestivos)) {
                    const repeticiones = obtenerRepeticionesDia(fechaActual);
                    for (let r = 0; r < repeticiones; r++) {
                        tablaHtml += `<th>${j}<br>${diasDeLaSemana[fechaActual.getDay()]}</th>`;
                    }
                }
            }
        }

        tablaHtml += `
                </tr>
            </thead>
            <tbody>
        `;

        for (let i = 1; i <= datosAsistencia.cantidadAlumnos; i++) {
            tablaHtml += `
                <tr>
                    <td>${i}</td>
                    <td></td>
            `;

            for (let mes of meses) {
                const mesIndex = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].indexOf(mes);
                const numDias = díasPorMes[meses.indexOf(mes)];

                for (let j = 1; j <= numDias; j++) {
                    const fechaActual = new Date(año, mesIndex, j);

                    if (esDiaValido(fechaActual, diasFestivos)) {
                        const repeticiones = obtenerRepeticionesDia(fechaActual);
                        for (let r = 0; r < repeticiones; r++) {
                            tablaHtml += `<td></td>`;
                        }
                    }
                }
            }

            tablaHtml += `
                </tr>
            `;
        }

        tablaHtml += `</tbody>`;
        document.getElementById('tablaAsistencia').innerHTML = tablaHtml;
    }
};
