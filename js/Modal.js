class Modal {
    constructor() {
        this.node = this.createNode();
        this.list = [];
        this.current = null;
    }

    // generate a new list for the modal
    generateList(cards) {
        this.list = cards.filter(card => card.node.style.display !== "none");
    }

    // show next img on list when this function is called
    nextImg() {
        const i = this.list.indexOf(this.current) + 1;
        this.setModal(this.list[i].id);
    }

    // show prev img on list when this function is called
    prevImg() {
        const i = this.list.indexOf(this.current) - 1;
        this.setModal(this.list[i].id);
    }

    /*
     * Accept a single arguement `id` that will be used for finding the item in the modal list
     * generate html element that will be shown when a user clicked an gallery entry
    */
    setModal(id) {
        this.current = this.list.find(card => id == card.id);
        const json = this.current.json;
        const fullname = `${json.name.first} ${json.name.last}`;
        const location = json.location;
        let bdate = new Date(json.dob.date);
        bdate = `${bdate.getMonth()}/${bdate.getDate()}/${bdate.getFullYear()}`;

        let html = `<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${json.picture.medium}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${fullname}</h3>
            <p class="modal-text">${json.email}</p>
            <p class="modal-text cap">${location.city}</p>
            <hr>
            <p class="modal-text">${json.cell}</p>
            <p class="modal-text">${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}</p>
            <p class="modal-text">Birthday: ${bdate}</p>
        </div>
        </div>

        <div class="modal-btn-container">`;
        
        if(this.list.indexOf(this.current) == 0) {
           html += '<button type="button" id="modal-prev" class="modal-prev btn" style="display: none">Prev</button>';
        } else {
            html += '<button type="button" id="modal-prev" class="modal-prev btn" style="display: block;">Prev</button>';
        }
        
        if(this.list.indexOf(this.current) == this.list.length - 1) {
           html += '<button type="button" id="modal-next" class="modal-next btn" style="display: none">Next</button>';
        } else {
            html+= '<button type="button" id="modal-next" class="modal-next btn" style="display: \"\";">Next</button>';
        }
        html += "</div>";
    
        this.node.innerHTML = html;
    }

    // create the modal node and event listener that will display the modal when clicked
    createNode() {
        const div = document.createElement("div");
        div.className = "modal-container";
        div.style.display = "none";

        div.addEventListener("click", (e) => {
            if(e.target.textContent === "X") {
                div.style.display = "none";
            } else if(e.target.id === "modal-prev") {
                this.prevImg();
            } else if(e.target.id === "modal-next") {
                this.nextImg();
            }
        });

        document.body.appendChild(div);
        return div;
    }
}