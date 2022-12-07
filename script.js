// Fetch API
async function fetchApi(path, query){
    let response = await fetch(`http://localhost:8000/${path}?${query || ""}`);
    return await response.json();
}

// Fetch with 2 parameters : category + number of films to fetch
async function fetchCategory(category, nbMovies){
    let movies = [];
    for(let i=1;movies.length < nbMovies; i++) {
        let fetchApiResult = await fetchApi("api/v1/titles/", `genre=${category}&page=${i}&sort_by=-imdb_score`);
        movies.push(...fetchApiResult.results);
    }
    movies.splice(7,3);
    return movies;    
}
   
// Fetch Best film
async function fetchBestMovie(){
    let bestListFilmResult = await fetchApi("api/v1/titles/", `sort_by=-imdb_score`); 
    let bestListMovies = bestListFilmResult.results;
    let bestMovie = bestListMovies[0];
    for (let j=0;j<5;j++){
        bestMovie = bestListMovies[j];
        if (bestMovie.image_url !== null){
            return bestMovie;
        }
    }
}

// Fetch best rated movies
async function fetchBestImdbMovies(nbMovies){
    let bestRatedMoviesList = [];
    for(let i=1;bestRatedMoviesList.length < nbMovies; i++) {
        let bestRatedMoviesResult = await fetchApi("api/v1/titles/", `page=${i}&sort_by=-imdb_score`);
        bestRatedMoviesList.push(...bestRatedMoviesResult.results);
    }
    bestRatedMoviesList.splice(7,3);
    return bestRatedMoviesList;
}

// Display best rated movies
async function displayBestRatedMovies(startnumber){
    document.getElementById("bestRated").innerHTML = '';
    let moviesBestImdb = await fetchBestImdbMovies(7);
    let endNumber = 0;
    if (startnumber == 0) {
        endNumber = 4;
    } else {
        endNumber = 7;
    }
    for (let i=startnumber; i<endNumber;i++){
        let image_url = moviesBestImdb[i].image_url;
        let image = document.createElement("div");
        document.getElementById("bestRated").appendChild(image);
        image.onclick = function() {
            openModal(moviesBestImdb[i]);
        }
        image.innerHTML = `<img src= ${image_url} alt="movie image">`;
    } 
    return moviesBestImdb;
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
        let image = document.createElement("div");
        document.getElementById(category).appendChild(image);
        image.onclick = function() {
            openModal(movies[i]);
        }
        image.innerHTML = `<img src= ${image_url} alt="movie image">`;
        } 
    return movies;
}

// Display best movie 
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
    imageBest.innerHTML = `<img src= ${imageBestMovie} alt="best movie image">`;
    return bestMovie;
}

// Display Modal content 
async function displayModalContent(movie){
    let movieId = movie.id;
    let modalInfo = await fetchApi(`api/v1/titles/${movieId}`); 
    // display movieImage
    let modalMovieImage = modalInfo.image_url;
    document.getElementById("movieImage").src = modalMovieImage;
    document.getElementById("movieImage").alt = "movieImage";
    // display movieTitle
    let modalMovieTitle = modalInfo.title;
    document.getElementById("title").innerHTML = `<b>${modalMovieTitle}</b>`;
    let modalMovieGenre = modalInfo.genres.join(", ");
    document.getElementById("genres").innerHTML = `<b>Genres: </b> ${modalMovieGenre}`;
    // display date year
    let modalMovieYear = modalInfo.year;
    document.getElementById("year").innerHTML = `<b>Year: </b> ${modalMovieYear}`;
    // display rated
    let modalMovieRated = modalInfo.rated;
    document.getElementById("rated").innerHTML = `<b>Rated: </b> ${modalMovieRated}`;
    // display imdb scoring
    let modalMovieImdbScoring = modalInfo.imdb_score;
    let movieImdbScoring =  document.getElementById("imdb_scoring");
    movieImdbScoring.innerHTML = `<b>imdb Scoring: </b> ${modalMovieImdbScoring}`;
    // display directors
    let modalMovieDirectors = modalInfo.directors.join(", ");
    let movieDirectors =  document.getElementById("directors");
    movieDirectors.innerHTML = `<b>Directors: </b> ${modalMovieDirectors}`;
    // display actors list
    let modalMovieActors = modalInfo.actors.join(", ");
    let movieActors =  document.getElementById("actors_list");
    movieActors.innerHTML = `<b>Actors: </b> ${modalMovieActors}`;
    // display duration
    let modalMovieDuration = modalInfo.duration;
    let movieDuration =  document.getElementById("duration");
    movieDuration.innerHTML = `<b>Duration: </b> ${modalMovieDuration} minutes`;
    // display origin country
    let modalMovieCountries = modalInfo.countries;
    let movieCountries =  document.getElementById("origin_country");
    movieCountries.innerHTML = `<b>Origin countries: </b> ${modalMovieCountries}`;
    // display worldwide gross income
    let modalMovieWorldwideGrossIncome = modalInfo.worldwide_gross_income  || "Not defined";
    let movieWorldwideGrossIncome =  document.getElementById("worldwide_gross_income");
    movieWorldwideGrossIncome.innerHTML = `<b>Woldwide Gross Income: </b> ${modalMovieWorldwideGrossIncome} entries`;
    // display description
    let modalMovieDescription = modalInfo.description;
    let movieDescription =  document.getElementById("description");
    movieDescription.innerHTML = `<b>Description: </b>${modalMovieDescription}`;
}

// Move caroussel 
function next(category){  
    displayMovies(category, 4);
}

function preview(category){
    displayMovies(category, 0);
}

// Move caroussel Best Rated
function nextBestRated(){  
    displayBestRatedMovies(4);
}

function previewBestRated(){
    displayBestRatedMovies(0);
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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

// init modal content 
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
    document.getElementById("worldwide_gross_income").innerHTML = "";
    document.getElementById("description").innerHTML = "";
}

displayBestMovie();
displayBestRatedMovies(0);
displayMovies('action', 0);
displayMovies('Sci-Fi', 0);
displayMovies('Thriller', 0);