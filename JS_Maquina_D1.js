// Definir clase Maquina que simula el comportamiento de una CPU básica
class Maquina {
    constructor(){
        // Inicialización de los registros principales
        this.Ax = 0; // Registro acumulador principal
        this.Bx = 0; // Registro base (usado aquí como segundo operando)
        this.Cx = 0; // Registro contador / destino para los resultados
        this.pila = []; // Estructura de datos (arreglo) para simular la memoria Pila (Stack)
    }

    // --- MÉTODOS DE PREPARACIÓN ---

    // Método para cargar en los registros los valores que el usuario escribe en la interfaz
    cargarValores(ax, bx) {
        // parseFloat convierte el texto a número. El '|| 0' evita que sea NaN si el usuario lo deja vacío
        this.Ax = parseFloat(ax) || 0;
        this.Bx = parseFloat(bx) || 0;
    }

    // --- MÉTODOS DE OPERACIONES ARITMÉTICAS (ALU) ---

    sumar() {
        this.Cx = this.Ax + this.Bx; // Guarda el resultado en Cx
    }

    restar() {
        this.Cx = this.Ax - this.Bx;
    }

    multiplicar() {
        this.Cx = this.Ax * this.Bx;
    }

    dividir() {
        // Validación de seguridad para evitar que el sistema falle al dividir por cero
        if (this.Bx === 0) {
            alert("Error de CPU: División por cero no permitida.");
            this.Cx = "ERR"; // Muestra un mensaje de error en el registro
        } else {
            this.Cx = this.Ax / this.Bx;
        }
    }

    // --- MÉTODO DE INTERFAZ GRÁFICA ---

    // Método para reflejar los cambios internos de la máquina en la página web (DOM)
    ActualizarPantalla(){
        // Extrae el elemento de la página por su ID y actualiza su texto con el valor del registro
        document.getElementById('val-ax').textContent = this.Ax;
        document.getElementById('val-bx').textContent = this.Bx;
        document.getElementById('val-cx').textContent = this.Cx;
        
        // Actualización visual de la memoria Pila
        const pantallaPila = document.getElementById('val-pila');
        if (this.pila.length === 0){
            pantallaPila.textContent = 'Pila vacía';
        } else {
            // El método .join(", ") separa los elementos del arreglo con una coma para que se vea ordenado
            pantallaPila.textContent = "[ " + this.pila.join(", ") + " ]";
        }
    }
}


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