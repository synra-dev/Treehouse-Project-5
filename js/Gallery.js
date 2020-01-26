class Gallery {
    constructor() {
        this.url = "https://randomuser.me/api/";
        // generate the list of gallery entries
        this.cards = this.generateCards(15);
        this.node = document.getElementById("gallery");

        // append entries on instantation
        this.appendCards();
    }

    // function that will append each entries to the gallery node
    async appendCards() {
        const cards = await this.cards;
        cards.forEach(card => {
            this.node.appendChild(card.node);
        })
    }

    // generate a specified number of gallery entries
    generateCards(num = 12) {
        let fetchArr = [];
        for(let i = 0; i < num; i++) fetchArr.push(this.fetchData(this.url));

        return Promise.all(fetchArr)
                .then(cards => {
                    return cards.map((card, i, arr) => new Card(i, card));
                })
                .catch(err => console.error("Something went wrong", err));
    }

    checkStatus(response) {
        return response.ok ? Promise.resolve(response) : Promise.reject(new Error(response.status));
    }

    /*
     * Make a async function that will fetch new json data
     * filter each search to accept only entries that has valid Nationality
    */
    async fetchData(url) {
        try {
            const countries = [
                "United States", "Canada",
                "Australia", "United Kingdom",
                "Singapore", "New Zealand",
                "Spain", "Norway",
                "Denmark", "Finland",
                "Ireland", "Germany",
                "Brazil", "France",
                "Turkey", "Netherlands",
                "Switzerland"
            ];
    
            const response = await fetch(url);
            const reqStatus = await this.checkStatus(response);
            const responseJSON = await reqStatus.json();
            const personCountry = responseJSON.results[0].location.country;
    
            return countries.find(country => personCountry == country) ? responseJSON : this.fetchData(url);
        } catch(err) {
            throw err;
        }
    }
}