const maquina = new Maquina();

window.onload = () => {
    maquina.ActualizarPantalla();
}

function ejecutarOperacion(operacion) {
    const inputAx = document.getElementById('input-ax').value;
    const inputBx = document.getElementById('input-bx').value;

    maquina.cargarValores(inputAx, inputBx);

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

    const inputAx = document.getElementById('input-ax').value;
    const inputBx = document.getElementById('input-bx').value;
    maquina.cargarValores(inputAx, inputBx);

    maquina.ejecutar(textoComando);

    maquina.ActualizarPantalla();
    inputComando.value = "";
}

document.getElementById('input-comando').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        procesarComando();
    }
});

// --- NUEVA FUNCIÓN DÍA 6 ---
function ejecutarLoop() {
    const vueltas = document.getElementById("input-loop-vueltas").value;
    const registroElegido = document.getElementById("loop-registro").value;

    maquina.loopIncrementar(registroElegido, vueltas);
    maquina.ActualizarPantalla();
}