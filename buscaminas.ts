class Casella {
    esMina: boolean;
    marcada: boolean;
    revelada: boolean;
    fila: number;
    columna: number;

    constructor(esMina: boolean, fila: number, columna: number) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
        this.fila = fila;
        this.columna = columna;
    }
}

class Tauler {
    filas: number;
    columnas: number;
    nombreMaxMinas: number;
    casellas: Casella[][];

    constructor(filas: number, columnas: number, nombreMaxMinas: number) {
        this.filas = filas;
        this.columnas = columnas;
        this.nombreMaxMinas = nombreMaxMinas;
        this.casellas = [];
    }

    inicializarCaselles(): void {
        let numeroMinasColocadas = 0;
        const tablero = document.getElementById("tablero") as any;
        tablero.innerHTML = "";
        
        for (let fila = 0; fila < this.filas; fila++) {
            let filaTablero = tablero.insertRow();
            this.casellas[fila] = [];
            for (let columna = 0; columna < this.columnas; columna++) {
                let celda = filaTablero.insertCell();
                celda.classList.add("cuadro");
                celda.style.background = "gray";
                let esMina: boolean = false;
                if (numeroMinasColocadas < this.nombreMaxMinas && Math.random() < 0.2) {
                    esMina = true;
                    numeroMinasColocadas++;
                }

                let casella = new Casella(esMina, fila, columna);
                this.casellas[fila][columna] = casella;
                
                celda.addEventListener('click', () => {
                    this.revelarCasella(fila, columna, celda);
                });
                celda.addEventListener('contextmenu', (e:any) => {
                    e.preventDefault();
                    this.marcarCasella(fila, columna, celda);
                });
            }
        }
    }

    contarMinasAlrededor(fila: number, columna: number): number {
        let minas = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let nuevaFila = fila + i;
                let nuevaColumna = columna + j;
                if (nuevaFila >= 0 && nuevaFila < this.filas && nuevaColumna >= 0 && nuevaColumna < this.columnas) {
                    if (this.casellas[nuevaFila][nuevaColumna].esMina) {
                        minas++;
                    }
                }
            }
        }
        return minas;
    }

    revelarCasella(fila: number, columna: number, celda: any): void {
        let casella = this.casellas[fila][columna];
        if (casella.revelada || casella.marcada) return;
        
        casella.revelada = true;
        if (casella.esMina) {
            celda.style.background = "red";
            setTimeout(() => {
                alert("Has perdut");
                this.inicializarCaselles(); 
            }, 100); 
        } else {
            celda.style.background = "white";
            let minasAlrededor = this.contarMinasAlrededor(fila, columna);
            if (minasAlrededor > 0) {
                celda.innerText = minasAlrededor.toString();
            }
        }
    }
    

    marcarCasella(fila: number, columna: number, celda: any): void {
        let casella = this.casellas[fila][columna];
        if (casella.revelada) return;

        casella.marcada = !casella.marcada;
        celda.style.background = casella.marcada ? "green" : "gray";
    }
}

class Joc {
    tauler: Tauler;
    enCurso: boolean;

    constructor(filas: number, columnas: number) {
        this.tauler = new Tauler(filas, columnas, 30);
        this.enCurso = true;
    }

    inicioFinPartida(): string {
        this.enCurso = !this.enCurso;
        this.tauler.inicializarCaselles();
        return this.enCurso ? "Partida iniciada" : "Partida finalizada";
    }
}

let joc = new Joc(10, 10);
let alerta = joc.inicioFinPartida();
// alert(alerta);
