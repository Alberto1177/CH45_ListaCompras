//Variables
const btnAgregar = document.getElementById("btnAgregar");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos")
const productosTotal= document.getElementById("productosTotal")
const precioTotal = document.getElementById("precioTotal")

const alerValidaciones = document.getElementById("alertValidaciones");
const alerValidacionesTexto = document.getElementById("alertValidacionesTexto");

//Bandera que permite agregar los productos a la lista
let isValid = true;
let contador = 0; //cuenta los renglones al agregar un nuevo producto
let precio = 0;
let costoTotal =0;
let totalEnProductos =0;

//Funcion para validar la cantidad
function validarCantidad(){
    if (txtNumber.value.length==0) {
        return false;
    } //Longitud

    if (isNaN(txtNumber.value)) {
        return false;
    }//Que sea un numero

    if (Number(txtNumber.value) <= 0) {
        return false;
    }//Que sea mayor que 0
    
    return true;
}//validarCantidad

function getPrecio() {
    return Math.round((Math.random()*10000))/100;
}//Obtner un precio de forma random

btnAgregar.addEventListener("click", function(event){
    event.preventDefault(); //Prevenir por defecto
    //Limpiar el mensaje y el ocultar el bloque
        txtNombre.style.border ="";
        txtNumber.style.border ="";
        alerValidacionesTexto.innerHTML ="";
        alerValidaciones.style.display ="none";
        isValid = true;
    

    //Validad el nombre del producto
    if (txtNombre.value.trim().length<3) {
        //Aplicarle estilo en caso de error
        txtNombre.style.border ="solid red medium"
        alerValidacionesTexto.innerHTML ="El <strong>Nombre</strong> no es correcto. </br>";
        alerValidaciones.style.display ="block";
        isValid = false;
    }

    if(! validarCantidad()){
        txtNumber.style.border ="solid red medium"
        alerValidacionesTexto.innerHTML+="La <strong>Cantidad</strong> no es correcta. </br>";
        alerValidaciones.style.display ="block";
        isValid = false;
    }//Validar cantidad

    if (isValid) {
        contador++; //Incremento 1 al contador
        precio = getPrecio();
        //Se agrega la informacion obtenida de los campos a la tabla
        let row = `<tr>
                        <td>${contador}</td>
                        <td>${txtNombre.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>       
        </tr>`
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        totalEnProductos += Number(txtNumber.value);
        contadorProductos.innerText = contador;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = "$ "+ costoTotal.toFixed(2);

        //Almacenar la informacion
        localStorage.setItem("contador", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);

        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();

    }
}); //Evento de btnAgregar


//El evento blur es cuando un campo pierde el foco, se sale del foco

txtNombre.addEventListener("blur", function(event){
    //Quita los espacios al principio y al final
    txtNombre.value = txtNombre.value.trim();
}); //Evento para el txtNombre

txtNumber.addEventListener("blur", function(event){
    //Quita los espacios al principio y al final
    txtNumber.value = txtNumber.value.trim();
}); //Evento para el txtNumero

window.addEventListener("load", function() {
    if (this.localStorage.getItem("contador") != null) {
        contador = Number(this.localStorage.getItem("contador"));
    }
    if (this.localStorage.getItem("totalEnProdctos") != null) {
        totalEnProductos = Number(this.localStorage.getItem("totalEnProdcutos"));
    }
    if (this.localStorage.getItem("costoTotal") != null) {
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }

    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = "$ "+ costoTotal.toFixed(2);
})
