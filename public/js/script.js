
	var nomServicios = [
						 
							{
								servicio 	: 	"Trae todos los comentarios", 
								urlServicio	: 	"/getAllData", 
								metodo		: 	"GET"
							},
							{
								servicio 	: 	"like", 
								urlServicio	: 	"/updateLike",
								metodo		: 	"GET"
							},
							{
								servicio 	: 	"Crear comentario", 
								urlServicio	: 	"/createData",
								metodo		: 	"POST"
								
							},
							];
	var listadoDatos = [];
	var like = [];
	//Consumo de servicios...
	var consumeServicios = function(tipo, val)
	{
		var servicio = {
						url 	: nomServicios[tipo - 1].urlServicio, 
						metodo	: nomServicios[tipo - 1].metodo, 
						datos 	: ""
					};
		if(tipo === 3)
		{
			servicio.url += "/" + val;
		}
		else
		{
			servicio.datos = val !== "" ? JSON.stringify(val) : "";
		}
		$.ajax(
		{
			url 		: servicio.url,
			type 		: servicio.metodo, 
			data 		: servicio.datos, 
			dataType 	: "json",
			contentType: "application/json; charset=utf-8"
		}).done(function(data)
		{
			console.log("");
			//Todos los datos...
			if(tipo === 1)
			{
				listadoDatos = [];
				for(var i = 0; i < data.length; i++)
				{
					//console.log(data[i]);
					listadoDatos.push(new datoData(data[i]));
				}
				imprimeDatos();
			}
			else
			{
				if(tipo === 2 )
				{
					like = [];
					for(var i = 0; i < data.length; i++)
				{
					//console.log(data[i]);
					like.push(new datoData(data[i]));
				}
				imprimeDatos();
					}					
				}
				else
				{
					if(tipo === 3)
					{
				     if(data.status){
                     limpiarCampos();
                     console.log("Guardado Correctamente");
                     }
                     else{
                     console.log("Error");
                      }
						

					}
				}
				console.log("Data llega:");
				console.log(data);
				
				});
	};
	consumeServicios(1, "");	
	



	//Constructor datos...
	function datoData(datos)
	{
		this.comentario = datos.comentario;
		
		
		//Para devolver los datos del usuario a ser impresos...
		this.imprime = function()
		{
			return [
						
						this.comentario,
					
					];
		}
	}

	//Imprimer usuarios en pantalla...
	var imprimeDatos = function imprimeDatos()
	{
		var txt = "<table class = 'table-fill'>";
			txt += "<thead><tr>";		
			txt += "<th>ID</th>";
			txt += "<th>Nombre</th>";
			txt += "<th>E-mail</th>";
			txt += "<th>Fecha</th>";
			txt += "<th>Edad</th>";
			txt += "<th>Editar</th><th>Eliminar</th></tr></thead>";
			txt += "<tbody class = 'table-hover'>";
		for(var i = 0; i < listadoDatos.length; i++)
		{
			txt += "<tr>";
			var datosPersona = listadoDatos[i].imprime();
			for(var c = 0; c < datosPersona.length; c++)
			{
				txt += "<td><center>"+(datosPersona[c])+"</center></td>";
			}
			//Editar...
			txt += "<td><center>";
			txt += "<img src = 'img/editar.png' border = '0' id = 'e_"+i+"'/>";
			txt += "</center</td>";
			//Eliminar...
			txt += "<td><center>";
			txt += "<img src = 'img/eliminar.png' border = '0' id = 'd_"+i+"'/>";
			txt += "</center</td>";
			txt += "</tr>";
		}
		txt += "</tbody></table>";
		$("#imprime").html(txt);
		//Poner las acciones de editar y eliminar...
		for(var i = 0; i < listadoDatos.length; i++)
		{
			//Editar...
			$("#e_" + i).click(function(event)
			{
				var indice = event.target.id.split("_")[1];
				idUser = listadoDatos[indice].identificacion;
				consumeServicios(5, idUser);
			});

			//Eliminar...
			$("#d_" + i).click(function(event)
			{
				var ind = event.target.id.split("_")[1];
				if(confirm("¿Está segur@ de realizar está acción?"))
				{
					consumeServicios(4, listadoDatos[ind].identificacion);
				}
			});
		}
	}

	//Limpia los campos del formulario...
	var limpiarCampos = function()
	{
		console.log("Limpia campos...");
		fotoUser.img = "";
    	fotoUser.tomada = false;
		idUser = 0; //No se está editando nada...
		for(var i = 0; i < elementos.length; i++)
		{
			$("#" + elementos[i]).val("");
		}
		$("#fperfil").attr("src", "fotos/sinFoto.png");
	}

	//Acciones sobre el botón guardar...
	$("#guarda").click(function(event)
	{
		guardarDatos();
	});

	var guardarDatos = function()
	{
		var correcto = true;
		var valores = [];
		for(var i = 0; i < elementos.length; i++)
		{
			if($("#" + elementos[i]).val() === "")
			{
				alert("Digite todos los campos");
				$("#" + elementos[i]).focus();
				correcto = false;
				break;
			}
			else
			{
				valores[i] = $("#" + elementos[i]).val();
			}
		}
		//Si correcto es verdadero...
		if(correcto)
		{var nuevoDato = {
                usuario  :   valores[0], 
                comentario :   valores[1],                 
                like    :   0
              };     
      console.log(nuevoDato);           
      consumeServicios(2, nuevoDato);
      consumeServicios(1, "");
    }
		}
	};
});

window.onkeydown = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if(code == 13){
			guardarDatos();
		}

	}

var numPermitido = 30; 
var Caracteres=0;
var max=0;
	$("#txtArea").keydown(function() { 
			ValidaCaracteres();
		});
	$("#txtArea").keyup(function() { 
			ValidaCaracteres();
	});
	function ValidaCaracteres(){
		
		Caracteres = $("#txtArea").val().length;

		if(Caracteres>numPermitido){
			$("#Enviar").attr("disabled","disabled");
			$("#Enviar").css({  background: "red" });
		}else{
			$("#Enviar").removeAttr("disabled");
			$("#Enviar").css({  background: "#68b12f" });
			max = numPermitido-Caracteres;
		}
		cuenta();

	}

	function cuenta(){
				
			$("#caracteres").html("Caracteres "+max);
			console.log($("#txtArea").val().length);
		 
	}

});
