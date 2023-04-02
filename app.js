// Select elements from the HTML document
const movieList = document.getElementById("films");
const movieTitle = document.getElementById("movie-title");
const movieRuntime = document.getElementById("movie-runtime");
const movieShowtime = document.getElementById("movie-showtime");
const movieAvailableTickets = document.getElementById("movie-available-tickets");
const buyButton = document.getElementById("buy-ticket");
const moviePoster = document.getElementById("movie-poster");


// Define URL for fetching movie data
const movieURL = "http://localhost:3000/films";

// Fetch movie data from the server
fetch(movieURL)
  .then(response => response.json())
  .then(data => {

    // Loop through movies and add them to the movie list
    data.forEach(movie => {
      const movieListItem = document.createElement("li");
      movieListItem.classList.add("film", "item");
      
    //  movieListItem.innerText = movie.title;
    const movieTitleLink = document.createElement("a");
movieTitleLink.href = "#";
movieTitleLink.innerText = movie.title;
movieListItem.appendChild(movieTitleLink);
      movieList.appendChild(movieListItem);

      // Add event listener for each movie list item to display movie details
      movieListItem.addEventListener("click", (event) => {
        event.preventDefault();

        // Update movie details with selected movie information
        movieTitle.innerText = movie.title;
        movieRuntime.innerText = `${movie.runtime} minutes`;
        movieShowtime.innerText = `Showtime: ${movie.showtime}`;
        let availableTickets = movie.capacity - movie.tickets_sold;
        movieAvailableTickets.innerText = `Available tickets: ${availableTickets}`;
        moviePoster.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;


        // Update buy button functionality based on ticket availability
        if (availableTickets > 0) {
          buyButton.disabled = false;
          buyButton.innerText = "Buy Ticket";
        } else {
          buyButton.disabled = true;
          buyButton.innerText = "Sold Out";
        }

        // Add event listener for buy button to purchase ticket and update ticket availability
        buyButton.addEventListener("click", () => {
          if (availableTickets > 0) {
            // Update ticket availability and disable buy button if sold out
            availableTickets--;
            movieAvailableTickets.innerText = `Available tickets: ${availableTickets}`;
            if (availableTickets === 0) {
              buyButton.disabled = true;
              buyButton.innerText = "Sold Out";
            }
          }
        });
      });
    });
  })
  .catch(error => console.error(error));

