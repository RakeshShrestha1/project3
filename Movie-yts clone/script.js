
const apiUrl = 'https://yts.mx/api/v2/list_movies.json';


function fetchMovies(query) {
    const url = query ? `${apiUrl}?query_term=${query}` : apiUrl;

    
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
            return data.data.movies;
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function renderMovies(movies) {
    const movieGrid = document.getElementById('movieGrid');
    const loadingSpinner = document.getElementById('loadingSpinner');
    movieGrid.innerHTML = '';

  
    if (movies.length > 0) {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie-poster');

            const imgElement = document.createElement('img');
            imgElement.src = movie.medium_cover_image;
            imgElement.alt = movie.title;

           
            imgElement.addEventListener('click', () => showMovieDetails(movie));

            movieElement.appendChild(imgElement);
            movieGrid.appendChild(movieElement);
        });

        
        loadingSpinner.style.display = 'none';
    } else {
        loadingSpinner.innerText = 'No movies found.';
    }
}


function searchMovies() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    
    if (query) {
        const loadingSpinner = document.getElementById('loadingSpinner');
        loadingSpinner.style.display = 'block';

        fetchMovies(query)
            .then(movies => {
               
                console.log('Movies:', movies);
                renderMovies(movies);
                loadingSpinner.style.display = 'none';
            })
            .catch(error => {
                console.error('Error searching movies:', error);
                loadingSpinner.style.display = 'none';
            });
    }
}


function showMovieDetails(movie) {
    
    const modal = document.getElementById('movieDetailsModal');
    const modalContent = document.getElementById('movieDetailsContent');

    modalContent.innerHTML = '';

    const titleElement = document.createElement('h2');
    titleElement.textContent = movie.title;

    const yearElement = document.createElement('p');
    yearElement.textContent = `Year: ${movie.year}`;

    const ratingElement = document.createElement('p');
    ratingElement.textContent = `Rating: ${movie.rating}`;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = movie.description_full;

    
    modalContent.appendChild(titleElement);
    modalContent.appendChild(yearElement);
    modalContent.appendChild(ratingElement);
    modalContent.appendChild(descriptionElement);

    
    modal.style.display = 'block';
}


function closeMovieDetailsModal() {
   
    const modal = document.getElementById('movieDetailsModal');
    modal.style.display = 'none';
}


fetchMovies()
    .then(renderMovies)
    .catch(error => console.error('Error loading movies:', error));
