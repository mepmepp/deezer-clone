import { handleSearch } from './search.mjs';

//////////////////////
// GLOBAL VARIABLES //
//////////////////////

export var root = document.documentElement;
var searchBarCreated = false;

///////////////////////////
// SEARCH BAR MANAGEMENT //
///////////////////////////

// DESC: verify device width and create search bar accordingly
// RETURNS: 'biggerScreen' or 'smallerScreen'
const verifyDeviceAndCreateSearchBar = () => {
    console.log("Verifying device for search bar creation");
    const loopIcone = document.getElementById("loop-icone");
    if (!loopIcone) return;
    console.log("Loop icon found");

    if (window.innerWidth >= 600) {
        const device = 'biggerScreen';
        if (searchBarCreated) return device;
        createSearchBarDesktop();
        return device;
    } else {
        const device = 'smallerScreen';
        if (searchBarCreated) return device;
        createSearchBarMobile();
        return device;
    }

}

// DESC : create search bar in header for desktop
// RETURNS: void
const createSearchBarDesktop = () => {
    console.log("Creating search bar for desktop");

    const loopIcone = document.getElementById("loop-icone");
    if (!loopIcone) return;

    // Create the search input element
    const searchInput = document.createElement("input");
    searchInput.id = "search-input";
    searchInput.type = "text";
    searchInput.placeholder = "Search...";
    searchInput.classList.add("search-input");

    // Insert before the loop icon
    loopIcone.parentNode.insertBefore(searchInput, loopIcone);

    // Make it visible
    setTimeout(() => searchInput.classList.add("visible"), 0);

    // Add search functionality
    searchInput.addEventListener('input', handleSearch);

    searchBarCreated = true;
};

// DESC: create search bar in header for mobile
// Hides home and my list icons
// RETURNS: void
const createSearchBarMobile = () => {
    if (searchBarCreated) return;
    console.log("Creating search bar for mobile");

    const loopIcone = document.getElementById("loop-icone");
    if (!loopIcone) return; 

    // Create the search input element and insert it before the loop icon
    const searchInput = document.createElement("input");
    searchInput.id = "search-input";
    searchInput.type = "text";
    searchInput.placeholder = "Search...";
    searchInput.classList.add("search-input"); 

    loopIcone.parentNode.insertBefore(searchInput, loopIcone);

    // Add search functionality
    searchInput.addEventListener('input', handleSearch);
    
    searchBarCreated = true;
}

// DESC: toggle search bar visibility when clicking on loop icon
// Only available on mobile (for simplicity, search bar should be more accessible on desktop)
// RETURNS: void
let searchBarVisible = false;
const changeSearchBarDisplay = () => {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return;

    // Unique transition style for all transitions in function
    const opacityTransition = "opacity var(--transition-time-fast) ease-in-out";
    const opacityTransitionAppear = "opacity var(--transition-time-slow) ease-in-out";
    const transitionFast = getComputedStyle(root).getPropertyValue("--transition-time-fast");
    const transitionMedium = getComputedStyle(root).getPropertyValue("--transition-time-medium");
    const transitionFastMs = transitionFast.replace('ms', '');
    const transitionMediumMs = transitionMedium.replace('ms', '');

    // Promise to improve readability of code below
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Change home opacity state based on search bar visibility
    const home = document.getElementById("home");
    if (home && !searchBarVisible) {
        home.style.opacity = "0";
        home.style.transition = opacityTransition;
        setTimeout(() => { home.style.display = "none"; }, transitionFastMs);
    } else if (home && searchBarVisible) {
        delay(transitionMediumMs).then(() => {
            home.style.display = "inline";
        })
        delay(transitionMediumMs + (transitionFastMs / 3)).then(() => {
            home.style.opacity = "1";
            home.style.transition = opacityTransitionAppear;
        });
    }

    // Change mylist opacity state based on search bar visibility
    const mylist = document.getElementById("my-list");

    if (mylist && !searchBarVisible) {
        mylist.style.opacity = "0";
        mylist.style.transition = opacityTransition;
        setTimeout(() => { mylist.style.display = "none"; }, transitionFastMs);
    } else if (mylist && searchBarVisible) {
        delay(transitionMediumMs).then(() => {
            mylist.style.display = "inline";
        })
        delay(transitionMediumMs + transitionFastMs).then(() => {
            mylist.style.opacity = "1";
            mylist.style.transition = opacityTransitionAppear;
        });
    }
    
    // Search bar appear or disappear depending on its previous state
    if (searchBarVisible) {
        searchInput.classList.remove("visible");
        searchBarVisible = false;
    } else {
        searchInput.classList.add("visible");
        searchBarVisible = true;
    }
}

