const movieDetail = document.querySelector(".movie-detail")
const params = new URLSearchParams(location.search);
const imdbId = params.get("id");

if (imdbId) {
    searchMovie(imdbId.trim());
}

async function searchMovie(movieName) {
    movieDetail.innerHTML = `<div class="loader"></div>`
    let response = await fetch(`https://www.omdbapi.com/?apikey=6ed6e6bf&i=${imdbId}`)
    let data = await response.json();
    console.log(data);
    if (data.Response === "True") {
        displayMovie(data)
    }
    else {
        console.log(data.error);
    }
}

function displayMovie(data) {

    movieDetail.innerHTML =
        `  <div>
            <img src=${data.Poster} alt="">
        </div>
        <div>
            <h2>${data.Title}</h2>
            <section>
                <p>${data.Released}</p>
                <p>${data.Rated}</p>
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <p>${data.imdbRating}/10</p>
            </section>
        </div>
        <div>
            <p>Plot Overview</p>
            <p>${data.Plot}</p>
        </div>
        <div>
            <p>Director</p>
            <p>${data.Director}</p>
        </div>
        <div>
            <p>Writer</p>
            <p>${data.Writer}</p>
        </div>
        <div>
            <p>Actors</p>
            <p>${data.Actors}</p>
        </div>
        <a href=https://www.imdb.com/title/${data.imdbID} target=_blank> <button>Watch Movie </button></a>`

}

