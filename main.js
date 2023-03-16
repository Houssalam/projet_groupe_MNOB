const apiKey = "123d53de18f4c00990570e96b5be9ff1";

const searchButton = document.getElementById("searchButton");
const movieTitleInput = document.getElementById("movieTitle");
const movieInfoDiv = document.getElementById("movieInfo");

searchButton.addEventListener("click", () => {
  const movieTitle = movieTitleInput.value;
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const movieId = data.results[0].id;
      const movieTitle = data.results[0].title;

      return fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`
      );
    })
    .then((response) => response.json())
    .then((data) => {
      const movieTitle = data.title;
      const actorNames = data.credits.cast
        .slice(0, 3)
        .map((actor) => actor.name);
      const actorImages = data.credits.cast
        .slice(0, 3)
        .map((actor) => `https://image.tmdb.org/t/p/w200${actor.profile_path}`);

      movieInfoDiv.innerHTML = `
                <h2>${movieTitle}</h2>
                <h3>Acteurs :</h3>
                <ul>
                  <li>${actorNames[0]}</li>
                  <li>${actorNames[1]}</li>
                  <li>${actorNames[2]}</li>
                </ul>
                <h3>Photos :</h3>
                <ul>
                  <li><img src="${actorImages[0]}" alt="Photo de ${actorNames[0]}"></li>
                  <li><img src="${actorImages[1]}" alt="Photo de ${actorNames[1]}"></li>
                  <li><img src="${actorImages[2]}" alt="Photo de ${actorNames[2]}"></li>
                </ul>
              `;
    })
    .catch((error) =>
      console.log("Erreur lors de la requête à l'API : ", error)
    );
});

// fetch(
//   `https://api.themoviedb.org/3/search/movie?api_key=123d53de18f4c00990570e96b5be9ff1`
// )
//   .then((response) => response.json())
//   .then((result) => console.log(result));
