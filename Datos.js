function enviarDatos() {
    // Capturar los valores del formulario
    const datosFormulario = {
        asignatura: document.getElementById('asignatura').value,
        docente: document.getElementById('docente').value,
        grupo: document.getElementById('grupo').value,
        periodo: document.getElementById('periodo').value,
        año: document.getElementById('año').value,
        inicioCuatrimestre: document.getElementById('inicioCuatrimestre').value,
        finCuatrimestre: document.getElementById('finCuatrimestre').value,
        vacacionesInicio: document.getElementById('vacacionesInicio').value,
        vacacionesFin: document.getElementById('vacacionesFin').value,
        inicioParcial1: document.getElementById('inicioParcial1').value,
        finParcial1: document.getElementById('finParcial1').value,
        inicioParcial2: document.getElementById('inicioParcial2').value,
        finParcial2: document.getElementById('finParcial2').value,
        inicioParcial3: document.getElementById('inicioParcial3').value,
        finParcial3: document.getElementById('finParcial3').value,
        cantidadAlumnos: document.getElementById('cantidadAlumnos').value,
        diasInhabiles: document.getElementById('diasInhabiles').value,
        horasLunes: document.getElementById('horasLunes').value,
        horasMartes: document.getElementById('horasMartes').value,
        horasMiercoles: document.getElementById('horasMiercoles').value,
        horasJueves: document.getElementById('horasJueves').value,
        horasViernes: document.getElementById('horasViernes').value,
        horasSabado: document.getElementById('horasSabado').value
    };
    localStorage.setItem('datosAsistencia', JSON.stringify(datosFormulario));
    window.location.href = 'TablaAsistencias.html';
    return false;
}
