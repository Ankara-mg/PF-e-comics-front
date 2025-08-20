import axios from "axios";

const backendURL = import.meta.env.VITE_API;


export function getCharacters() {
  return async function (dispatch) {
    var chars = await axios.get(`${backendURL}/characters`)
    return dispatch({
      type: "GET_CHARACTERS",
      payload: chars.data
    })
  }
}

export function getPublishers() {
  return async function (dispatch) {
    var publishers = await axios.get(`${backendURL}/publishers`)
    return dispatch({
      type: "GET_PUBLISHERS",
      payload: publishers.data
    })
  }
}

export function getConcepts() {
  return async function (dispatch) {
    var concepts = await axios.get(`${backendURL}/concepts`)
    return dispatch({
      type: "GET_CONCEPTS",
      payload: concepts.data
    })
  }
}

export function creategame(data) {
  return async function () {
    const createUser = await axios.post(
      "http://localhost:3000/publishers",
      data
    );
  };
}


//77//77--------------------Filtros-----

// export function filterPublishers(payload){
// console.log(payload)
//   return {
//   type:"FILTER_COMIC_FOR_PUBLISHERS",
//   payload
//   }}

// export function FilterAD(payload) {
//   console.log(payload)
//   return {
//     type: "ORDER_NAME",
//     payload
//   }
// }


// export function FilterForRelease(payload) {
//   return {
//     type: "FILTER_FOR_RELEASE",
//     payload
//   }
// }


export function clear() {
  return {
    type: "CLEAR",
  }
}


export function setPage(payload) {
  return {
    type: 'SET_PAGE',
    payload
  }
}


export const sortIssues = (sortBy, allIssues) => dispatch => {

  const sortedComics = allIssues.map(obj => ({...obj}))
  let menorMayor, posicion, aux, cambios = false
  
  switch(sortBy){
    case 'ratingAsc':
    case 'ratingDesc':
      for(let i = 0 ; i < allIssues.length ; i++){
        menorMayor = sortedComics[i]
        for (let j = 0 ; j < allIssues.length ; j++){
          if(sortedComics[j].avgRating < menorMayor.avgRating){
            menorMayor = sortedComics[j]
            posicion = j
            cambios = true
          }
          
          if(cambios){
            cambios = false
            aux = sortedComics[i]
            sortedComics[i] = menorMayor
            sortedComics[posicion] = aux  
          }
        }
      }

      return dispatch({
        type: 'SORT_ISSUES',
        payload: sortBy === 'ratingDesc' ? sortedComics : sortedComics.reverse()
      })


    case 'priceAsc':
    case 'priceDesc':
      for(let i = 0 ; i < allIssues.length ; i++){
        menorMayor = sortedComics[i]
        for (let j = 0 ; j < allIssues.length ; j++){
          if(sortedComics[j].price < menorMayor.price){
            menorMayor = sortedComics[j]
            posicion = j
            cambios = true
          }
          
          if(cambios){
            cambios = false
            aux = sortedComics[i]
            sortedComics[i] = menorMayor
            sortedComics[posicion] = aux  
          }
        }
      }

      return dispatch({
        type: 'SORT_ISSUES',
        payload: sortBy === 'priceDesc' ? sortedComics : sortedComics.reverse()
      })
    
    case 'issueNum':
      for(let i = 0 ; i < allIssues.length ; i++){
        menorMayor = sortedComics[i]
        for (let j = 0 ; j < allIssues.length ; j++){
          if(sortedComics[j].issue_number > menorMayor.issue_number){
            menorMayor = sortedComics[j]
            posicion = j
            cambios = true
          }
          
          if(cambios){
            cambios = false
            aux = sortedComics[i]
            sortedComics[i] = menorMayor
            sortedComics[posicion] = aux  
          }
        }
      }
      return dispatch({
        type: 'SORT_ISSUES',
        payload: sortedComics
      })
      
    default:
      return dispatch({
        type: 'SORT_ISSUES',
        payload: allIssues
      })

  }
}