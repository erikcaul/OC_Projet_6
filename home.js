/**
 * index manager
 */

fetch("http://localhost:8000/api/v1/titles")
    .then( data => data.json())
    .then( jsonListFilm => {
        for(let jsonFilm of jsonListFilm){
            let film = new Film(jsonFilm);
            document.querySelector(".container");
        }
        console.log(jsonListFilm);
        // print(jsonListFilm);
    });