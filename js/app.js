const marvel = {
    render: () => {
      //1885b0934fd51deac92c0757364991f43103b1273e4d09ef563be400e2f27b6a006bae81c
      const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=e4d09ef563be400e2f27b6a006bae81c&hash=c2a442819b0f74be18f7612d2604915e';
      const container = document.querySelector('#marvel-row');
      let contentHTML = '';
      
  
      fetch(urlAPI)
      .then(res => res.json())
      .then((json) => {
        for (const hero of json.data.results) {
          let urlHero = hero.urls[0].url;
          contentHTML += `
            <div class="col-md-4">
                <a href="${urlHero}" target="_blank">
                  <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                </a>
                <h3 class="title">${hero.name}</h3>
            </div>`;
        }
        container.innerHTML = contentHTML;
      })
  }
};
marvel.render();