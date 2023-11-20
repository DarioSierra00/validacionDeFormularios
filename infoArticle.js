const queryString = window.location.search;
const urlComments = "http://localhost:3000/comments";
const urlArticles = "http://localhost:3000/articles";
const urlUser = "http://localhost:3000/users";
let id = queryString.charAt(queryString.length-1);
const inputId = document.getElementById('id');
const inputTitle = document.getElementById('title');
const inputContent = document.getElementById('content');
const inputAuthorId = document.getElementById('authorId');
let textAreaComm = document.getElementById('comments');
const selectUser = document.getElementById('user');
const sendButton = document.getElementById('send');
let coments = document.getElementById('comentarios');

//Función para obtener los articulos
async function getArticle(){
    const response = await fetch(urlArticles + "?id=" + id); //Hacemos un GET de los articulos que tengan la id que hemos cogido en la url(Id del articulo)
    const data = await response.json();
    addToInput(data) //Llamo a la función addToInput y le paso por parametros la respuesta recibida del GETs
}

//Funcion para obtener los comentarios
async function getComments(){
    const response = await fetch(urlComments + "?articleId=" + id);//Hacemos un GET de los comentarios que tengan la id igual que la id del articulo

    if(response.ok){//Si la respuesta es ok
        const data = await response.json();
        data.forEach(coment => { //Hago un forEach de los datos de la respuesta
            let nombreAutor = getUsersById(coment.idUser);
            let textNode = document.createTextNode(`Autor : ${nombreAutor} ${coment.comm}`)
            let saltoLinea = document.createElement('br');
            coments.appendChild(textNode)
            coments.appendChild(saltoLinea)
            // coments.appendChild('\n'); //Al textArea le añado cada comentario y un salto de linea
        });

    }

}

async function getUsersById(idUser){
    const response = await fetch(urlUser + '?id=' + idUser); //Peticion GET a la Api de users
    const data = await response.json();
    let nombre = data;
    let user;

    for(let i in nombre){ //Recorro 
        console.log(nombre[i].name)
        user = nombre[i].name ;
    }
    return user;
}

//Funcion para obtener los users
async function getUsers(){
    const response = await fetch(urlUser); //Peticion GET a la Api de users
    const data = await response.json();
    let users = data; //Le asigno a la variable users la respuesta 

    for(let i in users){ //Recorro los users
        let user = new Option(users[i].name, users[i].id); //Creo un new Option para el select de users
        selectUser.appendChild(user) //Le añado el nombre del user al select
    }
}

//Funcion para añadir comentarios a la API
async function addCommentToApi(comment){
    //Realizo un POST, en el que le paso el parametro que recibe la función
    const response = await fetch(urlComments, {
        method : "POST",
        body : JSON.stringify(comment),
        headers: {
            "Content-type": "application/json"
        } 
        
    })
    if(response.ok){
        const data = await response.json();
        let textNode = document.createTextNode(`${comment.comm}`)
        coments.appendChild(textNode);
    }
}

//Funcion para añadir a los div
function addToInput(article){
    inputId.textContent = article[0].id;
    inputTitle.textContent = article[0].title;
    inputContent.textContent = article[0].content;
    inputAuthorId.textContent = article[0].authorId;
}

sendButton.addEventListener('click', function(event){
    event.preventDefault()
    let idUser = selectUser.value;
    let articleId = id;
    let comm = comentario.value

    let newComment = {idUser,articleId,comm}
    addCommentToApi(newComment);
    
})
getComments()
getArticle()
getUsers()