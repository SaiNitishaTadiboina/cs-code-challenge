// Query list of users from https://5dc588200bbd050014fb8ae1.mockapi.io/assessment .
function getData() {
    fetch('https://5dc588200bbd050014fb8ae1.mockapi.io/assessment')
        .then(response => response.json())
        .then(data => {
            displayData(data)
        });
}

// Read data and render it in another div.
function displayData(data) {
    const divUsers = document.getElementById("divUsers");
    const usersData = `<ul> 
                {{#each dataRows}} 
                <li>
                 <div> 
                 <p> Name : {{this.name}} </p> 
                 <img src={{this.avatar}} alt= 'No Avatar'>
                 <button type=button onclick='moreDetails({{this.id}})'>More details...</button>
                 <p id={{this.id}} style = 'display: none'> ID : {{this.id}} <br /> Created At :{{this.createdAt}}</p>
                 </div>
                 </li>
                 {{/each}} 
                 </ul>`;
    const template = Handlebars.compile(usersData);
    divUsers.innerHTML = template({ dataRows: data });
}

// toggle more details.
function moreDetails(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}