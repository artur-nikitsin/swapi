window.onload = function () {

    document.querySelector("#nav-root-tab").addEventListener("click", getPeople, false)
    document.querySelector("#nav-people-tab").addEventListener("click", getPeople, false)
    document.querySelector("#nav-films-tab").addEventListener("click", getFilms, false)
    document.querySelector("#nav-starships-tab").addEventListener("click", getStarShips, false)
    document.querySelector("#nav-vehicles-tab").addEventListener("click", getVehicles, false)
    document.querySelector("#nav-species-tab").addEventListener("click", getSpecies, false)
    document.querySelector("#nav-planets-tab").addEventListener("click", getPlanets, false)


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


    function getPeople() {
        fetch("https://swapi.dev/api/people")
            .then(response =>
                response.json())

            .then(people => {


                let renderPeople = people.results.map(function (item, i) {


                    return (
                        `<div class="card bg-light border-dark mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent border-dark">
                                 <h5 class="card-title"> ${item.name}</h5>
                            </div>
                            
                          <div class="card-body text-dark">       
                                 <p class="card-text"><b>birth year:</b> ${item.birth_year}</p>         
                                 <p class="card-text"><b>gender:</b> ${item.gender}</p> 
                                 <p class="card-text"><b>height:</b> ${item.height}</p>
                                 <p class=""><b>mass:</b> ${item.mass}</p>
                                                     
                            </div>
                             
                            <div class="collapse" id="${item.name.split(" ").join("")}">
                                    <div class="card-body text-dark">
                                        <p class="card-text"><b>eye color:</b> ${item.eye_color}</p>
                                        <p class="card-text"><b>hair color:</b> ${item.hair_color}</p>           
                                        <p class="card-text"><b>skin color:</b> ${item.skin_color}</p>
                                    </div>
                            </div>
                             
                             
                            <div class="card-footer bg-transparent border-dark">
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
    }


    function getFilms() {
        fetch("https://swapi.dev/api/films")
            .then(response =>
                response.json())

            .then(films => {


                let renderFilms = films.results.map(function (item, i) {


                    return (
                        `<div class="card bg-light border-dark mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent border-dark">
                                 <h5 class="card-title"> ${item.title}</h5>
                            </div>
                            
                           
                             <div class="card-body text-dark">
                                <p class=""><b>release date:</b> ${item.release_date}</p>
                                <p class="card-text"><b>episode:</b> ${item.episode_id}</p>         
                                <p class="card-text"><b>director:</b> ${item.director}</p> 
                                <p class="card-text"><b>producer:</b> ${item.producer}</p>              
                            </div>
                            
                            
                            <div class="collapse" id="${item.title.split(" ").join("")}">
                                <div class="card-body">
                                    <p class="card-text"><b>opening crawl</b>: ${item.opening_crawl}</p>
                                </div>
                            </div>
                             
                            <div class="card-footer bg-transparent border-dark">
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
        fetch("https://swapi.dev/api/starships")
            .then(response =>
                response.json())

            .then(starships => {


                let renderStarships = starships.results.map(function (item, i) {


                    return (
                        `<div class="card bg-light border-dark mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent border-dark">
                                 <h5 class="card-title"> ${item.name}</h5>
                            </div>
                            
                           
                             <div class="card-body text-dark">
                                <p class=""><b>model:</b> ${item.model}</p>
                                <p class="card-text"><b>manufacturer:</b> ${item.manufacturer}</p>         
                                <p class="card-text"><b>cost in credits:</b> ${item.cost_in_credits}</p> 
                                <p class="card-text"><b>max atmosphering speed:</b> ${item.max_atmosphering_speed}</p>              
                            </div>
                            
                            
                            <div class="collapse" id="${item.name.split(" ").join("")}">
                                <div class="card-body">
                                    <p class="card-text"><b>length:</b> ${item.length}</p>
                                    <p class="card-text"><b>crew:</b> ${item.crew}</p>
                                    <p class="card-text"><b>passengers:</b> ${item.passengers}</p>
                                    <p class="card-text"><b>cargo_capacity:</b> ${item.cargo_capacity}</p>
                                    <p class="card-text"><b>oconsumables:</b> ${item.consumables}</p>
                                    <p class="card-text"><b>hyperdrive rating:</b> ${item.hyperdrive_rating}</p>
                                    <p class="card-text"><b>MGLT:</b> ${item.MGLT}</p>
                                    <p class="card-text"><b>starship class:</b> ${item.starship_class}</p>
                                </div>
                            </div>
                             
                            <div class="card-footer bg-transparent border-dark">
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
        fetch("https://swapi.dev/api/vehicles")
            .then(response =>
                response.json())

            .then(vehicles => {


                let renderVehicles = vehicles.results.map(function (item, i) {


                    return (
                        `<div class="card bg-light border-dark mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent border-dark">
                                 <h5 class="card-title"> ${item.name}</h5>
                            </div>
                            
                           
                             <div class="card-body text-dark">
                                <p class=""><b>model:</b> ${item.model}</p>
                                <p class="card-text"><b>manufacturer:</b> ${item.manufacturer}</p>         
                                <p class="card-text"><b>cost in credits:</b> ${item.cost_in_credits}</p> 
                                <p class="card-text"><b>max atmosphering speed:</b> ${item.max_atmosphering_speed}</p>              
                            </div>
                            
                            
                            <div class="collapse" id="${item.name.split(" ").join("")}">
                                <div class="card-body">
                                    <p class="card-text"><b>length:</b> ${item.length}</p>
                                    <p class="card-text"><b>crew:</b> ${item.crew}</p>
                                    <p class="card-text"><b>passengers:</b> ${item.passengers}</p>
                                    <p class="card-text"><b>cargo_capacity:</b> ${item.cargo_capacity}</p>
                                    <p class="card-text"><b>oconsumables:</b> ${item.consumables}</p>
                                </div>
                            </div>
                             
                            <div class="card-footer bg-transparent border-dark">
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
        fetch("https://swapi.dev/api/species")
            .then(response =>
                response.json())

            .then(species => {


                let renderSpecies = species.results.map(function (item, i) {


                    return (
                        `<div class="card bg-light border-dark mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent border-dark">
                                 <h5 class="card-title"> ${item.name}</h5>
                            </div>
                            
                           
                             <div class="card-body text-dark">
                                <p class=""><b>classification:</b> ${item.classification}</p>
                                <p class="card-text"><b>designation:</b> ${item.designation}</p>         
                                <p class="card-text"><b>language:</b> ${item.language}</p> 
                                <p class="card-text"><b>average lifespan:</b> ${item.average_lifespan}</p>              
                            </div>
                            
                            
                            <div class="collapse" id="${item.name.split(" ").join("")}">
                                <div class="card-body">
                                    <p class="card-text"><b>average height:</b> ${item.average_height}</p>
                                    <p class="card-text"><b>skin colors:</b> ${item.skin_colors}</p>
                                    <p class="card-text"><b>hair colors:</b> ${item.hair_colors}</p>
                                    <p class="card-text"><b>eye colors:</b> ${item.eye_colors}</p>
                                   
                                </div>
                            </div>
                             
                            <div class="card-footer bg-transparent border-dark">
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
        fetch("https://swapi.dev/api/planets")
            .then(response =>
                response.json())

            .then(planets => {


                let renderPlanets = planets.results.map(function (item, i) {


                    return (
                        `<div class="card bg-light border-dark mb-3" style="max-width: 18rem;">
                            <div class="card-header bg-transparent border-dark">
                                 <h5 class="card-title"> ${item.name}</h5>
                            </div>
                            
                           
                             <div class="card-body text-dark">
                                <p class=""><b>rotation period:</b> ${item.rotation_period}</p>
                                <p class="card-text"><b>orbital period:</b> ${item.orbital_period}</p>         
                                <p class="card-text"><b>diameter:</b> ${item.diameter}</p> 
                                <p class="card-text"><b>climate:</b> ${item.climate}</p>              
                            </div>
                            
                            
                            <div class="collapse" id="${item.name.split(" ").join("")}">
                                <div class="card-body">
                                    <p class="card-text"><b>gravity:</b> ${item.gravity}</p>
                                    <p class="card-text"><b>terrain:</b> ${item.terrain}</p>
                                    <p class="card-text"><b>surface water:</b> ${item.surface_water}</p>
                                    <p class="card-text"><b>population:</b> ${item.population}</p>
                                   
                                </div>
                            </div>
                             
                            <div class="card-footer bg-transparent border-dark">
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


