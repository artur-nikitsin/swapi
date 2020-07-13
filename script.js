window.onload = function () {


    document.querySelector("#nav-people-tab").addEventListener("click", getPeople, false)
    document.querySelector("#nav-films-tab").addEventListener("click", getFilms, false)
    document.querySelector("#nav-starships-tab").addEventListener("click", getStarShips, false)
    document.querySelector("#nav-vehicles-tab").addEventListener("click", getVehicles, false)
    document.querySelector("#nav-species-tab").addEventListener("click", getSpecies, false)
    document.querySelector("#nav-planets-tab").addEventListener("click", getPlanets, false)


    getPeople();

    function addShowMoreButton() {

        let collapseButtons = document.querySelectorAll(".showMoreLessButton");

        [].forEach.call(collapseButtons, function (button) {
            button.addEventListener("click", changeButtonText, false);
        });

        function changeButtonText() {

            let currentButton = this;

            if (currentButton.textContent === "More...") {
                currentButton.innerText = "Less"
            } else {
                currentButton.innerText = "More..."
            }
        }
    };


    function addPreloader(currentTabId) {

        if (currentTabId) {

            let currentTab = document.querySelector(currentTabId);

            let preloader = `<div class="spinner-border text-success" role="status">
                             <span class="sr-only">Loading...</span>
                             </div>`;

            currentTab.innerHTML = preloader;

        }
    };

    addPreloader();


    function addPaginator(response, tab) {

        console.log(response.count);

        if (response.count > 10) {

            let paginator = ` <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item ${response.previous ? "" : "disabled"}"><a class="page-link" href="${response.previous}" data-tab="${tab}">Previous</a></li>
                <!--<li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>-->
                <li class="page-item ${response.next ? "" : "disabled"}"><a class="page-link" href="${response.next}" data-tab="${tab}">Next</a></li>
            </ul>
        </nav>`;

            document.querySelector(".pagination").innerHTML = paginator;

            let pages = document.querySelectorAll(".page-link");

            [].forEach.call(pages, function (page) {
                page.addEventListener("click", moveToAnotherPage, false);
            });

        } else {
            document.querySelector(".pagination").innerHTML = "";
        }
    };


    function moveToAnotherPage(e) {
        e.preventDefault();
        let _this = this;
        let nextPage = _this.getAttribute("href");

        if (nextPage !== "null") {


            let currentTab = _this.getAttribute("data-tab")

            console.log(nextPage);
            switch (currentTab) {
                case "people":
                    fetchGetPeople(nextPage);
                    break;
                case "films":
                    fetchGetFilms(nextPage);
                    break;
                case "starships":
                    fetchStarShips(nextPage);
                    break;
                case "vehicles":
                    fetchVehicles(nextPage);
                    break;
                case "species":
                    fetchSpecies(nextPage);
                    break;
                case "planets":
                    fetchPlanets(nextPage);
                    break;
            }
        }
    }


    function getPeople() {

        addPreloader("#nav-people");

        fetchGetPeople();
    };


    function fetchGetPeople(url) {

        let currentUrl = url ? url : "https://swapi.dev/api/people";

        fetch(currentUrl)
            .then(response =>
                response.json())

            .then(people => {

                addPaginator(people, "people");

                let renderPeople = people.results.map(function (item, i) {

                    return (
                        `<div class="card bg-light border-success mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent border-success">
                                 <h5 class="card-title"> ${item.name}</h5>
                            </div>
                            
                          <div class="card-body text-dark">       
                                 <p class="card-text"><b>Birth year:</b> ${item.birth_year}</p>         
                                 <p class="card-text"><b>Gender:</b> ${item.gender}</p> 
                                 <p class="card-text"><b>Height:</b> ${item.height}</p>
                                 <p class=""><b>Mass:</b> ${item.mass}</p>
                                                     
                            </div>
                             
                            <div class="collapse" id="${item.name.split(" ").join("")}">
                                    <div class="card-body text-dark">
                                        <p class="card-text"><b>Eye color:</b> ${item.eye_color}</p>
                                        <p class="card-text"><b>Hair color:</b> ${item.hair_color}</p>           
                                        <p class="card-text"><b>Skin color:</b> ${item.skin_color}</p>
                                    </div>
                            </div>
                             
                             
                            <div class="card-footer bg-transparent border-success">
                                <a class=" btn btn-link showMoreLessButton" data-toggle="collapse" 
                                href="${"#" + item.name.split(" ").join("")}" role="button" aria-expanded="false" 
                                aria-controls="collapseExample">More...</a>
                            </div>
                             
                         </div>`)

                });
                return renderPeople;
            })

            .then(renderPeople => {
                document.querySelector("#nav-people").innerHTML = renderPeople.join("");
                addShowMoreButton();
            })
    };


    function getFilms() {

        addPreloader("#nav-films");

        fetchGetFilms();
    }


    function fetchGetFilms(url) {

        let currentUrl = url ? url : "https://swapi.dev/api/films";

        fetch(currentUrl)
            .then(response =>
                response.json())

            .then(films => {

                addPaginator(films, "films");

                let renderFilms = films.results.map(function (item, i) {


                    return (
                        `<div class="card bg-light border-success mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent border-success">
                                 <h5 class="card-title"> ${item.title}</h5>
                            </div>
                            
                           
                             <div class="card-body text-dark">
                                <p class=""><b>Release date:</b> ${item.release_date}</p>
                                <p class="card-text"><b>Episode:</b> ${item.episode_id}</p>         
                                <p class="card-text"><b>Director:</b> ${item.director}</p> 
                                <p class="card-text"><b>Producer:</b> ${item.producer}</p>              
                            </div>
                            
                            
                            <div class="collapse" id="${item.title.split(" ").join("")}">
                                <div class="card-body">
                                    <p class="card-text"><b>Opening crawl</b>: ${item.opening_crawl}</p>
                                </div>
                            </div>
                             
                            <div class="card-footer bg-transparent border-success">
                                <a class=" btn btn-link showMoreLessButton" data-toggle="collapse" 
                                href="${"#" + item.title.split(" ").join("")}" role="button" aria-expanded="false" 
                                aria-controls="collapseExample">More...</a>
                            </div>
                             
                         </div>`)

                });
                return renderFilms;
            })

            .then(renderFilms => {
                document.querySelector("#nav-films").innerHTML = renderFilms.join("");
                addShowMoreButton();
            })
    }


    function getStarShips() {

        addPreloader("#nav-starships");

        fetchStarShips();
    }

    function fetchStarShips(url) {

        let currentUrl = url ? url : "https://swapi.dev/api/starships";

        fetch(currentUrl)
            .then(response =>
                response.json())

            .then(starships => {

                addPaginator(starships, "starships");

                let renderStarships = starships.results.map(function (item, i) {


                    return (
                        `<div class="card bg-light border-success mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent border-success">
                                 <h5 class="card-title"> ${item.name}</h5>
                            </div>
                            
                           
                             <div class="card-body text-dark">
                                <p class=""><b>Model:</b> ${item.model}</p>
                                <p class="card-text"><b>Manufacturer:</b> ${item.manufacturer}</p>         
                                <p class="card-text"><b>Cost in credits:</b> ${item.cost_in_credits}</p> 
                                <p class="card-text"><b>Max atmosphering speed:</b> ${item.max_atmosphering_speed}</p>              
                            </div>
                            
                            
                            <div class="collapse" id="${item.name.split(" ").join("")}">
                                <div class="card-body">
                                    <p class="card-text"><b>Length:</b> ${item.length}</p>
                                    <p class="card-text"><b>Crew:</b> ${item.crew}</p>
                                    <p class="card-text"><b>Passengers:</b> ${item.passengers}</p>
                                    <p class="card-text"><b>Cargo capacity:</b> ${item.cargo_capacity}</p>
                                    <p class="card-text"><b>Oconsumables:</b> ${item.consumables}</p>
                                    <p class="card-text"><b>Hyperdrive rating:</b> ${item.hyperdrive_rating}</p>
                                    <p class="card-text"><b>MGLT:</b> ${item.MGLT}</p>
                                    <p class="card-text"><b>Starship class:</b> ${item.starship_class}</p>
                                </div>
                            </div>
                             
                            <div class="card-footer bg-transparent border-success">
                                <a class=" btn btn-link showMoreLessButton" data-toggle="collapse" 
                                href="${"#" + item.name.split(" ").join("")}" role="button" aria-expanded="false" 
                                aria-controls="collapseExample">More...</a>
                            </div>
                             
                         </div>`)

                });
                return renderStarships;
            })

            .then(renderStarships => {
                document.querySelector("#nav-starships").innerHTML = renderStarships.join("");
                addShowMoreButton();
            })
    }


    function getVehicles() {

        addPreloader("#nav-vehicles");

        fetchVehicles();
    }


    function fetchVehicles(url) {

        let currentUrl = url ? url : "https://swapi.dev/api/vehicles";

        fetch(currentUrl)
            .then(response =>
                response.json())

            .then(vehicles => {

                addPaginator(vehicles, "vehicles");
                let renderVehicles = vehicles.results.map(function (item, i) {


                    return (
                        `<div class="card bg-light border-success mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent border-success">
                                 <h5 class="card-title"> ${item.name}</h5>
                            </div>
                            
                           
                             <div class="card-body text-dark">
                                <p class=""><b>Model:</b> ${item.model}</p>
                                <p class="card-text"><b>Manufacturer:</b> ${item.manufacturer}</p>         
                                <p class="card-text"><b>Cost in credits:</b> ${item.cost_in_credits}</p> 
                                <p class="card-text"><b>Max atmosphering speed:</b> ${item.max_atmosphering_speed}</p>              
                            </div>
                            
                            
                            <div class="collapse" id="${item.name.split(" ").join("")}">
                                <div class="card-body">
                                    <p class="card-text"><b>Length:</b> ${item.length}</p>
                                    <p class="card-text"><b>Crew:</b> ${item.crew}</p>
                                    <p class="card-text"><b>Passengers:</b> ${item.passengers}</p>
                                    <p class="card-text"><b>Cargo capacity:</b> ${item.cargo_capacity}</p>
                                    <p class="card-text"><b>Oconsumables:</b> ${item.consumables}</p>
                                </div>
                            </div>
                             
                            <div class="card-footer bg-transparent border-success">
                                <a class=" btn btn-link showMoreLessButton" data-toggle="collapse" 
                                href="${"#" + item.name.split(" ").join("")}" role="button" aria-expanded="false" 
                                aria-controls="collapseExample">More...</a>
                            </div>
                             
                         </div>`)

                });
                return renderVehicles;
            })

            .then(renderVehicles => {
                document.querySelector("#nav-vehicles").innerHTML = renderVehicles.join("");
                addShowMoreButton();
            })
    }


    function getSpecies() {

        addPreloader("#nav-species");

        fetchSpecies();
    }


    function fetchSpecies(url) {

        let currentUrl = url ? url : "https://swapi.dev/api/species";

        fetch(currentUrl)
            .then(response =>
                response.json())

            .then(species => {

                addPaginator(species, "species");
                let renderSpecies = species.results.map(function (item, i) {


                    return (
                        `<div class="card bg-light border-success mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent border-success">
                                 <h5 class="card-title"> ${item.name}</h5>
                            </div>
                            
                           
                             <div class="card-body text-dark">
                                <p class=""><b>Classification:</b> ${item.classification}</p>
                                <p class="card-text"><b>Designation:</b> ${item.designation}</p>         
                                <p class="card-text"><b>Language:</b> ${item.language}</p> 
                                <p class="card-text"><b>Average lifespan:</b> ${item.average_lifespan}</p>              
                            </div>
                            
                            
                            <div class="collapse" id="${item.name.split(" ").join("")}">
                                <div class="card-body">
                                    <p class="card-text"><b>Average height:</b> ${item.average_height}</p>
                                    <p class="card-text"><b>Skin colors:</b> ${item.skin_colors}</p>
                                    <p class="card-text"><b>Hair colors:</b> ${item.hair_colors}</p>
                                    <p class="card-text"><b>Eye colors:</b> ${item.eye_colors}</p>
                                   
                                </div>
                            </div>
                             
                            <div class="card-footer bg-transparent border-success">
                                <a class=" btn btn-link showMoreLessButton" data-toggle="collapse" 
                                href="${"#" + item.name.split(" ").join("")}" role="button" aria-expanded="false" 
                                aria-controls="collapseExample">More...</a>
                            </div>
                             
                         </div>`)

                });
                return renderSpecies;
            })

            .then(renderSpecies => {
                document.querySelector("#nav-species").innerHTML = renderSpecies.join("");
                addShowMoreButton();
            })
    }


    function getPlanets() {

        addPreloader("#nav-planets");

        fetchPlanets();
    }


    function fetchPlanets(url) {

        let currentUrl = url ? url : "https://swapi.dev/api/planets";

        fetch(currentUrl)
            .then(response =>
                response.json())

            .then(planets => {
                addPaginator(planets, "planets");

                let renderPlanets = planets.results.map(function (item, i) {


                    return (
                        `<div class="card bg-light border-success mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent border-success">
                                 <h5 class="card-title"> ${item.name}</h5>
                            </div>
                            
                           
                             <div class="card-body text-dark">
                                <p class=""><b>Rotation period:</b> ${item.rotation_period}</p>
                                <p class="card-text"><b>Orbital period:</b> ${item.orbital_period}</p>         
                                <p class="card-text"><b>Diameter:</b> ${item.diameter}</p> 
                                <p class="card-text"><b>Climate:</b> ${item.climate}</p>              
                            </div>
                            
                            
                            <div class="collapse" id="${item.name.split(" ").join("")}">
                                <div class="card-body">
                                    <p class="card-text"><b>Gravity:</b> ${item.gravity}</p>
                                    <p class="card-text"><b>Terrain:</b> ${item.terrain}</p>
                                    <p class="card-text"><b>Surface water:</b> ${item.surface_water}</p>
                                    <p class="card-text"><b>Population:</b> ${item.population}</p>
                                   
                                </div>
                            </div>
                             
                            <div class="card-footer bg-transparent border-success">
                                <a class=" btn btn-link showMoreLessButton" data-toggle="collapse" 
                                href="${"#" + item.name.split(" ").join("")}" role="button" aria-expanded="false" 
                                aria-controls="collapseExample">More...</a>
                            </div>
                             
                         </div>`)

                });
                return renderPlanets;
            })

            .then(renderPlanets => {
                document.querySelector("#nav-planets").innerHTML = renderPlanets.join("");
                addShowMoreButton();
            })
    }
}


