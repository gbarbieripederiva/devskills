const tableBody = document.querySelector("#memberTbody");
const addMemberForm = document.querySelector("#addMemberForm");
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

// returns the mode needed for fetch
function fetchMode(url) {
    let mode = "no-cors";
    if(url.href != location.href){
        mode = "cors";
    }
    return mode;
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
    // create elements
    let div = document.createElement("div");
    let p = document.createElement("p");
    // set error message
    p.textContent = errorMessage;
    // set error toast class
    div.classList.add("error-toast");
    // appends
    div.appendChild(p);
    document.body.appendChild(div);
    // remove it after 3s
    setTimeout(() => {
        document.body.removeChild(div);
    }, 3000);
}

async function main() {
    // Gets members 
    try {
        let url = getApiURL("members");

        let members = await (
            await fetch(url, {
                mode: fetchMode(url),
            })
        ).json();
        members.forEach(m => {
            let tr = generateTableRow(m);
            tableBody.appendChild(tr);
        });
    } catch (e) {
        errorToast("Could not get members");
        console.error(e);
    }
}

// validate if member is valid
function isValidMember(member) {
    if(typeof member !== 'object'){
        return false;
    }
    if(typeof member.firstName !== 'string' || member.firstName.length < 1){
        return false;
    }
    if(typeof member.lastName !== 'string' || member.lastName.length < 1){
        return false;
    }
    if(typeof member.address !== 'string' || member.address.length < 1){
        return false;
    }

    if(typeof member.ssn !== 'string' || !/^\d\d\d-\d\d-\d\d\d\d$/.test(member.ssn)){
        return false;
    }
    return true;
}

/* 
    upload a member (doesnt perfom validation)
    if ok return member else throw error
*/
async function uploadMember(member) {
    let url = getApiURL("members");
    let res = await fetch(url,{
        mode:fetchMode(url),
        headers:{"content-type":"application/json"},
        method:"POST",
        body: JSON.stringify(member)
    });
    if(res.ok){
        return member;
    }else{
        throw new Error("Could not upload member");
    }
}

// handle form submit
function handleForm(event){
    // prevent default behavior
    event.preventDefault();
    let member = {
        firstName:event.target["firstName"].value,
        lastName:event.target["lastName"].value,
        address:event.target["address"].value,
        ssn:event.target["ssn"].value
    }
    // check if valid, upload if so, add to table if succeeded 
    // if anything fails show toast
    if(isValidMember(member)){
        uploadMember(member).then((m)=>{
            let tr = generateTableRow(m);
            tableBody.appendChild(tr);
        }).catch((e)=>{
            errorToast("Could not upload member")
        })
    }else{
        errorToast("Member information is invalid");
    }
}
addMemberForm.onsubmit = handleForm;


main();