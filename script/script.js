var root = document.documentElement;

// COLOR THEME

const colorThemeManagement = () => {
    const colorIcone = document.getElementById("color-theme-icone");
    const loopIcone = document.getElementById("loop-icone");
    const arrowDown = document.getElementById("arrow-down-icone");
    var root = document.documentElement;
    root.setAttribute("data-theme", "dark");

    var isHovering = false;
    colorIcone === null || colorIcone === void 0 ? void 0 : colorIcone.addEventListener("mouseenter", function () {
        isHovering = true;
    });
    colorIcone === null || colorIcone === void 0 ? void 0 : colorIcone.addEventListener("mouseleave", function () {
        isHovering = false;
    });
    colorIcone === null || colorIcone === void 0 ? void 0 : colorIcone.addEventListener("click", function () {
        var colorTheme = root.getAttribute('data-theme');
        if (colorTheme === 'dark') {
            root.setAttribute("data-theme", "light");
            if (colorIcone instanceof HTMLImageElement) {
                colorIcone.src = '/resources/icones/black-color-icone.png';
            }
            if (loopIcone instanceof HTMLImageElement) {
                loopIcone.src = '/resources/icones/black-loop-icone.png';
            }
            if (arrowDown instanceof HTMLImageElement) {
                arrowDown.src = '/resources/icones/black-down-arrow.png';
            }
        }
        else {
            root.setAttribute("data-theme", "dark");
            if (colorIcone instanceof HTMLImageElement) {
                colorIcone.src = '/resources/icones/white-color-icone.png';
            }
            if (loopIcone instanceof HTMLImageElement) {
                loopIcone.src = '/resources/icones/white-loop-icone.png';
            }
            if (arrowDown instanceof HTMLImageElement) {
                arrowDown.src = '/resources/icones/white-down-arrow.png';
            }
        }
    });
}

// FETCH HEADER ON EACH PAGE
document.addEventListener("DOMContentLoaded", function() {
    fetch("/html/header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load header");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
            logoListener();
        })
        .then(() => {
            colorThemeManagement();
        })
        .catch(error => {
            console.error("Error loading the header:", error);
        });
});

// CONFIG API TMDB
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGI5MDMyNzIyN2M4OGRhYWMxNGMwYmQwYzFmOTNjZCIsIm5iZiI6MTc1ODY0ODMyMS43NDg5OTk4LCJzdWIiOiI2OGQyZDgwMTJhNWU3YzBhNDVjZWNmZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aylEitwtAH0w4XRk8izJNNkF_bet8sxiC9iI-zSdHbU"
  }
};


// FETCH HERO BANNER IMAGE

// async function fetchHeroMovie(endpoint) {
//   try {
//     const response = await fetch(`${BASE_URL}${endpoint}&language=fr-FR`, options);
//     const data = await response.json();
//     const bestMovie = data.results[0]; // take the first one

//     const heroBanner = document.querySelector(".hero-banner");
//     heroBanner.style.backgroundImage = `url(${IMAGE_BASE_URL}${bestMovie.backdrop_path})`;
//     heroBanner.setAttribute("aria-label", `Poster of ${bestMovie.title}`);

//     const heroContent = heroBanner.querySelector(".hero-content h1");
//     heroContent.textContent = bestMovie.title;

//     const heroParagraph = heroBanner.querySelector(".hero-content p");
//     heroParagraph.textContent = bestMovie.overview;
//   } catch (error) {
//     console.error("Erreur API (hero):", error);
//   }
// }

// FETCH DES FILMS

