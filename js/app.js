const gallery = document.getElementById("gallery");
const url = "https://randomuser.me/api/";

/*
 * Callback function to generate html elements on jsonArr retrieve from Promise
 * returns the node list after generating array
*/
function generateHTML(jsonArr) {
    const nodeList = [];
    jsonArr.forEach((json, i, arr) => {
        const data = json.results[0];
        const div = document.createElement("div");
        div.className = "card";
        div.dataset.id = i;
        div.innerHTML = `
        <div class="card-img-container">
            <img class="card-img" src="${data.picture.thumbnail}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
        </div>
        `;

        nodeList.push(div);
    });

    return [nodeList, jsonArr];
}

// Checks fetch response status
function checkStatus(response) {
    return response.ok ? Promise.resolve(response) : Promise.reject(new Error(response.status));
}

async function fetchData(url) {
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
        const reqStatus = await checkStatus(response);
        const responseJSON = await reqStatus.json();
        const personCountry = responseJSON.results[0].location.country;

        return countries.find(country => personCountry == country) ? responseJSON : fetchData(url);
    } catch(err) {
        throw err;
    }

}

let fetchArr = [];
for(let i = 0; i < 3; i++) fetchArr.push(fetchData(url));

gallery.innerHTML = "Please Wait! Retrieving data from the server...";

Promise.all(fetchArr)
    .then(jsonArr => {
        gallery.innerHTML = "";
        return generateHTML(jsonArr);
    })
    .then(res => {

    })
    .catch(err => console.error("A problem was encountered with your request", err));

/* --------------------------------------[Modal Script]-------------------------------------- */
const modalCntnr = document.createElement("div");
modalCntnr.className = "modal-container";
modalCntnr.display = "none";
modalCntnr.addEventListener("click", function(e) {
    if(e.target.id === "modal-close-btn") {
        this.style.display = "none";
    } else if(e.target.id === "modal-prev") {
        this.innerHTML = setModal(json)
    }
});

function setModal(json) {
    const location = json.location;
    const fullname = `${json.first} ${json.last}`;
    let bdate = new Date(json.dob.date);
    bdate = `${bdate.getMonth()}/${bdate.getDate()}/${bdate.getFullYear()}`;
    const html = `<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${json.picture.thumbnail}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${fullname}</h3>
        <p class="modal-text">${json.email}</p>
        <p class="modal-text cap">${location.city}</p>
        <hr>
        <p class="modal-text">${json.cell}</p>
        <p class="modal-text">${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}</p>
        <p class="modal-text">Birthday: ${bdate}</p>
    </div>
    </div>

    <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>`

    return html;
}