////////////////////////////
// COLOR THEME MANAGEMENT //
////////////////////////////

// DESC: manage color theme change when clicking on color icon
// RETURNS: void
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

// DESC: EVENTLISTENER -> FETCH HEADER ON EACH PAGE
document.addEventListener("DOMContentLoaded", function() {
    fetch("/html/header.html")
        // Watch possible error when fetching header
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load header");
            }
            return response.text();
        })
        // Provide header to header-container 
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
            logoListener();
        })
        // Add the listener for color theme management
        .then(() => {
            colorThemeManagement();
        })
        // Add the search bar and its functionalities
        .then(() => {
            const device = verifyDeviceAndCreateSearchBar();
            switch (device) {
                case 'biggerScreen': 
                    // Search bar already managed above for bigger screens
                    break;
                case 'smallerScreen':
                    // Event listener to toggle mobile search bar visibility
                    const loopIcone = document.getElementById("loop-icone");
                    if (!loopIcone) return;
                    loopIcone.addEventListener("click", () => changeSearchBarDisplay());
                    break;
            }
        })
        // Catch possible error when loading header
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
async function fetchHeroSeries() {
    try {
        // Get the most popular serie
        const response = await fetch(`${BASE_URL}/tv/popular?language=fr-FR`, options);
        const data = await response.json();
        const bestSerie = data.results[0]; 

        const heroBanner = document.querySelector(".hero-banner");
        if (!heroBanner) return;

        // Set the background image
        heroBanner.style.backgroundImage = `url(${IMAGE_BASE_URL}${bestSerie.backdrop_path})`;
        heroBanner.setAttribute("aria-label", `Poster of ${bestSerie.name}`);

        // Update the content
        const serieResume = document.getElementById("serie-resume");
        if (serieResume) {
            serieResume.textContent = bestSerie.overview;
        }

        // Update button text
        const watchButton = document.getElementById("hero-watch-button");
        const infoButton = document.getElementById("hero-info-button");

        if (watchButton) {
            watchButton.textContent = `▶ Watch ${bestSerie.name}`;
        }
        if (infoButton) {
            infoButton.textContent = "ℹ More Info";
        }

    } catch (error) {
        console.error("Error fetching hero serie:", error);
    }
}

// FETCH FILMS

var Movie = /** @class */ (function () {
    function Movie(id, title, overview) {
        this.id = id;
        this.title = title;
        this.overview = overview;
    }
    return Movie;
}());

let allMovies = []; // ne sert à rien pour l'instant mais pourrait servir pour améliorer la recherche

// DESC: fetch movies from TMDB API and add them to the specified container
// PARAMS: endpoint (string) - API endpoint to fetch movies from
//         containerSelector (string) - CSS selector of the container to add movies to
// RETURNS: void
async function fetchMovies(endpoint, containerSelector) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}&language=fr-FR`, options);
        const data = await response.json();
        
        // Store movies in allMovies array
        data.results.forEach(movie => {
            const newMovie = new Movie(
                movie.id,
                movie.title,
                movie.overview
            );
            if (!allMovies.some(m => m.id === movie.id)) {
                allMovies.push(newMovie);
            }
        });
        
        addMoviesToRow(data.results, containerSelector);
    } catch (error) {
        console.error("Erreur API :", error);
    }
}

// DESC: add movie posters to a specified container
// PARAMS: movies (array) - array of movie objects
//         containerSelector (string) - CSS selector of the container to add movies to
// RETURNS: void
function addMoviesToRow(movies, containerSelector) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = "";


  movies.forEach(movie => {
    // Create container for poster and info box
    const posterContainer = document.createElement("div");
    posterContainer.classList.add("movie-poster-container");

    // Create and setup movie poster image
    const img = document.createElement("img");
    img.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
    img.alt = movie.title;
    img.setAttribute("aria-label", `Poster of ${movie.title}`);
    img.classList.add("movie-poster");
    
    // Create info box
    const infoBox = document.createElement("div");
    infoBox.classList.add("info-box");
    
    // Add title and overview to info box
    const title = document.createElement("h3");
    title.textContent = movie.title;
    
    const overview = document.createElement("p");
    overview.textContent = movie.overview;

    // Add data-title attribute for search functionality
    posterContainer.classList.add("movie");
    posterContainer.dataset.title = movie.title || '';
    
    // Add elements to their containers
    infoBox.appendChild(title);
    infoBox.appendChild(overview);
    
    posterContainer.appendChild(img);
    posterContainer.appendChild(infoBox);
    container.appendChild(posterContainer);
  });
}

// DESC: Fetch and update genre categories
// RETURNS: void
async function fetchAndUpdateGenres() {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?language=en`, options);
        const data = await response.json();
        
        // Get all section titles
        const sectionTitles = document.querySelectorAll('section h2');
        
        // Update each section title if a matching genre is found
        sectionTitles.forEach(title => {
            // Get the section's class name
            const sectionClass = title.closest('section').classList[0];
            
            // Find matching genre
            const genre = data.genres.find(g => 
                g.name.toLowerCase().includes(sectionClass.replace(/-/g, ' ').toLowerCase()) ||
                sectionClass.replace(/-/g, ' ').toLowerCase().includes(g.name.toLowerCase())
            );
            
            if (genre) {
                title.textContent = genre.name;
            }
        });
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
}

