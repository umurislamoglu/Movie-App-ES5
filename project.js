const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films")

//UI objesini başlatma

const ui = new UI();

//Storage objesi üret

const storage = new Storage();

//tüm eventleri yükleme
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    secondCardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}
function addFilm(e){
    const title =titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
    //Hata
    ui.displayMessages("Eksik veri...","danger")

    }
    else {
        //Yeni film
        const newFilm = new Film(title,director,url);
        ui.addFilmToUI(newFilm); //Arayüze film ekleme
        storage.addFilmToStorage(newFilm);  // Storage a film ekleme
        ui.displayMessages("Ekleme başarılı...","success")
    }
    
    ui.clearInputs(titleElement,directorElement,urlElement);
    e.preventDefault();
}
function deleteFilm(e){
    if(e.target.id === "delete-film") {
       ui.deleteFilmFromUI(e.target); 
       storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
       
       ui.displayMessages("Silme işlemi başarılı","success")
    }

}

function clearAllFilms(){
    if(confirm("Emin misiniz?")){
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
}
}