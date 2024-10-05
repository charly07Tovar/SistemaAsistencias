window.onload = function() {
    // Obtener los datos del localStorage
    const datosAsistencia = JSON.parse(localStorage.getItem('datosAsistencia'));

    if (datosAsistencia) {
        // Mostrar los datos en un encabezado tipo tabla
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

        // Generar la tabla con el diseño solicitado
        let tablaHtml = `
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Nombre del Estudiante</th>
                    <th colspan="5">Parcial 1</th>
                    <th colspan="5">Parcial 2</th>
                    <th colspan="5">Parcial 3</th>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th>
                    <th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th>
                    <th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th>
                </tr>
            </thead>
            <tbody>
        `;

        for (let i = 1; i <= datosAsistencia.cantidadAlumnos; i++) {
            tablaHtml += `
                <tr>
                    <td>${i}</td>
                    <td></td>
                    <td></td><td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><td></td><td></td>
                </tr>
            `;
        }

        tablaHtml += `</tbody>`;
        document.getElementById('tablaAsistencia').innerHTML = tablaHtml;
    }
};
