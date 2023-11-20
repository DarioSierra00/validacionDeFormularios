const urlUsers = "http://localhost:3000/users";
const urlArticles = "http://localhost:3000/articles";
const lista = document.getElementById('lista');
let articulos = [];

function createListItem(article) {
    let li = document.createElement('li');
    let link = document.createElement('a');
    let info = document.createTextNode(`Articulo ${article.title} con authorId ${article.id}`);
    link.setAttribute('href',`infoArticle.html?id=${article.id}`)

    li.appendChild(info);
    link.appendChild(li);
    lista.appendChild(link);
}

async function getArticlesApi(){
    const response = await fetch(urlArticles);
    const data = await response.json();
    articulos = data;

    articulos.forEach((articulo) => {
        createListItem(articulo);
    });
}

getArticlesApi();


lista.addEventListener('click',function(){

})
