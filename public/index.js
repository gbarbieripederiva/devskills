const tableBody = document.querySelector("#memberTbody");
const apiUrl = "http://localhost:8081/api";


// Returns a URL object for the api url based 
function getApiURL(url) {
    
    /* 
        Return apiurl if url is not defined, 
        if defined but does not start with "/" add it first
        then return it
    */
    if (typeof url === "undefined") {
        return new URL(apiUrl);
    } else if (url[0] != "/") {
        return new URL(apiUrl + "/" + url);
    } else {
        return new URL(apiUrl + url);
    }
}

// generate tr for a member
function generateTableRow(member){
    // create tr
    let tr = document.createElement("tr");
    // create elem for each property and append to tr
    let aux = document.createElement("td");
    aux.textContent = member.firstName;
    tr.appendChild(aux);
    aux = document.createElement("td");
    aux.textContent = member.lastName;
    tr.appendChild(aux);
    aux = document.createElement("td");
    aux.textContent = member.address;
    tr.appendChild(aux);
    aux = document.createElement("td");
    aux.textContent = member.ssn;
    tr.appendChild(aux);
    //return tr
    return tr;
}

// generates an error toast
function errorToast(errorMessage) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    p.textContent = errorMessage;
    div.classList.add("error-toast");
    div.appendChild(p);
    document.body.appendChild(div);
    setTimeout(() => {
        document.body.removeChild(div);
    }, 3000);
}

async function main() {
    // Gets members 
    try {
        let url = getApiURL();
        let mode = "no-cors";
        if(url.href != location.href){
            mode = "cors";
        }
        let members = await (
            await fetch(getApiURL("members"), {
                mode: mode,
            })
        ).json();
        console.log(members)
        members.forEach(m => {
            let tr = generateTableRow(m);
            tableBody.appendChild(tr);
        });
    } catch (e) {
        errorToast("Could not get members");
        console.error(e);
    }
}

main();