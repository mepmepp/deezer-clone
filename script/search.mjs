// Search functionality

/**
 * Handle search input and filter movies
 * @param {Event} event - The input event
 */
export const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    const movieElements = document.querySelectorAll('.movie');

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