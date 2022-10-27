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
        let button = document.createElement("button");
        button.type = "button";
        button.className += "myBtn";
        let movieId = movies[i].id;
        let movieTitle = movies[i].title;
        button.id = movieId;
        button.title = movieTitle;
        document.getElementById(category).appendChild(button).appendChild(image);
        image.innerHTML = `<img src= ${image_url}>`;
    } 
    return movies;
}

// Display best movie
async function displayBestMovie(){
    let bestMovie = await fetchBestMovie();
    // display movieTitle
    let titleBestMovie = bestMovie.title;
    let titleBest = document.createElement("div");
    let button = document.createElement("button");
    button.type = "button";
    button.className += "myBtn";
    let bestId = bestMovie.id;
    button.id = bestId;
    document.getElementById("bestMovie").appendChild(button);
    button.innerText = "Play";
    document.getElementById("bestMovie").appendChild(titleBest);
    titleBest.innerHTML = titleBestMovie;
    // display movieImage
    let imageBestMovie = bestMovie.image_url;
    let imageBest = document.createElement("div");
    document.getElementById("bestMovie").appendChild(imageBest);
    imageBest.innerHTML = `<img src= ${imageBestMovie}>`;
    return bestMovie;
}

// Display Modal content
async function displayModalContent(id){
    let modalInfo = await fetchApi("api/v1/titles/", `id=${id}`);
    // display movieImage
    let modalMovieImage = modalInfo.image_url;
    let movieImage = document.createElement("div");
    document.getElementById("modal-content").appendChild(movieImage);
    movieImage.innerText = modalMovieImage;
    // display movieTitle
    let modalMovieTitle = modalInfo.title;
    let movieTitle = document.createElement("div");
    document.getElementById("modal-content").appendChild(movieTitle);
    movieTitle.innerText = modalMovieTitle;
    // display date year
    let modalMovieYear = modalInfo.year;
    let movieYear = document.createElement("div");
    document.getElementById("modal-content").appendChild(movieYear);
    movieYear.innerText = modalMovieYear;
    // display rated
    
    // display imdb scoring
    // display directors
    // display actors list
    // display duration
    // display origin country
    // display worldwide gross income
    // display description


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

// Get the button that opens the modal
var btnList = document.getElementsByClassName("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
for (btn of btnList){
    btn.onclick = function() {
        modal.style.display = "block";
      }      
}

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


displayBestMovie();
displayMovies('action', 0);
displayMovies('Sci-Fi', 0);
displayMovies('Thriller', 0);