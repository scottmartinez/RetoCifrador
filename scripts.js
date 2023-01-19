let txtTexto = document.getElementById("txtTexto");
let txtResultado = document.getElementById("txtResultado");
let btnCopiar = document.getElementById("btnCopiar");
let btnEncriptar = document.getElementById("btnEncriptar");
let btnDesencriptar = document.getElementById("btnDesencriptar");
txtTexto.setAttribute("Placeholder","Ingrese el texto Aqui")
txtResultado.setAttribute("Placeholder","Ningun Mensaje Encontrado")
/**
 *Limpia texto ingresado por el usuario
 * @param {[String]} textoACifrar Texto que ingresa el usuario
 * @returns {[string]} Devuelve un texto ya limpio, sin acentos, en minusculas y solo los caracteres especiales ¿?¡! y Espacios
 */
function RemueveCaracteresEspeciales(textoACifrar) {
  //regex to replace all acute vowels?
  let textolimpio = textoACifrar
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s¿?¡!]/g, "");
  //console.log(textolimpio);
  return textolimpio;
}
/**
 * Esta es la funcion que va a cifrar el texto que se le envie
 *Parametros de Cifrado:
 *La letra "e" es convertida para "enter"
 *La letra "i" es convertida para "imes"
 *La letra "a" es convertida para "ai"
 *La letra "o" es convertida para "ober"
 *La letra "u" es convertida para "ufat"
 * @param {[string]} texto Texto que se va a cifrar
 * @return {[string]} Retorna texto ya cifrado con los paramentros en el comentario.
 */
function Cifrar(texto) {
  let Diccionario = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };
  //Reemplaza las vocales del texto segun lo que esta el diccionario, el segundo parametro del Replace es una funcion que busca  y retorna una letra en el diccionario
  let textoCifrado = texto.replace(/[aeiou]/g, (letra) => Diccionario[letra]);
  //console.log(textoCifrado);
  return textoCifrado;
}
/**
 *Parametros de Descifrado:
 *La Frase "ai"    es convertida para "a"
 *La Frase "enter" es convertida para "e"
 *La Frase "imes"  es convertida para "i"
 *La Frase "ober"  es convertida para "o"
 *La Frase "ufat"  es convertida para "u"
 * @param {String} texto Texto que se va a descifrar
 * @returns Texto descifrado segun parametros
 */
function Descifrar(texto) {
  let Diccionario = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u",
  };
  //Reemplaza cada aparicion de las frases en en el texto, segundo parametro es una funcion flecha que busca y retorna el equivalente en el diccionario
  let textoDecifrado = texto.replace(
    /(ai)|(enter)|(imes)|(ober)|(ufat)/g,
    (frase) => Diccionario[frase]
  );
  return textoDecifrado;
}
function ClickCifrar() {
  let textoAEncriptar = txtTexto.value.toString();
  if (textoAEncriptar.length != 0) {
    txtResultado.value = Cifrar(RemueveCaracteresEspeciales(textoAEncriptar));
    txtResultado.dispatchEvent(new Event('change'));
  } else {
    alert("No hay texto a Cifrar");
  }
}
function ClicDescifrar() {
  let TextoDescifrar = txtTexto.value.toString();
  if (TextoDescifrar.length != 0) {
    txtResultado.value = Descifrar(TextoDescifrar);
    txtResultado.dispatchEvent(new Event('change'));
  } else {
    alert("No hay texto para descifrar");
  }
}
function CopiarAlPortapapeles() {
 // console.log("click")
  let valorcopiar = txtResultado.value;
 // console.log(valorcopiar)
  if (valorcopiar.length != 0) {
    navigator.clipboard.writeText(valorcopiar).then(
      function () {
      // alert("Valor Copiado correctamente");
      },
      function (error) {
        alert("No se pudo copiar el valor", error);
      }
    );
  } else {
    alert("No hay texto para copiar");
  }
}

function SiHayTextoResultado(){
 if(txtResultado.value!="" && txtResultado.value!=null)
 {
  document.getElementById("divimagen").classList.add("muneco_ocultar")
 }
 else
 {
  document.getElementById("divimagen").classList.remove("muneco_ocultar")
 }
}

btnEncriptar.setAttribute("OnClick", "ClickCifrar()");
btnDesencriptar.setAttribute("OnClick", "ClicDescifrar()");
btnCopiar.setAttribute("OnClick", "CopiarAlPortapapeles()");
txtResultado.setAttribute("OnChange","SiHayTextoResultado()")