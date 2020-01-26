const gallery = new Gallery();
const modal = new Modal();

// create search form and append it to the DOM
const form = document.createElement("form");
document.querySelector(".search-container").appendChild(form);
form.action = "#";
form.method = "GET";
form.innerHTML = `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
`;


gallery.cards
    .then(cards => {
        // set initial modal list
        modal.generateList(cards);

        // add event listener for each gallery entry
        cards.forEach(card => {
            card.node.addEventListener("click", (e) => {
                modal.node.style.display = "";
                modal.setModal(card.id)
            });
        })

        // add event listener to search form
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const search = form.querySelector("#search-input").value;

            if(search == "") {
                // reset to default modal list
                cards.forEach(card => card.node.style.display = "")
                modal.generateList(cards);
            } else {
                cards.forEach(result => {
                   new RegExp(`^${search}`, "i").test(result.name) ? result.node.style.display = "" : result.node.style.display = "none";
                })

                // filter modal list
                modal.generateList(cards);
            }
        })

 })