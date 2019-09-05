const urlApi = 'http://fundamentos.academlo.com/api/v1/'

function getcategories(){
    const categoriasUrl = `${urlApi}directories/5c82982e-b63e-4280-8287-4eba0e99716a/categories`
    fetch(categoriasUrl)
    .then (responce =>{
        return responce.json()
    })
    .then(categories =>{
       let ouput = ''
       categories.forEach(element => {
           ouput += `
           <h4>${element.name}</h4>
           `
       });

       document.getElementById('aver').innerHTML = ouput;
    })
}

getcategories();