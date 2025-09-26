import { root } from './script.mjs';

//////////////////////////
// Search functionality //
//////////////////////////


// DESC: Handle search input to filter movie elements and adjust UI accordingly
// RETURNS: void
export const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    const movieElements = document.querySelectorAll('.movie');
    const categoryTitles = document.querySelectorAll('section h2');
    const heroBanner = document.querySelector('.hero-banner');

    const transitionFast = getComputedStyle(root).getPropertyValue('--transition-time-fast');

    // Hide or show hero banner based on whether there's search text
    if (searchText) {
        heroBanner.style.transition = `opacity ${transitionFast} ease-in-out`;
        heroBanner.style.opacity = '0';
        setTimeout(() => {
            heroBanner.classList.add('none');
        }, transitionFast.replace('ms', ''));
    } else {
        heroBanner.classList.remove('none');
        setTimeout(() => {
            heroBanner.style.transition = `opacity ${transitionFast} ease-in-out`;
            heroBanner.offsetHeight;
            heroBanner.style.opacity = '1';
        }, transitionFast.replace('ms', ''));
    }

    // Hide or show category titles based on whether there's search text
    categoryTitles.forEach(title => {
        if (searchText) {
            title.style.transition = 'opacity var(--transition-time-fast) ease-in-out';
            title.style.opacity = '0';
            setTimeout(() => {
                title.style.display = 'none';
            }, 200);
        } else {
            title.style.display = '';
            setTimeout(() => {
                title.style.transition = 'opacity var(--transition-time-fast) ease-in-out';
                title.style.opacity = '1';
            }, 0);
        }
    });

    movieElements.forEach(movieElement => {
        const title = movieElement.dataset.title?.toLowerCase() || '';
        // Show/hide based on whether the title includes the search text
        if (title.includes(searchText)) {
            movieElement.style.display = '';
            movieElement.style.opacity = '1';
        } else {
            movieElement.style.display = 'none';
            movieElement.style.opacity = '0';
        }
    });
};