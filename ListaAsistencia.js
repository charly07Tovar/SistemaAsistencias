window.onload = function() {
    const datosAsistencia = JSON.parse(localStorage.getItem('datosAsistencia'));

    if (datosAsistencia) {
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
                    <td>${datosAsistencia.periodo} ${datosAsistencia.año}</td>
                </tr>
                <tr>
                    <th>Inicio cuatrimestre:</th>
                    <td>${datosAsistencia.inicioCuatrimestre}</td>
                    <th>Fin cuatrimestre:</th>
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
                const fechaString = fechaActual.toISOString().split('T')[0];

                // Mostrar los sábados (getDay() === 6), excluir domingos (getDay() === 0)
                if (fechaActual.getDay() !== 0 && !diasFestivos.includes(fechaString)) {
                    diasActivos++;
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
                const fechaString = fechaActual.toISOString().split('T')[0];

                // Mostrar sábados pero excluir domingos
                if (fechaActual.getDay() !== 0 && !diasFestivos.includes(fechaString)) {
                    tablaHtml += `<th>${j}<br>${diasDeLaSemana[(j + new Date(año, mesIndex, 1).getDay() - 1) % 7]}</th>`;
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
                    const fechaString = fechaActual.toISOString().split('T')[0];

                    // Mostrar sábados pero excluir domingos
                    if (fechaActual.getDay() !== 0 && !diasFestivos.includes(fechaString)) {
                        tablaHtml += `<td></td>`;
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
