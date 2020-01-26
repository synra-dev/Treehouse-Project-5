class Card {
    constructor(id, json) {
        // set id that will identify each entry
        this.id = id;
        this.json = json.results[0];
        this.name = `${this.json.name.first} ${this.json.name.last}`;
        this.node = this.createNode();
    }

    // generate html element for the gallery entry
    generateHTML() {
        const img = this.json.picture.thumbnail;
        const email = this.json.email;
        const location = this.json.location;

        const html = `
        <div class="card-img-container">
            <img class="card-img" src="${img}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${this.name}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${location.city}, ${location.state}</p>
        </div>
        `;

        return html
    }

    // create the node
    createNode() {
        const div = document.createElement("div");
        div.className = "card";
        div.dataset.id = this.id;
        div.innerHTML = this.generateHTML();

        return div;
    }
}