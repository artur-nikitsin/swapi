window.onload = function () {

    document.querySelector("#nav-root-tab").addEventListener("click", getPeople, false)
    document.querySelector("#nav-people-tab").addEventListener("click", getPeople, false)
    document.querySelector("#nav-films-tab").addEventListener("click", getPeople, false)
    document.querySelector("#nav-starships-tab").addEventListener("click", getPeople, false)
    document.querySelector("#nav-vehicles-tab").addEventListener("click", getPeople, false)
    document.querySelector("#nav-species-tab").addEventListener("click", getPeople, false)
    document.querySelector("#nav-planets-tab").addEventListener("click", getPeople, false)

    function getPeople() {
        fetch("https://swapi.dev/api/people")
            .then(response =>
                response.json())

            .then(people => {


                let renderPeople = people.results.map(function (item, i) {

                    return (
                        `<div class="card bg-light mb-3" style="max-width: 18rem;">
                        <div class="card-header">
                         <h5 class="card-title">${item.name}</h5>
                         </div>
                        <div class="card-body">
                        <h5 class="card-title"></h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    </div>`)

                });
                return renderPeople;
            })

            .then(renderPeople => {

                document.querySelector("#nav-people").innerHTML = renderPeople.join("")
            })
    }


}