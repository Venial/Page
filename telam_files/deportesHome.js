(function($){

    var PartidoMinutoaMinuto = function(element, options)
    {
        var obj = this;
		var xmlData = "";
        var defaults = {
			CantSegundos: 5000,
			UrlXml: "",
			FolderXml: "/servicios/deportes/goles/",
			IdPartido: ""
        };
        var timerInterval="";
        var minutosPartido="";
        var segundosPartido="";
		
        var config = $.extend(defaults, options || {});

		this.getConfig = function(){return config;};
		this.setConfig = function(variable,data){obj.getConfig().variable=data};
		
        this.Inicializate = function()
        {
			setInterval(function(){obj.CargarXML();}, obj.getConfig().CantSegundos);	
			return true;
        };
		

		this.CargarXML = function()
		{
			$.ajax({type: 'GET', url: this.getConfig().FolderXml+this.getConfig().UrlXml, cache: false, 
			dataType: (this.getInternetExplorerVersion()) ? 'text' : 'xml', 
			success: function(data){
				var xml; 
				if(typeof data == 'string'){ 
					xml = new	ActiveXObject('Microsoft.XMLDOM'); 
					xml.async = false; 
					xml.loadXML(data);
				} 
				else {
					xml = data;	
				}
				obj.CargarBloque(xml);
			}});

		}


         this.CargarBloque = function(xml)
		{
			var GolesLocal = $(xml).find('goles_local').text();
			var GolesVisitante = $(xml).find('goles_visitante').text();
			var PenalesLocal = $(xml).find('penales_local').text();
			var PenalesVisitante = $(xml).find('penales_visitante').text();
			var Estado = $(xml).find('Estado').text();
			var IniciaReloj = $(xml).find('IniciaReloj').text();
			var tiempoInicio = $(xml).find('tiempo').text();
			var MostrarPenales = $(xml).find('MostrarPenales').text(); 
			var UltimaIncidencia = $(xml).find('UltimaIncidencia').text(); 
			if (MostrarPenales==1)
			{
				$(".penales_"+this.getConfig().IdPartido+" .loc").html(PenalesLocal);
				$(".penales_"+this.getConfig().IdPartido+" .vis").html(PenalesVisitante);
			}else
			{
				$(".penales_"+this.getConfig().IdPartido+" .loc").html("");
				$(".penales_"+this.getConfig().IdPartido+" .vis").html("");
			}
			
			
			$(".estado_"+this.getConfig().IdPartido).html(Estado);
			$(".GolesPartido_"+this.getConfig().IdPartido).html(GolesLocal+"-"+GolesVisitante);
			$(".incidencia_"+this.getConfig().IdPartido).html(UltimaIncidencia);


			if (IniciaReloj==0)
			{	
				$(".tiempo_"+this.getConfig().IdPartido).html("");
				clearInterval(timerInterval);
				timerInterval = "";
			}
			if (IniciaReloj==1)
			{
				if (timerInterval=="")
				{
					if (tiempoInicio!="")
					{
						var date = new Date(tiempoInicio).getTime();
						var dateHoy = new Date().getTime();
						var dateFinal = dateHoy - date;
						minutosPartido = Math.floor(dateFinal / (1000 * 60));
						segundosPartido = Math.floor(dateFinal / 1000)-(minutosPartido*60);
						timerInterval=setInterval(function(){obj.SumarTiempoPartido();}, 1000);	
					}else
					{
						$(".tiempo_"+this.getConfig().IdPartido).html(this.checkTime(0)+'\'');
					}
				}
			}
			
		}// Fin Multimedia


		
		
		this.checkTime = function(i){if (i<10)	i="0" + parseInt(i);return i;}

		this.SumarTiempoPartido = function(){
			segundosPartido++;
			if (segundosPartido == 60) {
				segundosPartido = 0;
				minutosPartido++;
			}
			//console.log(minutosPartido)
			$(".tiempo_"+this.getConfig().IdPartido).html(this.checkTime(minutosPartido)+'\'');
		}


			
		this.getInternetExplorerVersion = function()
		{
			var rv = 0; // Return value assumes failure.
		
			if (navigator.appName == 'Microsoft Internet Explorer')
			{
				var ua = navigator.userAgent;
				var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if (re.exec(ua) != null)
					rv = parseFloat( RegExp.$1 );
			}
		
			return rv;
		}

		
    };
    
    $.fn.extend({
        partidoMinutoaMinuto : function(options)
        {
			return partidoMinutoaMinuto = new PartidoMinutoaMinuto(this, options);
        }
    });
})(jQuery);