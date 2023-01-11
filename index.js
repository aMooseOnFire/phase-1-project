document.addEventListener("DOMContentLoaded", loadImages())

//use this to get a random page (not ID)
const myRandomNumber = Math.random() * 1000 | 0;

const baseURL = "https://api.artic.edu/api/v1/artworks"

//need to add a button to refresh the page and regenerate this call, to pull in new info to loadImages
// const refreshButton = // 

let pieceTitles = [];
let artistNames = [];
let datesCreated = [];
let mediumOfArt = [];
let placesOfOrigin = [];
let categoryTags = [];

function loadImages () {
    fetch('https://api.artic.edu/api/v1/artworks')
    .then((resp) => resp.json())
    .then((json) => {
    for (let i = 0; i < json.data.length; ++i) {
            pieceTitles.push(json.data[i].title);
        }

    for (let i = 0; i < json.data.length; ++i) {
        artistNames.push(json.data[i].artist_title)
    }

    for (let i = 0; i < json.data.length; ++i) {
        datesCreated.push(json.data[i].date_display)
    }

    for (let i = 0; i < json.data.length; ++i) {
        mediumOfArt.push(json.data[i].medium_display)
    }

    for (let i = 0; i < json.data.length; ++i) {
        placesOfOrigin.push(json.data[i].place_of_origin)
    }

    for (let i = 0; i < json.data.length; ++i) {
        categoryTags.push(json.data[i].category_titles)
    }

    for (let i = 0; i < json.data.length; ++i) {
        let element = json.data[i];
        console.log(json.pagination[i].current_page)
    }

    const imageList = document.getElementById("art-image-list");
    let artImg = document.createElement("li");
    imageList.appendChild(artImg);
    })
  };

 function addInfo () {
    //This function will take the data from the API call above and add it to image cards
    
 }


//Going to use pageOptions to display in Dropdown to user
const pageOptions = Math.random() * 9914 | 0;
//Need to create the dropdown and add Event Listener
document.getElementById("select1").addEventListener("change", function() { 
    console.log(this.value); 
  })

//Allow user to search API based on terms




//Search the API functionality for terms/tags: https://api.artic.edu/api/v1/artworks/search?q=cats
