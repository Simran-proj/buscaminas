var Casella = /** @class */ (function () {
    function Casella(esMina, fila, columna) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
        this.fila = fila;
        this.columna = columna;
    }
    return Casella;
}());
var Tauler = /** @class */ (function () {
    function Tauler(filas, columnas, nombreMaxMinas) {
        this.filas = filas;
        this.columnas = columnas;
        this.nombreMaxMinas = nombreMaxMinas;
        this.casellas = [];
    }
    Tauler.prototype.inicializarCaselles = function () {
        var _this = this;
        var numeroMinasColocadas = 0;
        var tablero = document.getElementById("tablero");
        tablero.innerHTML = "";
        var _loop_1 = function (fila) {
            var filaTablero = tablero.insertRow();
            this_1.casellas[fila] = [];
            var _loop_2 = function (columna) {
                var celda = filaTablero.insertCell();
                celda.classList.add("cuadro");
                celda.style.background = "gray";
                var esMina = false;
                if (numeroMinasColocadas < this_1.nombreMaxMinas && Math.random() < 0.2) {
                    esMina = true;
                    numeroMinasColocadas++;
                }
                var casella = new Casella(esMina, fila, columna);
                this_1.casellas[fila][columna] = casella;
                celda.addEventListener('click', function () {
                    _this.revelarCasella(fila, columna, celda);
                });
                celda.addEventListener('contextmenu', function (e) {
                    e.preventDefault();
                    _this.marcarCasella(fila, columna, celda);
                });
            };
            for (var columna = 0; columna < this_1.columnas; columna++) {
                _loop_2(columna);
            }
        };
        var this_1 = this;
        for (var fila = 0; fila < this.filas; fila++) {
            _loop_1(fila);
        }
    };
    Tauler.prototype.contarMinasAlrededor = function (fila, columna) {
        var minas = 0;
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                var nuevaFila = fila + i;
                var nuevaColumna = columna + j;
                if (nuevaFila >= 0 && nuevaFila < this.filas && nuevaColumna >= 0 && nuevaColumna < this.columnas) {
                    if (this.casellas[nuevaFila][nuevaColumna].esMina) {
                        minas++;
                    }
                }
            }
        }
        return minas;
    };
    Tauler.prototype.revelarCasella = function (fila, columna, celda) {
        var _this = this;
        var casella = this.casellas[fila][columna];
        if (casella.revelada || casella.marcada)
            return;
        casella.revelada = true;
        if (casella.esMina) {
            celda.style.background = "red";
            setTimeout(function () {
                alert("Has perdut");
                _this.inicializarCaselles();
            }, 100);
        }
        else {
            celda.style.background = "white";
            var minasAlrededor = this.contarMinasAlrededor(fila, columna);
            if (minasAlrededor > 0) {
                celda.innerText = minasAlrededor.toString();
            }
        }
    };
    Tauler.prototype.marcarCasella = function (fila, columna, celda) {
        var casella = this.casellas[fila][columna];
        if (casella.revelada)
            return;
        casella.marcada = !casella.marcada;
        celda.style.background = casella.marcada ? "green" : "gray";
    };
    return Tauler;
}());
var Joc = /** @class */ (function () {
    function Joc(filas, columnas) {
        this.tauler = new Tauler(filas, columnas, 30);
        this.enCurso = true;
    }
    Joc.prototype.inicioFinPartida = function () {
        this.enCurso = !this.enCurso;
        this.tauler.inicializarCaselles();
        return this.enCurso ? "Partida iniciada" : "Partida finalizada";
    };
    return Joc;
}());
var joc = new Joc(10, 10);
var alerta = joc.inicioFinPartida();
// alert(alerta);
