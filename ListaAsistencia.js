function generarLista() {
    // Obtener los datos del formulario
    const asignatura = document.getElementById('asignatura').value;
    const docente = document.getElementById('docente').value;
    const grupo = document.getElementById('grupo').value;
    const periodo = document.getElementById('periodo').value;
    const año = document.getElementById('año').value;
    const inicioCuatrimestre = new Date(document.getElementById('inicioCuatrimestre').value);
    const finCuatrimestre = new Date(document.getElementById('finCuatrimestre').value);
    const vacacionesInicio = new Date(document.getElementById('vacacionesInicio').value);
    const vacacionesFin = new Date(document.getElementById('vacacionesFin').value);
    const inicioParcial1 = new Date(document.getElementById('inicioParcial1').value);
    const finParcial1 = new Date(document.getElementById('finParcial1').value);
    const inicioParcial2 = new Date(document.getElementById('inicioParcial2').value);
    const finParcial2 = new Date(document.getElementById('finParcial2').value);
    const inicioParcial3 = new Date(document.getElementById('inicioParcial3').value);
    const finParcial3 = new Date(document.getElementById('finParcial3').value);
    const cantidadAlumnos = parseInt(document.getElementById('cantidadAlumnos').value);
    const horasPorDia = {
        lunes: parseInt(document.getElementById('horasLunes').value),
        martes: parseInt(document.getElementById('horasMartes').value),
        miercoles: parseInt(document.getElementById('horasMiercoles').value),
        jueves: parseInt(document.getElementById('horasJueves').value),
        viernes: parseInt(document.getElementById('horasViernes').value),
        sabado: parseInt(document.getElementById('horasSabado').value),
    };
    const diasInhabiles = document.getElementById('diasInhabiles').value.split(',').map(d => new Date(d.trim()));

    // Función para verificar si una fecha es hábil
    function esDiaHabil(fecha) {
        const diaSemana = fecha.getDay();
        return (
            fecha >= inicioCuatrimestre && 
            fecha <= finCuatrimestre && 
            !(fecha >= vacacionesInicio && fecha <= vacacionesFin) &&
            !diasInhabiles.some(d => d.getTime() === fecha.getTime()) &&
            diaSemana !== 0 // 0 = Domingo
        );
    }

    // Obtener fechas hábiles
    let fechasAsistencias = [];
    for (let d = new Date(inicioCuatrimestre); d <= finCuatrimestre; d.setDate(d.getDate() + 1)) {
        if (esDiaHabil(d)) {
            fechasAsistencias.push(new Date(d));
        }
    }

    // Crear una cadena de parámetros para pasar a la nueva página
    const params = new URLSearchParams({
        asignatura,
        docente,
        grupo,
        periodo,
        año,
        cantidadAlumnos,
        horasLunes: horasPorDia.lunes,
        horasMartes: horasPorDia.martes,
        horasMiercoles: horasPorDia.miercoles,
        horasJueves: horasPorDia.jueves,
        horasViernes: horasPorDia.viernes,
        horasSabado: horasPorDia.sabado,
        fechasAsistencias: JSON.stringify(fechasAsistencias.map(date => date.toISOString())),
    }).toString();

    // Redirigir a la nueva página con los parámetros
    window.location.href = `tabla_asistencia.html?${params}`;
    return false; // Evita el envío del formulario
}
