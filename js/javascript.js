var cod = document.getElementById('codigo');
var nom = document.getElementById('nombre');
var nota = document.getElementById('nota');
var indice = null;
var estudiantes = [
  {
    "codigo": "001",
    "nombre": "Juan",
    "nota": 4.6
  }, {
    "codigo": "002",
    "nombre": "David",
    "nota": 3.5
  }, {
    "codigo": "003",
    "nombre": "Natalia",
    "nota": 4.8
  },
];

estudiantes.push({ "codigo": "004", "nombre": "Carlos", "nota": 3.5 });

// Llenando la tabla con el objeto estudiantes
llenartbl(estudiantes);
function llenartbl(json) {
  var fila = "";
  document.getElementById("tbl_cuerpo").innerHTML = ""; //Vaciar la tabla para que al no encontrar valores en el json, quede limpia.
  for (var i = 0; i < json.length; i++) {
    fila += "<tr>" +
      "<td>" + json[i].codigo + "</td>" +
      "<td>" + json[i].nombre + "</td>" +
      "<td>" + json[i].nota + "</td>" +
      "</tr>";
    document.getElementById("tbl_cuerpo").innerHTML = fila;
    SeleccionarFila(estudiantes);
  }
}

// funcion de insercion al JSON
function insertar(json) {

  if (cod.value === "") {
    alert("Por favor, ingrese el codigo del estudiante");
  }
  else if (nom.value === "") {
    alert("Por favor, ingrese el nombre del estudiante");
  }
  // valida que el valor del campo "nota" sea un numero entre 0 y 5
  else if (nota.value === "" || isNaN(nota.value) || nota.value < 0 || nota.value > 5) {
    alert("Por favor, ingrese un valor correcto para la nota");
  } 
  else if (indice != null) {
    EditarReg(json);
  } else {
    // insertando el valor de cada campo en la propiedad que corresponde del obj. estudiante
    estudiantes.push({ "codigo": cod.value, "nombre": nom.value, "nota": parseFloat(nota.value) });
    //limpiando los campos del formulario
    cod.value = "";
    nom.value = "";
    nota.value = "";
    llenartbl(json);    
  }
}

// seleccionar y editar registro de la tabla
SeleccionarFila(estudiantes);
function SeleccionarFila(json) {
  var filas = document.getElementById('tbl_cuerpo').getElementsByTagName('tr');
  for (i = 0; i < filas.length; i++) {
    filas[i].onclick = function () {
      //console.log(this.rowIndex); // al poner -1, el index de la tabla coincide con el del json
      //console.log(json[this.rowIndex-1].codigo);
      indice = this.rowIndex - 1;
      cod.value = json[indice].codigo;
      nom.value = json[indice].nombre;
      nota.value = json[indice].nota;
    }
  }
}

// Editar registro seleccionado
function EditarReg(json) {
  json[indice].codigo = cod.value;
  json[indice].nombre = nom.value;
  json[indice].nota = nota.value;
  cod.value = "";
  nom.value = "";
  nota.value = "";
  indice = null;
  llenartbl(json);  
}

// Eliminar Registro
function EliminarReg(json) {
  if (indice != null) {
    if (window.confirm("Esta seguro de Eliminar este Estudiante?")) {
      json.splice(indice, 1);
      llenartbl(json);
      cod.value = "";
      nom.value = "";
      nota.value = "";
      indice = null;
    }
  }else{
    alert("Seleccione el Estudiante que desea eliminar!");
  }  
}
//-----------------------------------------------------------------------------------------//
// Calculos

// Calcular Promedio
function promediar(json) {
  var sumatoria = 0;
  var nota_promedio = 0;
  for (var i in json) {
    sumatoria += json[i].nota;
  }
  nota_promedio = sumatoria / json.length;
  alert("Promedio del curso: " + nota_promedio.toPrecision(2));
}

// Buscar nota alta
function nota_alta(json) {
  var notaMayor = json[0].nota, estudiante = "";
  for (var i in json) {
    if (json[i].nota > notaMayor) {
      notaMayor = json[i].nota;
      estudiante = json[i].nombre;
    }
  }
  alert("La nota mas alta es de: " + notaMayor + "\nPertenece al Estudiante: " + estudiante);
}

// Buscar nota baja
function nota_baja(json) {
  var notaBaja = json[0].nota, estudiante = json[0].nombre;
  for (var i in json) {
    if (json[i].nota < notaBaja) {
      notaBaja = json[i].nota;
      estudiante = json[i].nombre;
    }
  }
  alert("La nota mas baja es de: " + notaBaja + "\nPertenece al Estudiante: " + estudiante);
}

//-----------------------------------------------------------------------------------------//
// eventos en los botones
var btn_registrar = document.getElementById("registrar");
btn_registrar.addEventListener("click", function () {
  insertar(estudiantes);
});

var btn_eliminar = document.getElementById("eliminar");
btn_eliminar.addEventListener("click", function () {
  EliminarReg(estudiantes);
});

var btn_nota_baja = document.getElementById("mostrar_nota_menor");
btn_nota_baja.addEventListener("click", function () {
  nota_baja(estudiantes);
});

var btn_nota_mayor = document.getElementById("mostrar_nota_mayor");
btn_nota_mayor.addEventListener("click", function () {
  nota_alta(estudiantes);
});

var promedio = document.getElementById("promediar");
promedio.addEventListener("click", function () {
  promediar(estudiantes);
});