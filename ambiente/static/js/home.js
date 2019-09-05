//-----------Category-page---------
var sitios = [];

const urlApi = 'http://fundamentos.academlo.com/api/v1/categories/f5cff243-9ae0-48da-899f-6ca95cc6a200/products';

fetch(urlApi)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(category => {
        console.log(category);
        console.log("hola: " + category.name);
        document.getElementById('title').innerHTML = '<h2>' + category.name + '</h2>';
        var uuidCategoria = category.uuid;
        var noItem = 0;
        /* category.products.forEach(elemento =>  */
        for (var i = 0; i < 3; i++) {
            var elemento = category.products[i];
            var objeto = {
                nombre: "nombre1",
                desc: "descripcion1",
                sitio: "product.html",
                imagenRuta: "",
                id: "0",
                item: '0'
            };

            objeto.nombre = elemento.name;
            objeto.desc = elemento.description;
            objeto.imagenRuta += elemento.image;
            objeto.id = uuidCategoria;
            objeto.item = '' + noItem;
            noItem++;
            sitios.push(objeto);
        }
        //console.log(sitios);
        sitios.forEach(element => {
            document.getElementById('contenedorSitios').innerHTML += "<div class='col-md-4 pagina'><div><div class='imagePage'><img src='" + element.imagenRuta + "'></div><div class='tarjeta'><h4>" + element.nombre + "</h4><div><p>" + element.desc + "</p></div><button type='button' onclick=window.open('" + element.sitio + "?uuid=" + element.id + "&item=" + element.item + "') class='btn btn-outline-dark'>Visit site</button></div></div></div>";
        });
    })
    .catch(error => {
        alert("hubo un error");
    })

//--------Browse-categories

const urlApi2 = 'http://fundamentos.academlo.com/api/v1/directories/5c82982e-b63e-4280-8287-4eba0e99716a/categories'; 
var categorias = [];
function getcategories (){
    fetch (urlApi2)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(directories  =>{
        console.log(directories)

        directories.categories.forEach(elemento => {
            
            var objeto2 = {
                nombre: "nombre1",
                desc: "descripcion1",
                id: "0",
                item: '0'
            };
            
            objeto2.nombre = elemento.name;
            objeto2.id = elemento.uuid;
            categorias.push(objeto2);
        });
        console.log(categorias);
        /* categorias.forEach(element => */ 
            for(var i=0; i<8; i++)
            {
            document.getElementById('contenidoBrowse').innerHTML += `<div onclick=window.open('category-page.html?categoria=${categorias[i].id}','_self') class="contenedorCate col-md-4 col-lg-3">
            <div class="cate">
                <div class="overl"></div>
                <div class="contenidoCate">
                    <!-- <i class="fas fa-list-ul"></i> -->
                    <i id="bricono" class="fas fa-bullhorn"></i>
                    <h4 id="brtitulo">${categorias[i].nombre}</h4>
                    <h6 id="brdesc">12 listing</h6>
                </div>
            </div>
        </div>`
        }
    })
}

getcategories();
