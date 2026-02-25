// Definir clase maquina
class Maquina {
    constructor(){
        this.Ax = 0;
        this.Bx = 0;
        this.Cx = 0;
        this.pila = [];
    }
    // Definir métodos para la máquina
    ActualizarPantalla(){
        document.getElementById('val-ax').textContent = this.Ax;
        document.getElementById('val-bx').textContent = this.Bx;
        document.getElementById('val-cx').textContent = this.Cx;
        
        const pantallaPila = document.getElementById('val-pila');
        if (this.pila.length === 0){
            pantallaPila.textContent = 'Pila vacía';
        }else{
            pantallaPila.textContent = "[ " + this.pila.join(", ") + " ]";
        }
    }
}

// Inicializar la máquina
const maquina = new Maquina();

// Mostrar los valores iniciales al cargar la pagina
window.onload = () => {
    maquina.ActualizarPantalla();
    
}