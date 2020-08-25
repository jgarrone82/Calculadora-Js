var calculadora = {
  pantalla: document.getElementById('display'),
  valorPantalla: "0",
  operacion: "",
  primerValor: 0,
  segundoValor: 0,
  ultimoValor: 0,
  resultado: 0,
  teclaIgual: false,

  init: (function(){
    this.asignarEfectoBotones(".tecla");
    this.asignarEventosBotones();
  }),

  //Efectos de los botones
  asignarEfectoBotones: function(selector){
    var x = document.querySelectorAll(selector);
    for (var i = 0; i < x.length; i++) {
      x[i].onmousedown = this.eventoMinimizaBoton;
      x[i].onmouseup = this.eventoAumentaBoton;
    };
  },

  eventoAumentaBoton: function(event){
    calculadora.AumentaBoton(event.target);
  },

  eventoMinimizaBoton: function(event){
    calculadora.MinimizaBoton(event.target);
  },

  //Acciones de los botones
  AumentaBoton: function(elemento){
    var x = elemento.id;
    if(x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto"){
      elemento.style.width = "29%";
      elemento.style.height = "62.91px";
    } else if( x == "mas") {
      elemento.style.width = "90%";
      elemento.style.height = "100%";
    } else {
      elemento.style.width = "22%";
      elemento.style.height = "62.91px";
    }
  },

  MinimizaBoton: function(elemento){
    var x = elemento.id ;
    if(x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto"){
      elemento.style.width = "28%";
      elemento.style.height = "62px";
    } else if (x == "mas") {
      elemento.style.width = "88%";
      elemento.style.height = "98%";
    }else{
      elemento.style.width = "21%";
      elemento.style.height = "62px";
    }
  },

  asignarEventosBotones: function(){
    document.getElementById("0").addEventListener("click", function(){
      calculadora.ingresarNumero("0");
    });
    document.getElementById("1").addEventListener("click", function(){
      calculadora.ingresarNumero("1");
    });
    document.getElementById("2").addEventListener("click", function(){
      calculadora.ingresarNumero("2");
    });
    document.getElementById("3").addEventListener("click", function(){
      calculadora.ingresarNumero("3");
    });
    document.getElementById("4").addEventListener("click", function(){
      calculadora.ingresarNumero("4");
    });
    document.getElementById("5").addEventListener("click", function(){
      calculadora.ingresarNumero("5");
    });
    document.getElementById("6").addEventListener("click", function(){
      calculadora.ingresarNumero("6");
    });
    document.getElementById("7").addEventListener("click", function(){
      calculadora.ingresarNumero("7");
    });
    document.getElementById("8").addEventListener("click", function(){
      calculadora.ingresarNumero("8");
    });
    document.getElementById("9").addEventListener("click", function(){
      calculadora.ingresarNumero("9");
    });
    document.getElementById('on').addEventListener("click", function(){
      calculadora.limpiarPantalla();
    });
    document.getElementById('sign').addEventListener("click", function(){
      calculadora.cambiarSigno();
    });
    document.getElementById('punto').addEventListener("click", function(){
      calculadora.puntoDecimal();
    });
    document.getElementById('raiz').addEventListener("click", function(){
      calculadora.operaciones("raiz");
    });
    document.getElementById('dividido').addEventListener("click", function(){
      calculadora.operaciones("/");
    });
    document.getElementById('por').addEventListener("click", function(){
      calculadora.operaciones("*");
    });
    document.getElementById('menos').addEventListener("click", function(){
      calculadora.operaciones("-");
    });
    document.getElementById('mas').addEventListener("click", function(){
      calculadora.operaciones("+");
    });
    document.getElementById('igual').addEventListener("click", function(){
      calculadora.resultadoPantalla();
    });

  },

  ingresarNumero: function(numero){
    if (this.valorPantalla.length < 9) {
      if(this.valorPantalla == "0"){
        this.valorPantalla = "";
        this.valorPantalla = this.valorPantalla + numero;
      }else{
        this.valorPantalla = this.valorPantalla + numero;
      }
      this.actualizarPantalla();
    }
  },

  limpiarPantalla: function(){
    this.valorPantalla = "0";
    this.operacion = "0";
    this.primerValor = 0;
    this.segundoValor = 0;
    this.resultado = 0;
    this.teclaIgual = false;
    this.ultimoValor = 0;
    this.actualizarPantalla();
  },

  cambiarSigno: function(){
    if (this.valorPantalla != "0") {
      var aux;
      if (this.valorPantalla.charAt(0) == "-") {
        aux = this.valorPantalla.slice(1);
      } else {
        aux = "-" + this.valorPantalla;
      }
      this.valorPantalla = "";
      this.valorPantalla = aux;
      this.actualizarPantalla();
    }
  },

  actualizarPantalla: function(){
    this.pantalla.innerHTML = this.valorPantalla;
  },

  puntoDecimal: function(){
    if (this.valorPantalla.indexOf(".") == -1) {
      if (this.valorPantalla == "") {
        this.valorPantalla = this.valorPantalla + "0.";
      }else {
        this.valorPantalla = this.valorPantalla + ".";
      }
      this.actualizarPantalla();
    }
  },

  operaciones: function(oper){
    this.primerValor = parseFloat(this.valorPantalla);
    this.valorPantalla = "";
    this.operacion = oper;
    this.teclaIgual = false;
    this.actualizarPantalla();
  },

  resultadoPantalla: function(){
    if(!this.teclaIgual){
      this.segundoValor = parseFloat(this.valorPantalla);
      this.ultimoValor = this.segundoValor;

      this.ejecutarOperacion(this.primerValor, this.segundoValor, this.operacion);
    } else {
      this.ejecutarOperacion(this.primerValor, this.ultimoValor, this.operacion);
    }

    this.primerValor = this.resultado;

    this.valorPantalla = "";

    if(this.resultado.toString().length < 9){
      this.valorPantalla = this.resultado.toString();
    }else{
      this.valorPantalla = this.resultado.toString().slice(0, 9) + "...";
    }

    this.teclaIgual = true;
    this.actualizarPantalla();
  },

  ejecutarOperacion: function(primerValor, segundoValor, operacion){
    switch (operacion) {
      case "+":
        this.resultado = eval(primerValor + segundoValor);
        break;
      case "-":
        this.resultado = eval(primerValor - segundoValor);
        break;
      case "*":
        this.resultado = eval(primerValor * segundoValor);
        break;
      case "/":
        this.resultado = eval(primerValor / segundoValor);
        break;
      case "raiz":
        this.resultado = eval(Math.sqrt(primerValor));
        break;
      default:
        this.resultado = "Error";
    }
  }
}

calculadora.init();