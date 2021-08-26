const Index = {
    botones: document.querySelectorAll(".button"),
    resultado: document.getElementById("resultado"),
    historial: document.getElementById("historial"),
    operadores: ["+", "-", "/", "x", "=", "%"],
    valores: "",
    arrayNumeros: [],

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
                    if (this.arrayNumeros.length === 4) {
                        if (this.comprobarNaN() === true) {
                            this.respuestaOops();
                        } else {
                            this.añadirResultado(this.operaciones(this.arrayNumeros));
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
        this.valores += valor;
        this.renderHTML(valor);
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
    añadirResultado: function (resultado) {
        this.historial.innerHTML = this.resultado.textContent;
        if (resultado % 1 === 0) {
            this.resultado.innerHTML = resultado;
            this.valores = resultado;
        } else {
            this.resultado.innerHTML = resultado.toFixed(2);
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
        setTimeout(function (){
            this.resultado.innerHTML = "Syntax Error!".fontcolor("red");
        }.bind(this), 1000)
        setTimeout(function () {
            this.reset();
        }.bind(this), 3000);
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
Index.accion();




