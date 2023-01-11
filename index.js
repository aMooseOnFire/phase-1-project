document.addEventListener("DOMContentLoaded", loadImages())

//use this to get a random page (not ID)
const myRandomNumber = Math.random() * 1000 | 0;

const baseURL = "https://api.artic.edu/api/v1/artworks"

function loadImages () {
    fetch('https://api.artic.edu/api/v1/artworks')
    .then((resp) => resp.json())
    .then((json) => {
    console.log(json)
    console.log(json.pagination.current_page)
    console.log(json.data[0].title)
    console.log(json.data[0].artist_title)
    console.log(json.data[0].date_display)
    console.log(json.data[0].medium_display)
    console.log(json.data[0].place_of_origin)
    console.log(json.data[0].category_titles)
    const imageList = document.getElementById("art-image-list");
    let artImg = document.createElement("li");
    imageList.appendChild(artImg);
    })
  };

 
//Going to use pageOptions to display in Dropdown to user
const pageOptions = Math.random() * 9914 | 0;
//Need to create the dropdown and add Event Listener
document.getElementById("select1").addEventListener("change", function() { 
    console.log(this.value); 
  })

//Allow user to search API based on terms




//Search the API functionality for terms/tags: https://api.artic.edu/api/v1/artworks/search?q=cats
