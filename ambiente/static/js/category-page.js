var sitios = [];

    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split ("&");
    var params = {};
    var uuidCategoria='';

    for ( var i = 0; i < paramarr.length; i++) {
        var tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    if (params['categoria']) {
    console.log('El valor del parámetro variable es: '+params['categoria']);
    uuidCategoria = params['categoria'];
    } else {
    console.log('No se envió el parámetro variable');
    }

/* fetch('http://fundamentos.academlo.com/api/v1/directories/5c82982e-b63e-4280-8287-4eba0e99716a/categories')
    .then(response => {
        console.log(response.json());
    }) */
const urlApi = 'http://fundamentos.academlo.com/api/v1/categories/'+ uuidCategoria +'/products';

fetch(urlApi)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(category => {
        console.log(category);
        console.log("hola"+category.products[0].name);
        document.getElementById('tituloApi').innerHTML = '<h2>' + category.name + '</h2>';
        var noItem= 0;
        category.products.forEach(elemento => {
            
            var objeto = {
                nombre: "nombre1",
                desc: "descripcion1",
                sitio: "product.html",
                imagenRuta: "",
                id: "0",
                item: '0'
            };
            
            objeto.nombre = elemento.name;
            objeto.desc =  elemento.description;
            objeto.imagenRuta += elemento.image;
            objeto.id = uuidCategoria;
            objeto.item = '' + noItem;
            noItem++;
            sitios.push(objeto);
        });
        //console.log(sitios);
        sitios.forEach(element => {
            document.getElementById('contenedorSitios').innerHTML += "<div class='col-md-4 pagina'><div><div class='imagePage'><img src='" + element.imagenRuta + "'></div><div class='tarjeta'><h4>" + element.nombre + "</h4><div><p>" + element.desc + "</p></div><button type='button' onclick=window.open('" + element.sitio + "?uuid="+element.id+"&item="+element.item+"') class='btn btn-outline-dark'>Visit site</button></div></div></div>";
        });
    })
    .catch(error => {
        alert("hubo un error");
    })



