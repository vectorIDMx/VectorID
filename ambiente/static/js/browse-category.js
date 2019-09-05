
const urlApi = 'http://fundamentos.academlo.com/api/v1/directories/5c82982e-b63e-4280-8287-4eba0e99716a/categories'; 
var categorias = [];
function getcategories (){
    fetch (urlApi)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(directories  =>{
        console.log(directories)

        directories.categories.forEach(elemento => {
            
            var objeto = {
                nombre: "nombre1",
                desc: "descripcion1",
                id: "0",
                item: '0'
            };
            
            objeto.nombre = elemento.name;
            objeto.id = elemento.uuid;
            categorias.push(objeto);
        });
        console.log(categorias);
        categorias.forEach(element => {
            document.getElementById('contenidoBrowse').innerHTML += `<div onclick=window.open('category-page.html?categoria=${element.id}','_self') class="contenedorCate col-md-4 col-lg-3">
            <div class="cate">
                <div class="overl"></div>
                <div class="contenidoCate">
                    <!-- <i class="fas fa-list-ul"></i> -->
                    <i id="bricono" class="fas fa-bullhorn"></i>
                    <h4 id="brtitulo">${element.nombre}</h4>
                    <h6 id="brdesc">12 listing</h6>
                </div>
            </div>
        </div>`
        });
    })
}

getcategories();
