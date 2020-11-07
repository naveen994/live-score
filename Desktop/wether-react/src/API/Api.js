const API_Key="615QO85HTuU001vnZZG37W9cQK32"

export const getMatch=()=>{
    const Url=`https://cricapi.com/api/matches?apikey=${API_Key}`;

    return fetch(Url)
    .then((response)=>response.json())
    .catch((error)=>console.log("ERROR:",error))
}

export const getMatchDetail=(id)=>{
    const Url=`https://cricapi.com/api/cricketScore?apikey=${API_Key}&unique_id=${id}`;
    return fetch(Url)
    .then((response)=>response.json())
    .catch((error)=>console.log("ERROR:",error))
}