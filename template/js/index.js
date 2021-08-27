const APP = {
    botones: document.querySelectorAll(".button"),
    resultado: document.getElementById("resultado"),
    historial: document.getElementById("historial"),
    memoria: document.getElementById("contenedor"),
    operadores: ["+", "-", "/", "x", "=", "%"],
    valores: "",
    arrayNumeros: [],
    estado: false,
    contadorDiv: 0,

    accion: function () {
        this.botones.forEach(boton => {
            boton.addEventListener("click", function () {
                try {
                    if (this.operadores.indexOf(boton.value) !== -1) {
                        if (this.valores.length === 0 && (boton.value === "-" || boton.value === "+")) {
                            this.añadirValor(boton.value);
                        } else {
                            this.añadirOperador(boton.value);
                        }
                    } else {
                            this.añadirValor(boton.value);
                    }
                    if (boton.value === "C") {
                        this.reset();
                    }
                    else if (boton.value === "TR"){
                        this.totalReset();
                    }
                    if (this.arrayNumeros.length === 4) {
                        if (this.comprobarNaN() === true) {
                            this.respuestaOops();
                        } else {
                            if(this.contadorDiv === 10){
                                this.memoria.innerHTML = "";
                            }
                            this.añadirResultado(this.operaciones(this.arrayNumeros));
                            this.contadorDiv++;
                        }
                    }

                } catch (e) {
                    console.log(e);
                }
            }.bind(this));
        })
    },

    añadirOperador: function (operador) {
        this.arrayNumeros.push(this.valores, operador);
        this.valores = "";
        this.renderHTML(operador);
    },
    añadirValor: function (valor) {
        if (valor === "." && this.valores.indexOf(valor) !== -1) {
                this.valores += "";
        } else {
            this.valores += valor;
            this.renderHTML(valor);
        }
    },
    renderHTML: function (valor) {
        this.resultado.innerHTML += valor;
    },
    reset: function () {
        this.arrayNumeros = [];
        this.valores = "";
        this.resultado.innerHTML = "";
        this.historial.innerHTML = "";
    },
    totalReset: function (){
        this.memoria.innerHTML = "";
        this.reset();
    },
    añadirResultado: function (resultado) {
        this.historial.innerHTML = this.resultado.textContent;
        this.memoria.innerHTML += `${this.resultado.textContent}<br>`;
        if (resultado % 1 === 0) {
            this.resultado.innerHTML = resultado;
            this.memoria.innerHTML += `${resultado}<br>`;
            this.valores = resultado;
        } else {
            this.resultado.innerHTML = resultado.toFixed(2);
            this.memoria.innerHTML += `${resultado.toFixed(2)}<br>`;
            this.valores = resultado.toFixed(2);
        }
        this.arrayNumeros = []
    },
    comprobarNaN: function () {
        if (isNaN(parseFloat(this.arrayNumeros[0]))
            || isNaN(parseFloat(this.arrayNumeros[2]))) {
            return true;
        } else {
            return false;
        }
    },
    respuestaOops: function () {
        this.resultado.innerHTML = "Oops!".fontcolor("red");
        setTimeout(function () {
            this.resultado.innerHTML = "Syntax Error!".fontcolor("red");
        }.bind(this), 1000)
        setTimeout(function () {
            this.reset();
        }.bind(this), 3000);
    },
    mostrar: function (){
        if(this.estado === false){
            this.memoria.style.display = "block";
            this.estado = true;
        } else {
            this.memoria.style.display = "none";
            this.estado = false;
        }
    },
    operaciones: function (valores) {
        try {
            switch (valores[1]) {
                case "+":
                    return parseFloat(valores[0]) + parseFloat(valores[2]);
                case "-":
                    return parseFloat(valores[0]) - parseFloat(valores[2]);
                case "/":
                    return parseFloat(valores[0]) / parseFloat(valores[2]);
                case "x":
                    return parseFloat(valores[0]) * parseFloat(valores[2]);
                case "%":
                    return parseFloat(valores[0]) * parseFloat(valores[2]) / 100;
                default:
                    this.respuestaOops();
            }
        } catch (e) {
            console.log(e)
        }
    }
}
APP.accion();




