let form = document.querySelector(".frm");
let input = document.querySelector(".frm-inpt");
let btn = document.querySelector(".btn")
let validMovie = document.querySelector(".validMovie")

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let query = input.value.trim();

    if (!query) {
        return;
    }
    searchMovie(query);
})

async function searchMovie(movieName) {
    validMovie.innerHTML = `<div class="loader"></div>`
    let response = await fetch(`https://www.omdbapi.com/?apikey=6ed6e6bf&s=${encodeURIComponent(movieName)}`)
    let data = await response.json();
    if (data.Response === "True") {
        displayMovies(data.Search)
    }
    else {
        validMovie.innerHTML = `<p>${data.Error}</p>`
    }
}
searchMovie("spider")

function displayMovies(movies) {
    validMovie.innerHTML = "";
    movies.forEach(movie => {
        const div = document.createElement("div");
        div.dataset.id = movie.imdbID;
        div.classList.add("movie-card");
        div.innerHTML = `<img src="${movie.Poster}">
   <h1>title: ${movie.Title} </h1>
   <h1>Year: ${movie.Year}</h1>
   `
        validMovie.append(div);
    });
}

validMovie.addEventListener('click', e => {
    e.stopPropagation();
    const movieCard = e.target.closest(".movie-card");
    const imdbID = movieCard.dataset.id
    location.href = `movie-details.html?id=${imdbID}`
})

