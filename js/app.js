const pokemon = {
  render: () => {
    const urlAPI = 'https://pokeapi.co/api/v2/pokemon?limit=151'; // Lista de Pokémon
    const container = document.querySelector('#pokemon-row');
    let contentHTML = '';

    fetch(urlAPI)
      .then(res => res.json())
      .then((json) => {
        json.results.forEach(pokemon => {
          const pokemonId = pokemon.url.split('/')[6]; // ID del Pokémon
          const urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

          // Generar contenedor de cada Pokémon
          contentHTML += `
            <div class="col-md-4 pokemon-card" data-id="${pokemonId}">
              <img src="${urlImage}" alt="${pokemon.name}" class="img-thumbnail pokemon-img">
              <h3 class="title">${pokemon.name}</h3>
              <div class="pokemon-stats card bg-light" style="display: none;">
                <div class="card-body">
                  <h5 class="card-title">${pokemon.name.toUpperCase()}</h5>
                  <div class="stats-container"></div> <!-- Contenedor para evitar duplicados -->
                </div>
              </div>
            </div>`;
        });

        container.innerHTML = contentHTML;

        // Añadir eventos de hover para mostrar las estadísticas
        const cards = document.querySelectorAll('.pokemon-card');
        cards.forEach(card => {
          const pokemonId = card.dataset.id;
          const statsContainer = card.querySelector('.stats-container');
          const statsCard = card.querySelector('.pokemon-stats');

          // Evento: mostrar estadísticas al colocar el cursor
          card.addEventListener('mouseover', () => {
            if (!statsContainer.dataset.loaded) { // Solo cargar si no está cargado
              fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
                .then(res => res.json())
                .then(json => {
                  const statsHTML = json.stats.map(stat => `
                    <p><strong>${stat.stat.name}:</strong> ${stat.base_stat}</p>
                  `).join('');
                  statsContainer.innerHTML = statsHTML;
                  statsContainer.dataset.loaded = "true"; // Marcar como cargado
                })
                .catch(err => console.error('Error loading stats:', err));
            }
            statsCard.style.display = 'block';
          });

          // Evento: ocultar estadísticas al quitar el cursor
          card.addEventListener('mouseout', () => {
            statsCard.style.display = 'none';
          });
        });
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        container.innerHTML = `<p>Error loading Pokémon data.</p>`;
      });
  }
};

pokemon.render();
