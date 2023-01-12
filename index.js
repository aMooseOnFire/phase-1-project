//document.addEventListener("DOMContentLoaded", loadImages())

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("user-greeting").textContent = "Welcome back, Friend";
});

//use this to get a random page (not ID)
const myRandomNumber = Math.random() * 1000 | 0;

//Base API URL
const baseURL = "https://api.artic.edu/api/v1/artworks"

//need to add a button to refresh the page and regenerate this call, to pull in new info to loadImages
// const refreshButton = // 

// Empty arrays to store API call info
let pieceTitles = [];
let artistNames = [];
let datesCreated = [];
let mediumOfArt = [];
let placesOfOrigin = [];
let categoryTags = [];

//image load 
function loadImageInfo () {
    fetch("https://api.artic.edu/api/v1/artworks")
    .then((resp) => resp.json())
    .then((json) => {
    for (let i = 0; i < json.data.length; ++i) {
            pieceTitles.push(json.data[i].title);
            let listItem = document.createElement('li');
            listItem.textContent = `$data.title`
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

    console.log(json.pagination.current_page)

    })
  };

loadImageInfo();

 //function to grab info from arrays above and put into list
 function createTitleElement () {
    for (let i=0; i <pieceTitles.length; i++){
        let listItem = document.createElement('li');
            listItem.textContent = `$pieceTitle[i]`
        }
    };
createTitleElement();

//Going to use pageOptions to display in Dropdown to user
const pageOptions = Math.random() * 9914 | 0;

//Need to create the dropdown and add Event Listener
document.getElementById("select1").addEventListener("change", function() { 
    console.log(this.value); 
  })

//Allow user to search API based on terms

//Search the API functionality for terms/tags: https://api.artic.edu/api/v1/artworks/search?q=cats

//Hide the artist name and origin and have user guess

//Input box

//REveal functionality 

//Refresh page to show another piece of art 