document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mouseover', (event) => {
        const poster = event.target.closest('.movie-poster');
        if (poster) {
            const title = poster.getAttribute('alt');
            console.log(`You are hovering over: ${title}`);
            displayInfoBox(title); // Function to display additional info
        }
    });

    document.addEventListener('mouseout', (event) => {
        const poster = event.target.closest('.movie-poster');
        if (poster) {
            console.log('You stopped hovering over the movie poster.');
        }
    });
});

const displayInfoBox = () => {
    
}