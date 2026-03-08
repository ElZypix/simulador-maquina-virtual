class Maquina {
    constructor(){
        this.Ax = 0; 
        this.Bx = 0; 
        this.Cx = 0; 
        this.pila = []; 
    }
estadoActual(){
    return ` 
   ESTADO ACTUAL DE LA VM 
AX : ${this.Ax}
BX : ${this.Bx}
CX : ${this.Cx}

PILA : ${this.pila.length === 0 ? "Vacía" : this.pila.join(", ")}
 
`;
}
    //DÍA 14
    guardarEstado() {
        const estado = {
            Ax: this.Ax,
            Bx: this.Bx,
            Cx: this.Cx,
            pila: this.pila
        };
        localStorage.setItem('mv_estado', JSON.stringify(estado));
    }

    cargarEstado() {
        const datosGuardados = localStorage.getItem('mv_estado');
        if (datosGuardados) {
            const estado = JSON.parse(datosGuardados);
            this.Ax = estado.Ax;
            this.Bx = estado.Bx;
            this.Cx = estado.Cx;
            this.pila = estado.pila || [];
            this.mostrarMensaje("Sistema: Estado restaurado desde la memoria local.");
            this.ActualizarPantalla();
        }
    }
    
    cargarValores(ax, bx) {
        let valorAx = parseFloat(ax);
        let valorBx = parseFloat(bx);
        let datosValidos = true;

        const inputAxHtml = document.getElementById('input-ax');
        const inputBxHtml = document.getElementById('input-bx');

        if (isNaN(valorAx)) {
            inputAxHtml.classList.add('input-error'); // Pinta de rojo
            datosValidos = false;
        } else {
            inputAxHtml.classList.remove('input-error'); // Quita el rojo
            this.Ax = valorAx; // Guarda el valor real
        }

        if (isNaN(valorBx)) {
            inputBxHtml.classList.add('input-error'); // Pinta de rojo
            datosValidos = false;
        } else {
            inputBxHtml.classList.remove('input-error'); // Quita el rojo
            this.Bx = valorBx; // Guarda el valor real
        }

        if (!datosValidos) {
            this.mostrarMensaje("Error de Captura: Se requieren números válidos.");
        }

        return datosValidos; // Devolvemos 'true' si todo está bien, o 'false' si hubo error
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

    pushValor(valor) {
        this.pila.push(valor);
        this.mostrarMensaje(`PUSH: Se insertó el valor ${valor} en la pila.`);
    }

    popValor(registroDestino) {
        // Control de pila vacía
        if (this.pila.length === 0) {
            this.mostrarMensaje("Error de Pila: Intentaste hacer POP pero la pila está vacía.");
            return;
        }
        
        let valorSacado = this.pila.pop();
        
        // Si mandamos un registro (ej. Ax), guardamos el valor ahí
        if (registroDestino && this.hasOwnProperty(registroDestino)) {
            this[registroDestino] = valorSacado;
            this.mostrarMensaje(`POP: Se sacó ${valorSacado} de la pila y se guardó en ${registroDestino}.`);
        } else {
            this.mostrarMensaje(`POP: Se sacó ${valorSacado} de la pila.`);
        }
    }

    loopIncrementar(registro, iteraciones) {
        let vueltas = parseInt(iteraciones) || 0;
        if (vueltas <= 0) {
            this.mostrarMensaje("Error LOOP: Las iteraciones deben ser mayores a 0.");
            return;
        }
        if (vueltas > 1000) {
            this.mostrarMensaje("Aviso: Limitando a 1000 iteraciones por seguridad.");
            vueltas = 1000;
        }
        for (let i = 0; i < vueltas; i++) {
            this.incrementar(registro);
        }
        this.mostrarMensaje(`LOOP: ${registro} incrementado ${vueltas} veces.`);
    }

    // ---DÍA 7 (Ciclo While) ---
    incrementarHasta(registro, valorObjetivo) {
        let contador = 0;
        const maxSeguridad = 1000;
        const objetivo = parseFloat(valorObjetivo);

        if (isNaN(objetivo)) {
            this.mostrarMensaje("Error: El valor objetivo debe ser un número.");
            return;
        }

      
        while (this[registro] < objetivo && contador < maxSeguridad) {
            this.incrementar(registro);
            contador++;
        }

        if (contador >= maxSeguridad) {
            this.mostrarMensaje(`Seguridad: Ciclo detenido en ${maxSeguridad} iteraciones.`);
        }

        this.mostrarMensaje(`WHILE: ${registro} alcanzó ${this[registro]}. Ciclos realizados: ${contador}`);
    }

    ejecutar(instruccion) {
        let partes = instruccion.trim().split(" ");
        let comando = partes[0].toUpperCase();
        let registro = partes[1] ? partes[1] : null; 

        switch(comando) {
            case 'ADD': this.sumar(); this.mostrarMensaje("Comando: ADD ejecutado."); break;
            case 'SUB': this.restar(); this.mostrarMensaje("Comando: SUB ejecutado."); break;
            case 'MUL': this.multiplicar(); this.mostrarMensaje("Comando: MUL ejecutado."); break;
            case 'DIV': this.dividir(); this.mostrarMensaje("Comando: DIV ejecutado."); break;
            case 'CMP': 
                const res = this.comparar(); 
                this.mostrarMensaje("Comando: CMP → " + res); 
                break;
            case 'INC': {
                if (registro) {
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    if(this.hasOwnProperty(regNorm)) {
                        this.incrementar(regNorm);
                        this.mostrarMensaje("Comando: INC " + regNorm + " ejecutado.");
                    }
                }
                break;
            }
            case 'DEC': {
                if (registro) {
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    if(this.hasOwnProperty(regNorm)) {
                        this.decrementar(regNorm);
                        this.mostrarMensaje("Comando: DEC " + regNorm + " ejecutado.");
                    }
                }
                break;
            }
            case 'PUSH':
                if (registro && this.hasOwnProperty(registro)) {
                    this.pushValor(this[registro]);
                } else if (!isNaN(parseFloat(partes[1]))) {
                    this.pushValor(parseFloat(partes[1])); 
                } else {
                    this.mostrarMensaje("Error: Uso PUSH [registro] o PUSH [número]");
                }
                break;
            case 'POP': {
                if (registro) {
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    this.popValor(regNorm); 
                } else {
                    this.popValor(); 
                }
                break;
            }
            case 'LOOP': {
                let vueltasCmd = partes[2] ? partes[2] : 0;
                if (registro && vueltasCmd) {
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    this.loopIncrementar(regNorm, vueltasCmd);
                }
                break;
            }
            case 'WHILE': {
                let objetivoCmd = partes[2] ? partes[2] : null;
                if (registro && objetivoCmd) {
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    this.incrementarHasta(regNorm, objetivoCmd);
                } else {
                    this.mostrarMensaje("Error: Uso WHILE [registro] [objetivo]");
                }
                break;
            }
            case 'HEX': {
                if(registro && this.hasOwnProperty(registro)){
                    this.mostrarMensaje(`HEX: ${registro} es ${this.formatearHex(this[registro])}`);
                }else{
                    this.mostrarMensaje("Uso: HEX [registro]");
                }
                break;
            }
            case 'DEC': {
                if (registro && this.hasOwnProperty(registro)) {
                    this.mostrarMensaje(`DEC: ${registro} es ${Math.floor(this[registro])}`);
                } else {
                    this.mostrarMensaje("Uso: DEC [registro]");
                }
                break;
            }
            case 'SHL': {
                if (registro) {
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    if (this.hasOwnProperty(regNorm)) {
                        this.desplazarIzq(regNorm);
                    } else {
                        this.mostrarMensaje(`Error: Registro ${registro} no existe.`);
                    }
                } else {
                    this.mostrarMensaje("Uso: SHL [registro]");
                }
                break;
            }
            case 'SHR': {
                if (registro) {
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    if (this.hasOwnProperty(regNorm)) {
                        this.desplazarDer(regNorm);
                    } else {
                        this.mostrarMensaje(`Error: Registro ${registro} no existe.`);
                    }
                } else {
                    this.mostrarMensaje("Uso: SHR [registro]");
                }
                break;
            }
            case 'TEST': {
                let min = partes[2] ? partes[2] : 0;
                let max = partes[3] ? partes[3] : 0;

                if (registro) {
                    let regNorm = registro.charAt(0).toUpperCase() + registro.slice(1).toLowerCase();
                    if (this.hasOwnProperty(regNorm)) {
                        this.evaluarCondicionCompleja(regNorm, min, max);
                    } else {
                        this.mostrarMensaje(`Error: Registro ${registro} no existe.`);
                    }
                } else {
                    this.mostrarMensaje("Uso: TEST [registro] [min] [max]");
                }
                break;
            }
            default:
                this.mostrarMensaje("Error de CPU: Comando '" + comando + "' no reconocido.");
                break;
        }
        this.mostrarMensaje(this.estadoActual());
    }
    
    //DÍA 12
    desplazarIzq(registro) {
        this[registro] = this[registro] << 1;
        this.mostrarMensaje(`SHL: bits de ${registro} movidos a la izquierda.`);
    }

    desplazarDer(registro) {
        this[registro] = this[registro] >> 1;
        this.mostrarMensaje(`SHR: bits de ${registro} movidos a la derecha.`);
    }

    mostrarMensaje(mensaje) {
        const consola = document.getElementById("consola");
        const linea = document.createElement("div");
        linea.classList.add("linea-consola");

        linea.innerHTML = `
            <span class="prompt">VM></span>
            <span class="texto">${mensaje}</span>
        `;
        consola.appendChild(linea);
        consola.scrollTop = consola.scrollHeight;
    }

    ActualizarPantalla(){
        document.getElementById('val-ax').textContent = 
        `${this.Ax} (${this.formatearHex(this.Ax)}) [${this.formatearBin(this.Ax)}]`;
        document.getElementById('val-bx').textContent = 
        `${this.Bx} (${this.formatearHex(this.Bx)}) [${this.formatearBin(this.Bx)}]`;
        document.getElementById('val-cx').textContent = 
        `${this.Cx} (${this.formatearHex(this.Cx)}) [${this.formatearBin(this.Cx)}]`;
    
        document.getElementById('input-ax').value = this.Ax;
        document.getElementById('input-bx').value = this.Bx;

        const pantallaPila = document.getElementById('val-pila');
        if (this.pila.length === 0) {
            pantallaPila.innerHTML = '<div style="padding: 10px; color: #7f8c8d;">Pila vacía</div>';
        } else {
            let tablaHTML = '<table class="tabla-pila"><tr><th>Tope</th><th>Valor</th></tr>';
            for (let i = this.pila.length - 1; i >= 0; i--) {
                tablaHTML += `<tr><td>Pos ${i}</td><td>${this.pila[i]}</td></tr>`;
            }
            tablaHTML += '</table>';
            pantallaPila.innerHTML = tablaHTML;
        }
        this.guardarEstado();
    }
    //DÍA 11
    formatearHex(valor) {
        if (isNaN(valor) || valor === "ERR") return "0x0";
        // Convertimos a entero, luego a base 16 y a mayúsculas
        let hex = Math.floor(valor).toString(16).toUpperCase();
        return `0x${hex}`;
    }
    //DÍA 12
    formatearBin(valor) {
        if (isNaN(valor) || valor === "ERR") return "00000000";
        return (valor >>> 0).toString(2).slice(-8).padStart(8, '0');
    }
    //DÍA 13
    evaluarCondicionCompleja(registro, min, max) {
        const valor = this[registro];
        const limiteMin = parseFloat(min);
        const limiteMax = parseFloat(max);

        const cumpleMin = valor >= limiteMin;
        const cumpleMax = valor <= limiteMax;

        const resultadoFinal = cumpleMin && cumpleMax;

        this.mostrarMensaje(`--- EVALUACIÓN LÓGICA (Rango) ---`);
        this.mostrarMensaje(`Registro ${registro} = ${valor}`);
        this.mostrarMensaje(`Condición A (${valor} >= ${limiteMin}): ${cumpleMin}`);
        this.mostrarMensaje(`Condición B (${valor} <= ${limiteMax}): ${cumpleMax}`);
        this.mostrarMensaje(`Operación: Condición A AND Condición B`);
        this.mostrarMensaje(`RESULTADO: ${resultadoFinal ? "VERDADERO (TRUE)" : "FALSO (FALSE)"}`);
        
        if (resultadoFinal) {
            this.mostrarMensaje("Explicación: Ambas condiciones son TRUE, por lo tanto el resultado es TRUE.");
        } else {
            this.mostrarMensaje("Explicación: Una o ambas condiciones son FALSE, por lo tanto el resultado es FALSE.");
        }
    }
}