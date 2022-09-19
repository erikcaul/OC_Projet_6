/* class Film{
    constructor(jsonFilm){
        jsonFilm && Object.assign(this, jsonFilm);
    }   
} */

/* 
chaque film doit être un bloc html = un article
 -- section = category
 -- article = film
 
 + faire une function fetch simple, appel API simplement
 + function qui prend en paramètre la categorie et le nombre de films à récupérer  (après avoir appelé la première)
(un premier fetch pour un premier appel sur une première page et un second pour les 2 restant, il nous en faut 7)
 + function pour le meilleur film (sortby nimb + prendre le premier) (après avoir appelé la première)

 */

// Fetch API
async function fetchApi(path, query){
    let response = await fetch(`http://localhost:8000/${path}?${query}`);
    return await response.json();
}

let pageNb = "1";
let filmCounter = 0;

// Fetch with 2 parameters : category + number of films to fetch
async function fetchCategory(category, nbFilms){
    let films = [];
    for(let i=1;films.length < nbFilms; i++) {
        films.push(...await fetchApi("api/v1/titles/", `genre=${category}&page=${i}`));
    }
    // enlever les 3 derniers films
    return films;    
}
   
// Fetch Best film
async function fetchBestFilm(){
    let bestListFilm = await fetchApi("api/v1/titles/", `sort_by=imdb_score`); 
    return bestListFilm[0];
}

/* 
fetchBestFilm().then(film => {
    for (film of film.results) {
        title = film.title;
        image_url = film.image_url;
        directors = film.directors;
        actors = film.actors;
        writers = film.writers;
        genres = film.genres;
        let testTitle = document.createElement("testTitle");
        let testImage = document.createElement("image");
        let testGenre = document.createElement("p");
        let testDirection = document.createElement("p");
        let testActors = document.createElement("p");
        document.getElementById("bestFilm").appendChild(testTitle);
        document.getElementById("bestFilm").appendChild(testImage);
        document.getElementById("bestFilm").appendChild(testGenre);
        document.getElementById("bestFilm").appendChild(testDirection);
        document.getElementById("bestFilm").appendChild(testActors);
        testTitle.innerHTML = "<strong>Titre :</strong> " + title;
        testImage.innerHTML = `<img src= ${image_url}>`;
        testGenre.innerHTML = `genres : ${genres}`;
        testDirection.innerHTML = `Direction : ${directors}`;
        testActors.innerHTML = `Acteurs : ${actors}`;
    }  
})
 */
fetchCategory("Action/", 7, "1").then(film => {
    for (film of film.results) {
        title = film.title;
        image_url = film.image_url;
        directors = film.directors;
        actors = film.actors;
        writers = film.writers;
        genres = film.genres;
        let testTitle = document.createElement("testTitle");
        let testImage = document.createElement("image");
        let testGenre = document.createElement("p");
        let testDirection = document.createElement("p");
        let testActors = document.createElement("p");
        document.getElementById("container").appendChild(testTitle);
        document.getElementById("container").appendChild(testImage);
        document.getElementById("container").appendChild(testGenre);
        document.getElementById("container").appendChild(testDirection);
        document.getElementById("container").appendChild(testActors);
        testTitle.innerHTML = "<strong>Titre :</strong> " + title;
        testImage.innerHTML = `<img src= ${image_url}>`;
        testGenre.innerHTML = `genres : ${genres}`;
        testDirection.innerHTML = `Direction : ${directors}`;
        testActors.innerHTML = `Acteurs : ${actors}`;
    
        filmCounter++;
        if (filmCounter <= nbFilms){
            break;
        }
    }  
}) 

function fetchFilm(genre, page){
    return fetch("http://localhost:8000/api/v1/" + genre + page)
            .then(reponse => {
                if (reponse.ok) {
                    return reponse.json();
                 } else {
                    throw new error("problem");
                    }
                }
            )}

for (let i=1;i<2;i++) {
    fetchFilm("titles/", "?page=" + i).then(film => {
        for (film of film.results) {
            filmTitle = film.title;
            image_url = film.image_url;
            /* directors = film.directors;
            actors = film.actors;
            writers = film.writers;
            genres = film.genres; */
            let title = document.createElement("title");
            let image = document.createElement("image");
            /* let testGenre = document.createElement("p");
            let testDirection = document.createElement("p");
            let testActors = document.createElement("p"); */
            document.getElementById("container").appendChild(title);
            document.getElementById("container").appendChild(image);
            /* document.getElementById("container").appendChild(testGenre);
            document.getElementById("container").appendChild(testDirection);
            document.getElementById("container").appendChild(testActors);*/
            image.innerHTML = `<img src= ${image_url}>`;
            title.innerHTML = "<strong>Titre :</strong> " + filmTitle;
            
            /* testGenre.innerHTML = `genres : ${genres}`;
            testDirection.innerHTML = `Direction : ${directors}`;
            testActors.innerHTML = `Acteurs : ${actors}`; */
        }
    })  
}
