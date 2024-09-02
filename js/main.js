//Variables
const btnAgregar = document.getElementById("btnAgregar");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alerValidaciones = document.getElementById("alertValidaciones");
const alerValidacionesTexto = document.getElementById("alertValidacionesTexto");

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
    }//Que sea mayor que sea
    
    return true;
}//validarCantidad

btnAgregar.addEventListener("click", function(event){
    event.preventDefault(); //Prevenir por defecto
    //Limpiar el mensaje y el ocultar el bloque
        txtNombre.style.border ="";
        txtNumber.style.border ="";
        alerValidacionesTexto.innerHTML ="";
        alerValidaciones.style.display ="none";
    

    //Validad el nombre del producto
    if (txtNombre.value.trim().length<3) {
        //Aplicarle estilo en caso de error
        txtNombre.style.border ="solid red medium"
        alerValidacionesTexto.innerHTML ="El <strong>Nombre</strong> no es correcto. </br>";
        alerValidaciones.style.display ="block";
    }

    if(! validarCantidad()){
        txtNumber.style.border ="solid red medium"
        alerValidacionesTexto.innerHTML+="La <strong>Cantidad</strong> no es correcta. </br>";
        alerValidaciones.style.display ="block";
    }//Validar cantidad

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
