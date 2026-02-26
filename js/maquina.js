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
     this.Cx = this.Ax + this.Bx;// Guarda el resultado en Cx

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
    //metodo para incrementar en 1 cualquiera de los 3 registros ya sea Ax, Bx y Cx 
    incrementar(registro){
        this[registro]++
    }
    //metodo para decrementar en 1 cualquiera de los 3 registros ya sea Ax, Bx y Cx 
    decrementar(registro){
        this[registro]--
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