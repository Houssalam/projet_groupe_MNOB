const apiKey = "123d53de18f4c00990570e96b5be9ff1";
const searchButton = document.getElementById("searchButton");
const movieTitleInput = document.getElementById("movieTitle");
const movieList = document.getElementById("movieList");

searchButton.addEventListener("click", () => {
    const movieTitle = movieTitleInput.value;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}&language=fr-FR`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        movieList.innerHTML = "";
        if (data.results.length > 0) {
          for (const result of data.results) {
            const li = document.createElement("li");
            const img = document.createElement("img");
            const p = document.createElement("p");
  
            img.src = `https://image.tmdb.org/t/p/w185${result.poster_path}`;
            img.alt = result.title;
            p.textContent = result.overview;
  
            const releaseDate = new Date(result.release_date);
            const year = releaseDate.getFullYear();
            li.textContent = `${result.title} (${year})`;

            li.appendChild(img);
            li.appendChild(p);
            movieList.appendChild(li);
          }
        } else {
          const li = document.createElement("li");
          li.textContent = "Aucun film trouvé pour cette recherche.";
          movieList.appendChild(li);
        }
      });
  });
  

fetch("https://api.themoviedb.org/3/search/movie?api_key=123d53de18f4c00990570e96b5be9ff1&query=batman")
.then((response) => response.json())
.then((result) => console.log(result));
