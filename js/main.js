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
}
//Funcion que sirve como intermediario para ejecutar la funcion decrementar
function ejecutarDecremento(){
    //Extraigo el registro elegido en el menu y lo guardo en una variable cambiante
    let registroElegido = document.getElementById("registro-seleccionado").value;
    //Ejecuto la funcion decrementar y le paso la variable de registroElegido como parametro para poder hacer el decremento
    maquina.decrementar(registroElegido);
    //Actualizar los números en la página
    maquina.ActualizarPantalla();
}
