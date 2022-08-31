/* const testFilm = document.createElement("testFilm");
let bestFilm = document.getElementsByClassName("category");
bestFilm.appendChild(testFilm);
const h1 = document.createElement("h1");
h1.innerText = "Miss Jerry"
testFilm.appendChild(h1);
testFilm.innerHTML = "<h1>Miss Jerry</h1><img src='https://m.media-amazon.com/images/M/MV5BNjA5Y2ZhYzctNDc1Yy00OGViLWI3NGUtOTYwZmE3NDFiYmIxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UY268_CR72,0,182,268_AL_.jpg'>";
 */

class Film{
    constructor(jsonFilm){
        jsonFilm && Object.assign(this, jsonFilm);
    }   
}

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
for (let i=1;i<500;i++) {
    fetchFilm("titles/", "?page=" + i).then(film => {
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
            document.getElementById("testFilm").appendChild(testTitle);
            document.getElementById("testFilm").appendChild(testImage);
            document.getElementById("testFilm").appendChild(testGenre);
            document.getElementById("testFilm").appendChild(testDirection);
            document.getElementById("testFilm").appendChild(testActors);
            testTitle.innerHTML = "<strong>Titre :</strong> " + title;
            testImage.innerHTML = `<img src= ${image_url}>`;
            testGenre.innerHTML = `genres : ${genres}`;
            testDirection.innerHTML = `Direction : ${directors}`;
            testActors.innerHTML = `Acteurs : ${actors}`;
        }
    })  
}


/* fetch("http://localhost:8000/api/v1/titles/")
    .then( data => data.json())
    .then( jsonListFilm => {
        let film = new Film(jsonListFilm);
        // filmTitle = film.title;
        document.querySelector(".container").innerHTML = '<div>Titre : </div>' + film.title;
        /* console.log(jsonListFilm); */
        // print(jsonListFilm);
        /* for(let jsonFilm of jsonListFilm){
            let film = new Film(jsonFilm);
            document.querySelector(".container").innerHTML += '<div>Titre : </div>' + film.title;
        } */
        /* let testListFilm = document.createElement("p");
        document.getElementById("testFilm").appendChild(testListFilm);
        testListFilm.innerHTML = jsonListFilm; 
    });
 */

// titre film
let h1 = document.createElement("h1");
document.getElementById("testFilm").appendChild(h1);
h1.innerHTML = "<strong>Titre :</strong> Miss Jerry";

// image film
let image = document.createElement("image");
document.getElementById("testFilm").appendChild(image);
image.innerHTML = "<img src='https://m.media-amazon.com/images/M/MV5BNjA5Y2ZhYzctNDc1Yy00OGViLWI3NGUtOTYwZmE3NDFiYmIxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UY268_CR72,0,182,268_AL_.jpg'>";

// genre 
let genre = document.createElement("p");
document.getElementById("testFilm").appendChild(genre);
genre.innerHTML = "Genres : Romance";

//direction film
let direction = document.createElement("p");
document.getElementById("testFilm").appendChild(direction);
direction.innerHTML = "Direction : Alexander Black";

//acteurs film
let actors = document.createElement("p");
document.getElementById("testFilm").appendChild(actors);
actors.innerHTML = "Acteur.es : Blanche Bayliss, Chaunley Depew, William Courtenay";

/* 
{
    "id": 9,
    "url": "http://localhost:8000/api/v1/titles/9",
    "imdb_url": "https://www.imdb.com/title/tt0000009/",
    "title": "Miss Jerry",
    "year": 1894,
    "imdb_score": "6.0",
    "votes": 154,
    "image_url": "https://m.media-amazon.com/images/M/MV5BNjA5Y2ZhYzctNDc1Yy00OGViLWI3NGUtOTYwZmE3NDFiYmIxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UY268_CR72,0,182,268_AL_.jpg",
    "directors": [
        "Alexander Black"
    ],
    "actors": [
        "Blanche Bayliss",
        "Chauncey Depew",
        "William Courtenay"
    ],
    "writers": [
        "Alexander Black"
    ],
    "genres": [
        "Romance"
    ]
}, */