// Genre IDs from TMDB
const GENRE_IDS = {
    action: 28,
    comedy: 35,
    drama: 18,
    'science-fiction': 878,
    horror: 27
};

// DESC: EVENT LISTENER -> FETCH MOVIES ON EACH PAGE
// Different behavior if we're on the main page or the series page
document.addEventListener("DOMContentLoaded", () => {
    const isSeriesPage = window.location.pathname.includes('series.html');

    if (isSeriesPage) {
        // We're on the series page, fetch the hero series
        fetchHeroSeries();
    } else {
        // We're on the main page
        fetchAndUpdateGenres();
        
        // Fetch movies for each genre
        Object.entries(GENRE_IDS).forEach(([genre, id]) => {
            fetchMovies(`/discover/movie?with_genres=${id}`, `.${genre} .movies`);
        });
    }
});

///////////////////////////////////////
// USER EVENTS WHEN CLICKING ON LOGO //
///////////////////////////////////////

const chillFlixStyles = ['chilly-danger', 'chilly-zen', 'chilly-cold'];
let chillFlixStyle = chillFlixStyles[0];

// DESC: Check current chillflix style and return its index in chillFlixStyles array
// RETURNS: index of current style in chillFlixStyles or -1 if not found
const checkChillFlixStyle = () => {
    for (let i = 0; i < chillFlixStyles.length; i++) {
        if (chillFlixStyle === chillFlixStyles[i]) {
            return i;
        }
    }
    return -1;
}

// DESC: Change logo style and some text on the page when clicking on the logo
// Cycles through chillFlixStyles array
// RETURNS: void
const chillFlix = () => {
    const logo = document.getElementById("logo");
    const logoLike = document.querySelectorAll(".logo-like");
    const chillFlixResume = document.getElementById("chillflix-resume");
    const heroWatchButton = document.getElementById("hero-watch-button");
    const heroInfoButton = document.getElementById("hero-info-button");

    // If logo exists, change its style
    if (logo) {
        let i = checkChillFlixStyle();

        if (i === -1) {
            chillFlixStyle = chillFlixStyles[0];
        } else {
            chillFlixStyle = chillFlixStyles[(i + 1) % chillFlixStyles.length];
        }

        // Apply style changes based on current chillFlixStyle
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
                heroInfoButton.textContent = "ℹ More info";
                break;
            case 'chilly-cold':
                logo.style.fontFamily = '"Frijole", system-ui';
                chillFlixResume.textContent = "Unlimited streaming of films and shows. Step inside — what's concealed in the chilly night may chill, thrill, or delight you. You won’t know until you freeze.";
                heroWatchButton.textContent = "▶ Watch now if you're not frozen!";
                heroInfoButton.textContent = "ℹ More info";
                break;
        }

        // Apply the same font family to all elements with class "logo-like"
        logoLike.forEach(logoL => logoL.style.fontFamily = logo.style.fontFamily);

    } else {
        console.log("No logo to change.");
    }
}

// DESC: Add event listener to logo when header is loaded
// Used after the header is fetched
// RETURNS: void
function logoListener() {
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", chillFlix);
  } 
} 