const maquina = new Maquina();

window.onload = () => {
    maquina.cargarEstado();
    maquina.ActualizarPantalla();
}

function ejecutarOperacion(operacion) {
    const inputAx = document.getElementById('input-ax').value;
    const inputBx = document.getElementById('input-bx').value;
    
    let datosValidos = maquina.cargarValores(inputAx, inputBx);
    if (!datosValidos) {
        return;
    }

    switch(operacion) {
        case 'ADD': maquina.sumar(); break;
        case 'SUB': maquina.restar(); break;
        case 'MUL': maquina.multiplicar(); break;
        case 'DIV': maquina.dividir(); break;
        case 'CMP':
            const resultado = maquina.comparar(); 
            maquina.mostrarMensaje("CMP → " + resultado);
            break;
    }
    maquina.ActualizarPantalla();
}

function ejecutarIncremento(){
    let registroElegido = document.getElementById("registro-seleccionado").value;
    maquina.incrementar(registroElegido);
    maquina.ActualizarPantalla();
    maquina.mostrarMensaje("INC " + registroElegido + " → " + maquina[registroElegido]);
}

function ejecutarDecremento(){
    let registroElegido = document.getElementById("registro-seleccionado").value;
    maquina.decrementar(registroElegido);
    maquina.ActualizarPantalla();
    maquina.mostrarMensaje("DEC " + registroElegido + " → " + maquina[registroElegido]);
}

function procesarComando() {
    const inputComando = document.getElementById('input-comando');
    const textoComando = inputComando.value;
    if (textoComando === "") return;

    let datosValidos = maquina.cargarValores(
        document.getElementById('input-ax').value, 
        document.getElementById('input-bx').value
    );
    
    if (!datosValidos) return;

    maquina.ejecutar(textoComando);
    maquina.ActualizarPantalla();
    inputComando.value = "";
}

document.getElementById('input-comando').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') procesarComando();
});

function ejecutarLoop() {
    const vueltas = document.getElementById("input-loop-vueltas").value;
    const registroElegido = document.getElementById("loop-registro").value;
    maquina.loopIncrementar(registroElegido, vueltas);
    maquina.ActualizarPantalla();
}

// --- DÍA 7 ---
function ejecutarWhile() {
    const objetivo = document.getElementById("input-while-objetivo").value;
    const registroElegido = document.getElementById("while-registro").value;
    maquina.incrementarHasta(registroElegido, objetivo);
    maquina.ActualizarPantalla();
}

function ejecutarExportacion() {
    maquina.exportarEstado();
}

function ejecutarReinicio() {
    maquina.reiniciarMaquina();
}