var Movie = /** @class */ (function () {
    function Movie(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
    return Movie;
}());

let allMovies = [];

async function fetchMovies(endpoint, containerSelector) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}&language=fr-FR`, options);
        const data = await response.json();
        addMoviesToRow(data.results, containerSelector);
    } catch (error) {
        console.error("Erreur API :", error);
    }
}

// ======= RENDER MOVIES =======
function addMoviesToRow(movies, containerSelector) {
  const container = document.querySelector(containerSelector);
//   const prevButton = container.querySelector('.scroll-button.previous');
//   const nextButton = container.querySelector('.scroll-button.next');
  container.innerHTML = "";
  
  if (prevButton) container.appendChild(prevButton);
  if (nextButton) container.appendChild(nextButton);
  movies.forEach(movie => {
    const img = document.createElement("img");
    img.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
    img.alt = movie.title;
    img.setAttribute("aria-label", `Poster of ${movie.title}`);
    img.classList.add("movie-poster");
    container.appendChild(img);

    createInfoBox();

  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Favorites section
  fetchMovies("/movie/top_rated?sort_by=vote_average.desc", ".my-favorites .movies"); 

  // Hero banner
//   fetchHeroMovie("/movie/top_rated?sort_by=vote_average.desc"); // line added
});

// USER EVENTS WHEN CLICKING ON LOGO
// Desc: change logo and logo-like fonts, change chillflix resume text and buttons text

const chillFlixStyles = ['chilly-danger', 'chilly-zen', 'chilly-cold'];
let chillFlixStyle = chillFlixStyles[0];

const checkChillFlixStyle = () => {
    for (let i = 0; i < chillFlixStyles.length; i++) {
        if (chillFlixStyle === chillFlixStyles[i]) {
            return i;
        }
    }
    return -1;
}

const chillFlix = () => {
    const logo = document.getElementById("logo");
    const logoLike = document.querySelectorAll(".logo-like");
    const chillFlixResume = document.getElementById("chillflix-resume");
    const heroWatchButton = document.getElementById("hero-watch-button");
    const heroInfoButton = document.getElementById("hero-info-button");

    if (logo) {
        let i = checkChillFlixStyle();

        if (i === -1) {
            chillFlixStyle = chillFlixStyles[0];
        } else {
            chillFlixStyle = chillFlixStyles[(i + 1) % chillFlixStyles.length];
        }

        switch (chillFlixStyle) {
            case 'chilly-zen':
                logo.style.fontFamily = '"Fredericka the Great", serif';
                chillFlixResume.textContent = "Unlimited streaming of films and shows. Step inside — what hides in here may delight you or completely relax you. You won’t know until you try.";
                heroWatchButton.textContent = "▶ Watch now!";
                heroInfoButton.textContent = "ℹ More info";
                break;
            case 'chilly-danger': 
                logo.style.fontFamily = '"Rubik Glitch", system-ui';
                chillFlixResume.textContent = "Unlimited streaming of films and shows. Step inside — what lurks in the shadows may chill, thrill, or delight your mind. You won’t know until it’s too late.";
                heroWatchButton.textContent = "▶ Watch now if you dare!";
                heroInfoButton.textContent = "ℹ Truth is dangerous";
                break;
            case 'chilly-cold':
                logo.style.fontFamily = '"Frijole", system-ui';
                chillFlixResume.textContent = "Unlimited streaming of films and shows. Step inside — what's concealed in the chilly night may chill, thrill, or delight you. You won’t know until you freeze.";
                heroWatchButton.textContent = "▶ Watch now if you're not frozen!";
                heroInfoButton.textContent = "ℹ More info";
                break;
        }

        logoLike.forEach(logoL => logoL.style.fontFamily = logo.style.fontFamily);

    } else {
        console.log("No logo to change.");
    }
}

function logoListener() {
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", chillFlix);
  } 
} 


// CREATE INFO BOX WHEN LOADING MOVIES

const createInfoBox = () => {
    const infoBox = document.createElement("div");
    infoBox.class = "info-box";
    infoBox.id = parseMovieTitle();
    infoBox.textContent = "Movie Title"; // Placeholder text
    // infoBox.style.display = "none"; 
    infoBox.style.position = "absolute";
    infoBox.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    infoBox.style.color = "white";
    infoBox.style.padding = "10px";
    infoBox.style.borderRadius = "5px";
    infoBox.style.zIndex = "1000";
    document.body.appendChild(infoBox);
}

const parseMovieTitle = () => {

}