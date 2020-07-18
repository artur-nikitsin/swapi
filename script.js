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

        if (response.count > 10) {

            let paginator = ` <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item ${response.previous ? "" : "disabled"}"><a class="page-link" href="${response.previous}" data-tab="${tab}">Previous</a></li>
                <li class="page-item ${response.next ? "" : "disabled"}"><a class="page-link" href="${response.next}" data-tab="${tab}">Next</a></li>
            </ul>
        </nav>`;

            document.querySelector(".pagination-bar").innerHTML = paginator;

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

            switch (currentTab) {
                case "people":

                    if (checkLocalStorage(nextPage)) {

                        let page = getFromLocalStorage(nextPage);
                        renderPeople(page);
                        addPaginator(page, "people");
                    } else {
                        fetchGetPeople(nextPage)
                    }
                    break;

                case "films":
                    if (checkLocalStorage(nextPage)) {

                        let page = getFromLocalStorage(nextPage);
                        renderFilms(page);
                        addPaginator(page, "films");
                    } else {
                        fetchGetFilms(nextPage)
                    }
                    break;
                case "starships":

                    if (checkLocalStorage(nextPage)) {
                        let page = getFromLocalStorage(nextPage);
                        renderStarships(page);
                        addPaginator(page, "starships");
                    } else {
                        fetchStarShips(nextPage)
                    }
                    break;

                case "vehicles":
                    if (checkLocalStorage(nextPage)) {
                        let page = getFromLocalStorage(nextPage);
                        renderVehicles(page);
                        addPaginator(page, "vehicles");
                    } else {
                        fetchVehicles(nextPage)
                    }
                    break;
                case "species":
                    if (checkLocalStorage(nextPage)) {
                        let page = getFromLocalStorage(nextPage);
                        renderSpecies(page);
                        addPaginator(page, "species");
                    } else {
                        fetchSpecies(nextPage)
                    }
                    break;
                case "planets":
                    if (checkLocalStorage(nextPage)) {
                        let page = getFromLocalStorage(nextPage);
                        renderPlanets(page);
                        addPaginator(page, "planets");
                    } else {
                        fetchPlanets(nextPage);
                    }
                    break;
            }
        }
    }


    function checkLocalStorage(tab) {
        let requestTab = localStorage.getItem(tab);
        if (requestTab) {
            return true;
        } else {
            return false
        }
    }

    function setToLocalStorage(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    }

    function getFromLocalStorage(page) {

        let pageFromLocalStorage = JSON.parse(localStorage.getItem(page));

        return pageFromLocalStorage
    }


    function onFetchError(tab, message) {

        let warning = `<div class="alert alert-danger" role="alert">
                          ${message}
                      </div>`
        document.querySelector(tab).innerHTML = warning;
        document.querySelector(".pagination").innerHTML = "";
    }


    function findActiveTab() {
        let activeTab = document.querySelector("div.tab-content  div.active");

        return activeTab.id;
    }


    let searchPanel = document.querySelector(".search-button");
    searchPanel.addEventListener("click", searchByName, false);

    function searchByName(e) {
        e.preventDefault();
        let searchRequest = document.querySelector(".search-input").value;

        let currentActiveTab = findActiveTab();

        let resource = currentActiveTab.substr(4);

        fetchSearchRequest(searchRequest, resource);
    }


    function fetchSearchRequest(req, resource) {

        let searchUrl = `https://swapi.dev/api/${resource}/?search=`;
        fetch(searchUrl + req)
            .then(response => {
                let answer = response.json();
                return answer;

            })
            .then(answer => {
                renderSearchResults(answer,resource)
            })

    };


    function renderSearchResults(result, tab) {

        let currentActiveTab = findActiveTab();

        switch (currentActiveTab) {
            case "nav-people":
                addPreloader("#nav-people");
                renderPeople(result);
                addPaginator(result, tab);
                break;
            case "nav-films":
                addPreloader("#nav-films");
                renderFilms(result);
                addPaginator(result, tab);
                break;
            case "nav-starships":
                addPreloader("#nav-starships");
                renderStarships(result);
                addPaginator(result, tab);
                break;
            case "nav-vehicles":
                addPreloader("#nav-vehicles");
                renderVehicles(result);
                addPaginator(result, tab);
                break;
            case "nav-species":
                addPreloader("#nav-species");
                renderSpecies(result);
                addPaginator(result, tab);
                break;
            case "nav-planets":
                addPreloader("#nav-planets");
                renderPlanets(result);
                addPaginator(result, tab);
                break
        }
    }


    function clearSearchInput() {
        document.querySelector(".search-input").value="";
    }



    function getPeople() {
        clearSearchInput();
        addPreloader("#nav-people");

        if (checkLocalStorage("https://swapi.dev/api/people")) {
            let page = getFromLocalStorage("https://swapi.dev/api/people");
            renderPeople(page);
            addPaginator(page, "people");
        } else {
            fetchGetPeople();
        }

    };


    function fetchGetPeople(url) {

        let currentUrl = url ? url : "https://swapi.dev/api/people";

        fetch(currentUrl)
            .then(response => {
                if (response.ok) {
                    let result = response.json();
                    return result;
                } else {
                    throw new Error(`on loading page. Error code: ${response.status}`)
                }
            })

            .then(people => {
                renderPeople(people);
                addPaginator(people, "people");

                if (!checkLocalStorage(currentUrl)) {
                    setToLocalStorage(currentUrl, people);
                }
            })
            .catch(error =>
                onFetchError("#nav-people", error)
            )


    };


    function renderPeople(people) {

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

        document.querySelector("#nav-people").innerHTML = renderPeople.join("");
        addShowMoreButton();
    }


    function getFilms() {
        clearSearchInput();
        addPreloader("#nav-films");

        if (checkLocalStorage("https://swapi.dev/api/films")) {
            let page = getFromLocalStorage("https://swapi.dev/api/films");
            renderFilms(page);
            addPaginator(page, "films");
        } else {
            fetchGetFilms();
        }
    }


    function fetchGetFilms(url) {

        let currentUrl = url ? url : "https://swapi.dev/api/films";

        fetch(currentUrl)
            .then(response => {
                if (response.ok) {
                    let result = response.json();
                    return result;
                } else {
                    throw new Error(`on loading page. Error code: ${response.status}`)
                }
            })

            .then(films => {
                renderFilms(films);
                addPaginator(films, "films");

                if (!checkLocalStorage(currentUrl)) {
                    setToLocalStorage(currentUrl, films);
                }
            })
            .catch(error =>
                onFetchError("#nav-films", error)
            )
    }


    function renderFilms(films) {

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
        document.querySelector("#nav-films").innerHTML = renderFilms.join("");
        addShowMoreButton();
    }


    function getStarShips() {
        clearSearchInput();
        addPreloader("#nav-starships");

        if (checkLocalStorage("https://swapi.dev/api/starships")) {
            let page = getFromLocalStorage("https://swapi.dev/api/starships");
            renderStarships(page);
            addPaginator(page, "starships");
        } else {
            fetchStarShips();
        }

    }


    function fetchStarShips(url) {

        let currentUrl = url ? url : "https://swapi.dev/api/starships";

        fetch(currentUrl)
            .then(response => {
                if (response.ok) {
                    let result = response.json();
                    return result;
                } else {
                    throw new Error(`on loading page. Error code: ${response.status}`)
                }
            })

            .then(starships => {
                renderStarships(starships);
                addPaginator(starships, "starships");

                if (!checkLocalStorage(currentUrl)) {
                    setToLocalStorage(currentUrl, starships);
                }
            })
            .catch(error =>
                onFetchError("#nav-starships", error)
            )
    }


    function renderStarships(starships) {

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
        document.querySelector("#nav-starships").innerHTML = renderStarships.join("");
        addShowMoreButton();
    }


    function getVehicles() {
        clearSearchInput();
        addPreloader("#nav-vehicles");

        if (checkLocalStorage("https://swapi.dev/api/vehicles")) {
            let page = getFromLocalStorage("https://swapi.dev/api/vehicles");
            renderVehicles(page);
            addPaginator(page, "vehicles");
        } else {
            fetchVehicles();
        }
    }


    function fetchVehicles(url) {

        let currentUrl = url ? url : "https://swapi.dev/api/vehicles";

        fetch(currentUrl)
            .then(response => {
                if (response.ok) {
                    let result = response.json();
                    return result;
                } else {
                    throw new Error(`on loading page. Error code: ${response.status}`)
                }
            })

            .then(vehicles => {
                renderVehicles(vehicles);
                addPaginator(vehicles, "vehicles");

                if (!checkLocalStorage(currentUrl)) {
                    setToLocalStorage(currentUrl, vehicles);
                }
            })
            .catch(error =>
                onFetchError("#nav-vehicles", error)
            )
    }


    function renderVehicles(vehicles) {
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
        document.querySelector("#nav-vehicles").innerHTML = renderVehicles.join("");
        addShowMoreButton();
    }


    function getSpecies() {
        clearSearchInput();
        addPreloader("#nav-species");

        if (checkLocalStorage("https://swapi.dev/api/species")) {
            let page = getFromLocalStorage("https://swapi.dev/api/species");
            renderSpecies(page);
            addPaginator(page, "species");
        } else {
            fetchSpecies();
        }
    }


    function fetchSpecies(url) {

        let currentUrl = url ? url : "https://swapi.dev/api/species";

        fetch(currentUrl)
            .then(response => {
                if (response.ok) {
                    let result = response.json();
                    return result;
                } else {
                    throw new Error(`on loading page. Error code: ${response.status}`)
                }
            })

            .then(species => {
                renderSpecies(species);
                addPaginator(species, "species");

                if (!checkLocalStorage(currentUrl)) {
                    setToLocalStorage(currentUrl, species);
                }
            })
            .catch(error =>
                onFetchError("#nav-species", error)
            )
    }


    function renderSpecies(species) {
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
        document.querySelector("#nav-species").innerHTML = renderSpecies.join("");
        addShowMoreButton();
    }


    function getPlanets() {
        clearSearchInput();
        addPreloader("#nav-planets");

        if (checkLocalStorage("https://swapi.dev/api/planets")) {
            let page = getFromLocalStorage("https://swapi.dev/api/planets");
            renderPlanets(page);
            addPaginator(page, "planets");
        } else {
            fetchPlanets();
        }
    }


    function fetchPlanets(url) {

        let currentUrl = url ? url : "https://swapi.dev/api/planets";

        fetch(currentUrl)
            .then(response => {
                if (response.ok) {
                    let result = response.json();
                    return result;
                } else {
                    throw new Error(`on loading page. Error code: ${response.status}`)
                }
            })

            .then(planets => {
                renderPlanets(planets);
                addPaginator(planets, "planets");

                if (!checkLocalStorage(currentUrl)) {
                    setToLocalStorage(currentUrl, planets);
                }
            })
            .catch(error =>
                onFetchError("#nav-planets", error)
            )
    }

    function renderPlanets(planets) {
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
        document.querySelector("#nav-planets").innerHTML = renderPlanets.join("");
        addShowMoreButton();
    }


}


