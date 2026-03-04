// Definir clase Maquina que simula el comportamiento de una CPU básica
class Maquina {
    constructor(){
        this.Ax = 0; 
        this.Bx = 0; 
        this.Cx = 0; 
        this.pila = []; 
    }

    cargarValores(ax, bx) {
        this.Ax = parseFloat(ax) || 0;
        this.Bx = parseFloat(bx) || 0;
    }

    sumar() { this.Cx = this.Ax + this.Bx; }
    restar() { this.Cx = this.Ax - this.Bx; }
    multiplicar() { this.Cx = this.Ax * this.Bx; }
    
    dividir() {
        if (this.Bx === 0) {
            alert("Error de CPU: División por cero no permitida.");
            this.Cx = "ERR"; 
        } else {
            this.Cx = this.Ax / this.Bx;
        }
    }

    incrementar(registro){ this[registro]++; }
    decrementar(registro){ this[registro]--; }

    comparar() {
        if (this.Ax > this.Bx) {
            return "AX es mayor que BX";
        } else if (this.Ax < this.Bx) {
            return "AX es menor que BX";
        } else {
            return "AX es igual a BX";
        }
    }

    // --- NUEVO MÉTODO DÍA 6 ---
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
        let partes = instruccion.trim().split(" ");
        let comando = partes[0].toUpperCase();
        let registro = partes[1] ? partes[1] : null; 

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
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    if(regNorm === 'Ax' || regNorm === 'Bx' || regNorm === 'Cx') {
                        this.incrementar(regNorm);
                        this.mostrarMensaje("Comando: INC " + regNorm + " ejecutado.");
                    } else {
                        this.mostrarMensaje("Error: Registro '" + registro + "' no válido.");
                    }
                }
                break; // <-- ¡Faltaba este break en tu código original!
            case 'DEC':
                if (registro) {
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    if(regNorm === 'Ax' || regNorm === 'Bx' || regNorm === 'Cx') {
                        this.decrementar(regNorm);
                        this.mostrarMensaje("Comando: DEC " + regNorm + " ejecutado.");
                    } else {
                        this.mostrarMensaje("Error: Registro '" + registro + "' no válido.");
                    }
                }
                break;
            // --- NUEVO CASO DÍA 6 ---
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
    
    mostrarMensaje(mensaje) {
        const consola = document.getElementById("consola");
        const linea = document.createElement("div");
        linea.textContent = "> " + mensaje;
        consola.appendChild(linea);
        consola.scrollTop = consola.scrollHeight; 
    }

    ActualizarPantalla(){
        document.getElementById('val-ax').textContent = this.Ax;
        document.getElementById('val-bx').textContent = this.Bx;
        document.getElementById('val-cx').textContent = this.Cx;
        
        document.getElementById('input-ax').value = this.Ax;
        document.getElementById('input-bx').value = this.Bx;

        const pantallaPila = document.getElementById('val-pila');
        if (this.pila.length === 0){
            pantallaPila.textContent = 'Pila vacía';
        } else {
            pantallaPila.textContent = "[ " + this.pila.join(", ") + " ]";
        }
    }
}