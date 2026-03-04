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
    //metodo para comparar los valores de Ax y Bx y mostrar un mensaje indicando cuál es mayor o si son iguales
    comparar() {
    if (this.Ax > this.Bx) {
        return "AX es mayor que BX";
    } else if (this.Ax < this.Bx) {
        return "AX es menor que BX";
    } else {
        return "AX es igual a BX";
    }
    }

    loopIncrementar(registro, iteraciones) {
        let vueltas = parseInt(iteraciones) || 0;
        
        if (vueltas <= 0) {
            this.mostrarMensaje("Error LOOP: Las iteraciones deben ser mayores a 0.");
            return;
        }

        // Límite de seguridad para evitar que el navegador se trabe
        if (vueltas > 1000) {
            this.mostrarMensaje("Aviso: Limitando a 1000 iteraciones por seguridad.");
            vueltas = 1000;
        }

        // Ciclo for para repetir la operación
        for (let i = 0; i < vueltas; i++) {
            this.incrementar(registro);
        }

        this.mostrarMensaje(`LOOP: ${registro} incrementado ${vueltas} veces.`);
    }

    ejecutar(instruccion) {
        // 1. Limpiar espacios extra y separar por espacios (ej. "INC Ax" se vuelve ["INC", "Ax"])
        let partes = instruccion.trim().split(" ");
        
        // 2. El comando principal (ADD, SUB, INC...) lo pasamos a mayúsculas para evitar errores
        let comando = partes[0].toUpperCase();
        
        // 3. El registro afectado (si lo hay, como Ax, Bx) respetando mayúsculas/minúsculas
        let registro = partes[1] ? partes[1] : null; 

        // 4. El switch que simula la máquina evaluando el comando
        switch(comando) {
            case 'ADD': 
                this.sumar(); 
                this.mostrarMensaje("Comando: ADD ejecutado."); 
                break;
            case 'SUB': 
                this.restar(); 
                this.mostrarMensaje("Comando: SUB ejecutado."); 
                break;
            case 'MUL': 
                this.multiplicar(); 
                this.mostrarMensaje("Comando: MUL ejecutado."); 
                break;
            case 'DIV': 
                this.dividir(); 
                this.mostrarMensaje("Comando: DIV ejecutado."); 
                break;
            case 'CMP': 
                const res = this.comparar(); 
                this.mostrarMensaje("Comando: CMP → " + res); 
                break;
            case 'INC':
                if (registro) {
                    // Ajuste 3: Normalizar el registro (Ej: "ax" o "AX" -> "Ax")
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    if(regNorm === 'Ax' || regNorm === 'Bx' || regNorm === 'Cx') {
                        this.incrementar(regNorm);
                        this.mostrarMensaje("Comando: INC " + regNorm + " ejecutado.");
                    } else {
                        this.mostrarMensaje("Error: Registro '" + registro + "' no válido.");
                    }
                }
            case 'DEC':
                if (registro) {
                    // Ajuste 3: Normalizar el registro
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    if(regNorm === 'Ax' || regNorm === 'Bx' || regNorm === 'Cx') {
                        this.decrementar(regNorm);
                        this.mostrarMensaje("Comando: DEC " + regNorm + " ejecutado.");
                    } else {
                        this.mostrarMensaje("Error: Registro '" + registro + "' no válido.");
                    }
                }
                break;
            case 'LOOP':
                let vueltasCmd = partes[2] ? partes[2] : 0;
                if (registro && vueltasCmd) {
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    if(regNorm === 'Ax' || regNorm === 'Bx' || regNorm === 'Cx') {
                        this.loopIncrementar(regNorm, vueltasCmd);
                    } else {
                        this.mostrarMensaje("Error: Registro '" + registro + "' no válido.");
                    }
                } else {
                    this.mostrarMensaje("Error: Uso correcto LOOP [registro] [cantidad]");
                }
                break;
            default:
                this.mostrarMensaje("Error de CPU: Comando '" + comando + "' no reconocido.");
                break;
        }
    }
    
    // metodo para mostrar mensajes estructurados en la consola de la página web
    mostrarMensaje(mensaje) {
    const consola = document.getElementById("consola");
    const linea = document.createElement("div");
    linea.textContent = "> " + mensaje;
    consola.appendChild(linea);

    consola.scrollTop = consola.scrollHeight; // auto-scroll
    }
    // --- MÉTODO DE INTERFAZ GRÁFICA ---

     // Método para reflejar los cambios internos de la máquina en la página web (DOM)
    ActualizarPantalla(){
        // Extrae el elemento de la página por su ID y actualiza su texto con el valor del registro
        document.getElementById('val-ax').textContent = this.Ax;
        document.getElementById('val-bx').textContent = this.Bx;
        document.getElementById('val-cx').textContent = this.Cx;
        
        // --- NUEVO: Sincronizar también los inputs de texto ---
        document.getElementById('input-ax').value = this.Ax;
        document.getElementById('input-bx').value = this.Bx;

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