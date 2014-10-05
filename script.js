
    var monedaCien = [1,-1,-1],
        t1 = 0,
	monedaDosCientos = [1,1,-1],
	t2 = 1,
	monedas = [monedaCien,monedaDosCientos],
	t = [t1,t2]
	w = [],
	b = 0.5,
	mensaje = '',
	input = document.querySelectorAll('input[type="checkbox"]'),
	boton = document.getElementById('boton'),
	respuesta = document.getElementById('respuesta');



function inicio(){
	
	pesosAleatorios();

    boton.addEventListener("click", probar);
	var MaxEpoca = 3,
	    epoca = 0,
	    stringW = '[ ';

	while (epoca < MaxEpoca) {
		numEpoca = epoca + 1 ;
		mensaje += '<h2>Epoca  ' + numEpoca + '</h2>';
		for (var i = 0; i < monedas.length; i++) {	
			var stringW = '[ '
			a = hardlim(monedas[i]);
			error = t[i] - a;
			b = b + error;
			if(error != 0){
				w = reglaAprendizaje (error,  monedas[i]) ;
			}
			for (var j = 0; j < w.length; j++) {
				if(j != w.length -1){
					stringW += w[j] + ', ' 
				}
				else{
					stringW += w[j] + ' ] '
				}
			}

			 mensaje += "<p><span>Iteracion </span>"+ i +" <span>error: </span>"+ error + " <span>w: </span>" + stringW + "<span> b: </span>" + b + '</p>';

			console.log("Iteracion "+ i +" error: "+ error + " w: " + " b: " + b);

		}
		epoca++;
	}
	document.getElementById('pre').innerHTML = mensaje;
/*
	a = hardlim(monedaCien);
	error = t1 - a;
	w = reglaAprendizaje (error,  monedaCien) ;
	b = b + error;
	console.log("error: "+ error + " w: " + " b: " + b);
	
	a = hardlim(monedaDosCientos);
	error = t2 - a;
	b = b + error;
	console.log("error: "+ error + " w: " + " b: " + b); 

	a = hardlim(monedaCien);
	error = t1 - a;
	b = b + error;
	console.log("error: "+ error + " w: " + " b: " + b); 
*/
	console.log(w);
	console.log(b);
	
}
//Funcion de activación propia de la red
function hardlim(vector){
	if(Wp(vector) + b >= 0)
		return 1
	return 0
}
//funcion que calcula la suma de multiplicación de los pesos por las entradas
function Wp(vector){
	var acum = 0;
	for(var i = 0 ; i < vector.length ; i++){
		 acum += vector[i] * w[i];
	}
	return acum;
}
//Usa la regla del perceptron, se modifica el vector de pesos
function reglaAprendizaje(error, vector){
	var wNuevo = [];
	for(var i = 0 ; i < vector.length ; i++){

		  wNuevo.push(w[i] + error*vector[i]);
	}
	return wNuevo;
}
function probar(){
	var vector = [], acum = 0;
	for (var i = 0; i < input.length; i++) {
		if(input[i].checked){
			vector.push(1)
		}else{
			vector.push(-1)
		}		
	}

	for(var i = 0 ; i < vector.length ; i++){
		 acum += vector[i] * w[i];
	}
	console.log(acum);
	if(acum >= 0){
		respuesta.innerHTML = 'La fruta es : Manzana ';
		console.log(1);
	}else{
		respuesta.innerHTML = 'La fruta es : Naranja';
		console.log(0);
	}
}
function pesosAleatorios(){
	mensaje += "<p>Vector pesos aleatorios w : [ "
	for (var i = 0; i < 3; i++) {
		valorAleatorio = Math.floor( ( (Math.random() * 2) -1).toFixed(1) )
		w.push ( valorAleatorio );
		if(i == 2){
			mensaje += valorAleatorio + ' ] </p>' 
		}
		else{
			mensaje +=  valorAleatorio + ', '
		}
	}

}

