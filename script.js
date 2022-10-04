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
    console.log(bestListMovies);
    let bestMovie = bestListMovies[0];
    for (let j=0;j<5;j++){
        bestMovie = bestListMovies[j];
        if (bestMovie.image_url !== null){
            return bestMovie;
        }
    }
}
 
// Display movies by category
async function displayMovies(category){
    let movies = await fetchCategory(category,7);
    for (let i=0; i<movies.length;i++){
        let image_url = movies[i].image_url;
        let image = document.createElement("div");
        document.getElementById(category).appendChild(image);
        image.innerHTML = `<img src= ${image_url}>`;
    } 
    return movies;
}

// Display best movie
async function displayBestMovie(){
    let bestMovie = await fetchBestMovie();
    let imageBestMovie = bestMovie.image_url;
    let imageBest = document.createElement("div");
    document.getElementById("bestMovie").appendChild(imageBest);
    imageBest.innerHTML = `<img src= ${imageBestMovie}>`;
    return bestMovie;
}

displayBestMovie();
displayMovies('action');
