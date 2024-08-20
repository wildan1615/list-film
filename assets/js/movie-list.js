'use strict'

import { api_key, fetchDataFromServer } from "./api.js";
import { sidebar } from "./sidebar.js"
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";

// kumpulkan genre name & url param dari localstorage
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const pageContent = document.querySelector("[page-content]");

sidebar();

let currentPage = 1;
let totalPages = 0;


fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&page=${currentPage}&sort_by=popularity.desc&${urlParam}`, function({ results: movieList, total_pages }) {

  totalPages = total_pages;
  document.title = `${genreName} Movies - TvFlix`;

  const movieLIstElem = document.createElement("section");
  movieLIstElem.classList.add("genre-list", "movie-list");
  movieLIstElem.ariaLabel = `${genreName} Movies`;

  movieLIstElem.innerHTML = `
    <div class="title-wrapper">
      <h1 class="heading">All ${genreName} Movies</h1>
    </div>
    <div class="grid-list">
      
    </div>
    <button class="btn load-more" load-more>Load More</button>
  `;

  // tambahkan movie card berdasarkan item yg sudah ditangkap
  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);
    movieLIstElem.querySelector(".grid-list").appendChild(movieCard);
  }

  pageContent.appendChild(movieLIstElem);

  // function tombol load more
  document.querySelector("[load-more]").addEventListener("click", function(){
    if (currentPage >= totalPages) {
      this.style.display = "none" // this == loadingBtn
      return;
    }

    currentPage ++;
    this.classList.add("loading"); // this == loadingBtn

    fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&page=${currentPage}&sort_by=popularity.desc&${urlParam}`, ({results: movieList}) => {
      this.classList.remove("loading"); // this == loadingBtn

      for (const movie of movieList) {
        const movieCard = createMovieCard(movie);

        movieLIstElem.querySelector(".grid-list").appendChild(movieCard);
      }
    });
  });
});

search();