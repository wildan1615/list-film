'use strict';

// add event on multiple elements
const addEventOnElements = function (elements, eventType, callback) {
  for (const elem of elements) elem.addEventListener(eventType, callback);
}

// toggle search box in mobile device || small screen
const searchBox = document.querySelector("[search-box]");
const searchToggler = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchToggler, "click", function(){
  searchBox.classList.toggle("active");
})

// simpan movieId kedalam local storage ketika daftar movie diklik
const getMovieDetail = function(movie_id) {
  window.localStorage.setItem("movie_id", String(movie_id));
}

// simpan genreName & urlParam ke localstorage
const getMovieList = function(urlParam, genreName) {
  window.localStorage.setItem("urlParam", urlParam);
  window.localStorage.setItem("genreName", genreName);
}