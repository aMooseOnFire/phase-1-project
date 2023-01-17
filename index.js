//document.addEventListener("DOMContentLoaded", loadImages())

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("user-greeting").textContent = "Welcome back, Player One";
});

//Base API URL
const baseURL = "https://api.artic.edu/api/v1/artworks"

//need to add a button to refresh the page and regenerate this call, to pull in new info to loadImages
// const refreshButton = // 

//Declare variables so they are accessible globally outside of the fetch function
let imageIdentifier;

//Option 1
//Load images and create arrays for each piece of art based on info in API call
function loadImageInfo () {
    fetch("https://api.artic.edu/api/v1/artworks")
    .then((resp) => resp.json())
    .then((json) => {
    
        let pieceTitle = json.data[0].title
        let pieceTitleListItem = document.createElement('li')
        pieceTitleListItem.innerText = pieceTitle
        document.getElementById("artwork-list").appendChild(pieceTitleListItem)
        
        let artistName = json.data[0].artist_title
        let artistNameListItem = document.createElement('li')
        artistNameListItem.innerText = artistName
        document.getElementById("artwork-list").appendChild(artistNameListItem)

        let mediumOfWork = json.data[0].medium_display
        let mediumListItem = document.createElement('li')
        mediumListItem.innerText = mediumOfWork
        document.getElementById("artwork-list").appendChild(mediumListItem)

        let placeOrigin = json.data[0].place_of_origin
        let placeOfOriginList = document.createElement('li')
        placeOfOriginList.innerText = placeOrigin
        document.getElementById("artwork-list").appendChild(placeOfOriginList)

        imageIdentifier = json.data[0].image_id;
        
        loadImage();

    })
  };

loadImageInfo();

function loadImage () {
    let url = `https://www.artic.edu/iiif/2/${imageIdentifier}/full/843,/0/default.jpg`;
    fetch(url)
        .then(response => response.blob())
        .then(data => {
        let objectURL = URL.createObjectURL(data);
        const image = document.getElementById("image");
        image.setAttribute("src", objectURL);
    });
}


//Play Again Functionality
let randomPage;
document.getElementById('play-again').addEventListener("click", function(){
        loadNewInfo();
        loadNewImage();
})

//In response to PLAY AGAIN CLICK, should clear HTML and load new HTML
let newImageIdentifier;
let dateEndHolder;
function loadNewInfo () {
    let oldList = document.getElementById("artwork-list")
    let oldImage = document.getElementById("image")
    oldList.innerHTML = ""
    oldImage.src = "";
    randomPage = Math.random() * 9914 | 0;
    //NEED TO MAKE THIS DYNAMIC TO THE FETCH CALL ABOVE 
    fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}`)
    .then((resp) => resp.json())
    .then((json) => {
        let pieceTitle = json.data[0].title
        let pieceTitleListItem = document.createElement('li')
        pieceTitleListItem.innerText = pieceTitle
        document.getElementById("artwork-list").appendChild(pieceTitleListItem)
        
        let artistName = json.data[0].artist_title
        let artistNameListItem = document.createElement('li')
        artistNameListItem.innerText = artistName
        document.getElementById("artwork-list").appendChild(artistNameListItem)

    
        let mediumOfWork = json.data[0].medium_display
        let mediumListItem = document.createElement('li')
        mediumListItem.innerText = mediumOfWork
        document.getElementById("artwork-list").appendChild(mediumListItem)
    
        let placeOrigin = json.data[0].place_of_origin
        let placeOfOriginList = document.createElement('li')
        placeOfOriginList.innerText = placeOrigin
        document.getElementById("artwork-list").appendChild(placeOfOriginList)
    
        newImageIdentifier = json.data[0].image_id;
        dateEndHolder = json.data[0].date_end
        
        loadNewImage();
        
        return dateEndHolder;
})
}

console.log(dateEndHolder);

function loadNewImage () {
    let id = newImageIdentifier
    let url = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
    fetch(url)
        .then(response => response.blob())
        .then(data => {
        let objectURL = URL.createObjectURL(data);
        const image = document.getElementById("image");
        image.setAttribute("src", objectURL);
    });
}

//Allow user to guess the origin year
let dateDifferenceResult;
const form = document.getElementById("search-form");
form.addEventListener("submit", async function(e) {
    e.preventDefault();
    let dateEnd = dateEndHolder;
    const searchTerm = document.getElementById("search-input").value;
    dateDifferenceResult = Math.abs(searchTerm - dateEnd);
    showMessageToUser();
    return dateDifferenceResult;
})


function showMessageToUser () {
    if (dateDifferenceResult < 50) {
        let li = document.createElement('li')
        li.innerText = `Nice work! You're close.`
        document.getElementById("feedback-list").appendChild(li)
    }
    else if (dateDifferenceResult > 50) {
        let li = document.createElement('li')
        li.innerText = `Not quite there. Try again!`
        document.getElementById("feedback-list").appendChild(li)
    }
    else {
        console.log('check')
    }
}


//Search the API functionality for terms/tags: https://api.artic.edu/api/v1/artworks/search?q=cats


//REVEAL FUNCTIONALITY 
const revealForm = document.getElementById("reveal-form");
revealForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    let dateDisplayListItem = document.createElement('li');
    dateDisplayListItem.innerText = dateEndHolder;
    document.getElementById("artwork-list").appendChild(dateDisplayListItem);
})