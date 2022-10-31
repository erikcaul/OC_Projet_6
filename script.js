// Fetch API
async function fetchApi(path, query){
    let response = await fetch(`http://localhost:8000/${path}?${query}`);
    return await response.json();
}

// Fetch with 2 parameters : category + number of films to fetch
async function fetchCategory(category, nbMovies){
    let movies = [];
    for(let i=1;movies.length < nbMovies; i++) {
        let fetchApiResult = await fetchApi("api/v1/titles/", `genre=${category}&page=${i}`);
        movies.push(...fetchApiResult.results);
    }
    movies.splice(7,3);
    return movies;    
}
   
// Fetch Best film
async function fetchBestMovie(){
    let bestListFilmResult = await fetchApi("api/v1/titles/", `sort_by=imdb_score`); 
    let bestListMovies = bestListFilmResult.results;
    let bestMovie = bestListMovies[0];
    for (let j=0;j<5;j++){
        bestMovie = bestListMovies[j];
        if (bestMovie.image_url !== null){
            return bestMovie;
        }
    }
}
 
// Display movies by category
async function displayMovies(category, startnumber){
    document.getElementById(category).innerHTML = '';
    let movies = await fetchCategory(category,7);
    let endNumber = 0;
    if (startnumber == 0) {
        endNumber = 4;
    } else {
        endNumber = 7;
    }
    for (let i=startnumber; i<endNumber;i++){
        let image_url = movies[i].image_url;
        let image = document.createElement("article");
        document.getElementById(category).appendChild(image);
        image.onclick = function() {
            openModal(movies[i]);
        }
        image.innerHTML = `<img src= ${image_url}>`;
    } 
    return movies;
}

// Display best movie (mettre appel openModal comme pour autres)
async function displayBestMovie(){
    let bestMovie = await fetchBestMovie();
    // display movieTitle
    let titleBestMovie = bestMovie.title;
    let titleBest = document.createElement("h2");
    let button = document.createElement("button");
    button.type = "button";
    button.className += "myBtn";
    document.getElementById("bestTitleAndButton").appendChild(titleBest);
    titleBest.innerHTML = titleBestMovie;
    document.getElementById("bestTitleAndButton").appendChild(button);
    button.onclick = function() {
        openModal(bestMovie);
    }
    button.innerText = "Play";
    // display movieImage
    let imageBestMovie = bestMovie.image_url;
    let imageBest = document.createElement("div");
    document.getElementById("bestPicture").appendChild(imageBest);
    imageBest.onclick = function() {
        openModal(bestMovie);
    }
    imageBest.innerHTML = `<img src= ${imageBestMovie}>`;
    return bestMovie;
}

// Display Modal content (mettre des balises html dans la modal + css pour une meilleure mise forme)
async function displayModalContent(movie){
    /* let modalInfo = movie;
     */
    let movieId = movie.id;
    let modalInfo = await fetchApi(`api/v1/titles/${movieId}`); 
    // display movieImage
    let modalMovieImage = modalInfo.image_url;
    document.getElementById("movieImage").src = modalMovieImage;
    let modalMovieTitle = modalInfo.title;
    // let movieTitle = document.createElement("div");
    let movieTitle = document.getElementById("title");
    movieTitle.innerText = 'Title: ' + modalMovieTitle;
    // display date year
    let modalMovieYear = modalInfo.year;
    // let movieYear = document.createElement("div");
    let movieYear = document.getElementById("year");
    movieYear.innerText = 'Year: ' + modalMovieYear;

    // display rated
    let modalMovieRated = modalInfo.rated;
    let movieRated = document.getElementById("rated");
    movieRated.innerText = 'Rated: ' + modalMovieRated;
    
    // display imdb scoring
    let modalMovieImdbScoring = modalInfo.imdb_score;
    let movieImdbScoring =  document.getElementById("imdb_scoring");
    movieImdbScoring.innerText = 'imdb Scoring: ' + modalMovieImdbScoring;
    
    // display directors
    let modalMovieDirectors = modalInfo.directors;
    let movieDirectors =  document.getElementById("imdb_scoring");
    movieDirectors.innerText = 'Directors: ' + modalMovieDirectors;
    
    // display actors list
    let modalMovieActors = modalInfo.actors;
    let movieActors =  document.getElementById("actors_list");
    movieActors.innerText = 'Actors: ' + modalMovieActors;
    
    // display duration
    let modalMovieDuration = modalInfo.duration;
    let movieDuration =  document.getElementById("duration");
    movieDuration.innerText = 'Duration: ' + modalMovieDuration;

    // display origin country
    let modalMovieCountries = modalInfo.countries;
    let movieCountries =  document.getElementById("origin_country");
    movieCountries.innerText = 'Origin countries: ' + modalMovieCountries;

    // display worldwide gross income
    let modalMovieWorldwideCrossIncome = modalInfo.worldwide_gross_income  || "Not defined";
    let movieWorldwideCrossIncome =  document.getElementById("worldwide_cross_income");
    movieWorldwideCrossIncome.innerText = 'Woldwide Cross Income: ' + modalMovieWorldwideCrossIncome;

    // display description
    let modalMovieDescription = modalInfo.description;
    let movieDescription =  document.getElementById("description");
    movieDescription.innerText = 'Description: ' + modalMovieDescription;

}

// Move caroussel 
function next(category){
/*     document.getElementsByClassName('moveRight')[0].visibility = 'hidden';
 */    
    displayMovies(category, 4);
}

function preview(category){
    displayMovies(category, 0);
}

// Get the modal
var modal = document.getElementById("myModal");
/* 
// Get the button that opens the modal
var btnList = document.getElementsByClassName("myBtn");
 */
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
/* 
// When the user clicks on the button, open the modal
for (btn of btnList){
    btn.onclick = function() {
        modal.style.display = "block";
      }      
}
 */
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Open Modal
async function openModal(movie) {
    initModalContent();
    await displayModalContent(movie);
    modal.style.display = "block";
    
}

// init modal content (récuprer chaque élément de la modal et les mettre en innerHTML = "")
function initModalContent(){
    document.getElementById("movieImage").innerHTML = "";
    document.getElementById("title").innerHTML = "";
    document.getElementById("year").innerHTML = "";
    document.getElementById("rated").innerHTML = "";
    document.getElementById("imdb_scoring").innerHTML = "";
    document.getElementById("directors").innerHTML = "";
    document.getElementById("actors_list").innerHTML = "";
    document.getElementById("duration").innerHTML = "";
    document.getElementById("origin_country").innerHTML = "";
    document.getElementById("worldwide_cross_income").innerHTML = "";
    document.getElementById("description").innerHTML = "";
}

displayBestMovie();
displayMovies('action', 0);
displayMovies('Sci-Fi', 0);
displayMovies('Thriller', 0);