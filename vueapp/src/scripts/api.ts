const apiUrl = "http://localhost:8081/api";

export interface Member{
    firstName:string;
    lastName:string;
    address:string;
    ssn:string;
}


// Returns a URL object for the api url based 
export function getApiURL(url:string):URL{
    
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
export function fetchMode(url:URL):RequestMode{
    let mode = "no-cors";
    if(url.href != location.href){
        mode = "cors";
    }
    return mode as RequestMode;
}

// validate if member is valid
export function isValidMember(member:Member):boolean {
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


export async function getMembers():Promise<Member[]> {
    // Gets members 
    const url = getApiURL("members");

    const members:Member[] = await (
        await fetch( url.toString(), {
            mode: fetchMode(url),
        })
    ).json();
    return members;
}

/* 
    upload a member (doesnt perfom validation)
    if ok return member else throw error
*/
export async function postMember(member:Member):Promise<Member> {
    const url = getApiURL("members");
    const res = await fetch(url.toString(),{
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

export default {
    getApiURL,
    isValidMember,
    fetchMode,
    getMembers,
    postMember,
}