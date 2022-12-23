// https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=7038db10

const searchInput = document.querySelector("#search-input");
const moviesListDiv = document.querySelector(".random-movies-list");
const searchBtn = document.querySelector(".movie-search .search-btn");
const movieDetailsDiv = document.querySelector(".movie-details");
const movieIntro = document.querySelector(".movie-intro");

searchBtn.addEventListener("click", () => {
    let searchTerm = searchInput.value.trim();
    LoadMovies(searchTerm);
})

async function LoadMovies(searchTerm) {
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=7038db10`;
    const result = await fetch(URL);
    const data = await result.json();

    renderMovies(data);
}

function renderMovies(data) {
    moviesListDiv.innerHTML = "";
    if (data) {
        console.log(data);
        data.Search.forEach((movie) => {
            let movieDiv = document.createElement("div");
            movieDiv.dataset.id = `${movie.imdbID}`;
            movieDiv.classList.add("random-movie");

            let contents = `
                <div class="img">
                    <img src="${movie.Poster}" alt="">
                </div>
                <div class="info">
                    <h2>${movie.Title}</h2>
                    <p>${movie.Year}</p>
                    <button class="details-btn">Details</button>
                </div>
            `;

            movieDiv.innerHTML = contents;
            moviesListDiv.appendChild(movieDiv);
        });

        loadMovieDetails();
    } else {
        moviesListDiv.innerHTML = `<h1>Sorry, The movie was not found.</h1>`
    }
}

function loadMovieDetails() {
    let detailBtns = document.querySelectorAll(".details-btn");
    detailBtns.forEach((button) => {
        button.addEventListener("click", async (e) => {
            let movieId = e.currentTarget.parentElement.parentElement.dataset.id;
            const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=7038db10`);
            const data = await response.json();
            console.log(data)

            let contents = `
                <div class="img">
                    <img src="${data.Poster}" alt="">
                </div>
                <div class="movie-info">
                    <h3 class="movie-title">${data.Title}</h3>
                    <ul class="movie-misc-info">
                        <li class="year">Year: ${data.Year}</li>
                        <li class="rated">Ratings: ${data.Rated}</li>
                        <li class="released">Released: ${data.Released}</li>
                    </ul>
                    <p class="genre"><b>Genre: </b>${data.Genre}</p>
                    <p class="writer"><b>Writer: </b> ${data.Writer}</p>
                    <p class="actors"><b>Actors: </b>${data.Actors}</p>
                    <p class="plot"><b>Plot: </b> ${data.Plot}</p>
                    <p class="language"><b>Language: </b>${data.Language}</p>
                    <p class="awards"><b><i class="fas fa-award"></i></b>${data.Awards}</p>
                </div>
                <i class="fa-solid fa-xmark"></i>
            `;


            movieDetailsDiv.innerHTML = contents;
            movieDetailsDiv.classList.add("show-movie-details");
            let closeBtn = movieDetailsDiv.querySelector(".fa-xmark");
            closeBtn.addEventListener("click", () => {
                movieDetailsDiv.classList.remove("show-movie-details");
            })
        })
    })
}

// ['tt10648342', 'tt4154796', 'tt0974015', 'tt6146586', 'tt2231461', 'tt6105098', 'tt1745960', 'tt1300854', 'tt6467266', 'tt6443346', 'tt8093700']
window.addEventListener("DOMContentLoaded", introMovies);

function introMovies() {
    let movieIds = ['tt10648342', 'tt4154796', 'tt0974015', 'tt6146586', 'tt2231461', 'tt6105098', 'tt1745960', 'tt1300854', 'tt6467266', 'tt6443346', 'tt8093700'];
    const movies = [];

    movieIds.forEach(async (movieId) => {
        let response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=7038db10`);
        let data = await response.json();

        let contents = `
            <div class="movie-intro-info" data-id="${data.imdbID}">
                <h1>${data.Title} (${data.Year})</h1>
                <div class="more-info">
                    <p><i class="fa-regular fa-calendar"></i> ${data.Released}</p>
                    <p><i class="fa-regular fa-clock"></i> ${data.Runtime}</p>
                    <p><i class="fa-solid fa-video"></i> ${data.Genre}</p>
                </div>
                <div class="buttons">
                    <a href="https://github.com/nguHelon">
                        <button>view Github</button>
                    </a>
                    <button class="details-btn">View Details</button>
                </div>
            </div>
        `;

        movies.push(contents);
    })
    loadMovieDetails();
    setInterval(() => {
        showIntroMovies(movies);
    }, 5000)
}


function showIntroMovies(movies) {
    movies.forEach((movie) => {
        // setTimeout(() => {
        movieIntro.innerHTML = movie;
        // }, 1000)
    })
}