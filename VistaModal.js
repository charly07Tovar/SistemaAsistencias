document.getElementById('asistenciaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const periodo = document.getElementById('periodo').value;
    const cuatrimestre = document.getElementById('cuatrimestre').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const asignatura = document.getElementById('asignatura').value;
    const nombreDocente = document.getElementById('nombreDocente').value;
    const cantidadAlumnos = document.getElementById('cantidadAlumnos').value;
    const horasPorDia = document.getElementById('horasPorDia').value;

    let previewTable = `
        <table>
            <thead>
                <tr>
                    <th colspan="2">Lista de Asistencias del Periodo ${periodo}</th>
                </tr>
                <tr>
                    <th>Nombre del Docente</th>
                    <th>${nombreDocente}</th>
                </tr>
                <tr>
                    <th>Asignatura</th>
                    <th>${asignatura}</th>
                </tr>
               
                <tr>
                    <th>Cuatrimestre</th>
                    <th>${cuatrimestre}</th>
                </tr>
                
                <tr>
                    <th>Periodo Escolar</th>
                    <th>${periodo}</th>
                </tr>

                <tr>
                    <th>Fecha Inicio del Cuatrimestre</th>
                    <th>${fechaInicio}</th>
                </tr>

                <tr>
                    <th>Fecha Fin del Cuatrimestre</th>
                    <th>${fechaFin}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Día</th>
                    <th>Horas por Día</th>
                </tr>
    `;

    // Genera las filas por la cantidad de alumnos
    for (let i = 1; i <= cantidadAlumnos; i++) {
        previewTable += `
            <tr>
                <td>Alumno ${i}</td>
                <td>${horasPorDia}</td>
            </tr>
        `;
    }

    previewTable += `
            </tbody>
        </table>
    `;

    document.getElementById('previewTableContainer').innerHTML = previewTable;

    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    document.querySelector('.close').onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});