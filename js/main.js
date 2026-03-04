// Inicializar la máquina (Instanciación del objeto)
const maquina = new Maquina();

// Mostrar los valores iniciales al cargar la página en el navegador
window.onload = () => {
    maquina.ActualizarPantalla();
}

// Función puente: Se activa cuando el usuario hace clic en los botones del HTML
function ejecutarOperacion(operacion) {
    // 1. Extraer los valores escritos en las cajas de texto (inputs) del HTML
    const inputAx = document.getElementById('input-ax').value;
    const inputBx = document.getElementById('input-bx').value;

    // 2. Pasar esos valores a los registros internos de la máquina
    maquina.cargarValores(inputAx, inputBx);

    // 3. Evaluar qué operación se solicitó y ejecutar el método correspondiente de la clase
    switch(operacion) {
        case 'ADD': maquina.sumar(); break;
        case 'SUB': maquina.restar(); break;
        case 'MUL': maquina.multiplicar(); break;
        case 'DIV': maquina.dividir(); break;
        case 'CMP':const resultado = maquina.comparar(); maquina.mostrarMensaje("CMP → " + resultado);
    break;
    }
    // 4. Actualizar la pantalla para que el usuario pueda ver el resultado en Cx
    maquina.ActualizarPantalla();
}
//Funcion que sirve como intermediario para ejecutar la funcion incrementar
function ejecutarIncremento(){
    //Extraigo el registro elegido en el menu y lo guardo en una variable cambiante
    let registroElegido = document.getElementById("registro-seleccionado").value;
    //Ejecuto la funcion incrementar y le paso la variable de registroElegido como parametro para poder hacer el incremento
    maquina.incrementar(registroElegido);
    //Actualizar los números en la página
    maquina.ActualizarPantalla();
    //Mostrar el mensaje del incremento en la consola de la página web
    maquina.mostrarMensaje("INC " + registroElegido + " → " + maquina[registroElegido]);
}
//Funcion que sirve como intermediario para ejecutar la funcion decrementar
function ejecutarDecremento(){
    //Extraigo el registro elegido en el menu y lo guardo en una variable cambiante
    let registroElegido = document.getElementById("registro-seleccionado").value;
    //Ejecuto la funcion decrementar y le paso la variable de registroElegido como parametro para poder hacer el decremento
    maquina.decrementar(registroElegido);
    //Actualizar los números en la página
    maquina.ActualizarPantalla();
    //Mostrar el mensaje del decremento en la consola de la página web
    maquina.mostrarMensaje("DEC " + registroElegido + " → " + maquina[registroElegido]);
}

// Función del DÍA 5: Captura lo escrito en la consola y se lo manda a la máquina
function procesarComando() {
    // Extraer el texto del nuevo input
    const inputComando = document.getElementById('input-comando');
    const textoComando = inputComando.value;

    // Si el usuario no escribió nada, no hacemos nada
    if (textoComando === "") return;

    // Actualizamos los registros base con lo que esté en los inputs numéricos por si acaso
    const inputAx = document.getElementById('input-ax').value;
    const inputBx = document.getElementById('input-bx').value;
    maquina.cargarValores(inputAx, inputBx);

    // Mandamos ejecutar el comando usando el método nuevo
    maquina.ejecutar(textoComando);

    // Actualizamos la pantalla y limpiamos el input de la consola
    maquina.ActualizarPantalla();
    inputComando.value = "";
}
// Funcion para el Dia 6: Intermediario para el ciclo for 
function ejecutarLoop() {
    // Obtener valores de la interfaz
    const vueltas = document.getElementById("input-loop-vueltas").value;
    const registroElegido = document.getElementById("loop-registro").value;

    // Ejecutar lógica
    maquina.loopIncrementar(registroElegido, vueltas);

    // Reflejar cambios
    maquina.ActualizarPantalla();
}

// Escuchar cuando el usuario presiona una tecla en el input de comandos
document.getElementById('input-comando').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        procesarComando();
    }
});