//document.addEventListener("DOMContentLoaded", loadImages())

document.addEventListener("DOMContentLoaded", function() {
    loadImageInfo();
    document.getElementById("user-greeting").textContent = "Welcome to GARTY (Guess that Art Year)";
});

// Step 1: Function that queries ("https://api.artic.edu/api/v1/artworks"), displays Title, Medium, etc, pulls in Image ID and passes to `https://www.artic.edu/iiif/2/${imageIdentifier}/full/843,/0/default.jpg`. Step 2: This function should also be called when player clicks Play Again and it should receive a random number to in order to get new information. 

const artworkList = document.getElementById("artwork-list");

//DOM construction function
function createArtList(artworkObject) {
    
    artworkList.innerHTML = " "

    let pieceTitle = artworkObject.title
    let pieceTitleListItem = document.createElement('li')
    
    let artistName = artworkObject.artist_title
    let artistNameListItem = document.createElement('li')
    
    let mediumOfWork = artworkObject.medium_display
    let mediumListItem = document.createElement('li')
    
    let placeOrigin = artworkObject.place_of_origin
    let placeOfOriginList = document.createElement('li')

    pieceTitleListItem.innerText = "Title:" + " " + pieceTitle
    
    artistNameListItem.innerText = "Artist Name:" + " " + artistName
    
    mediumListItem.innerText = "Medium:" + " " + mediumOfWork
    
    placeOfOriginList.innerText = "Place of Origin:" + " " + placeOrigin

    artworkList.append(pieceTitleListItem, artistNameListItem, mediumListItem, placeOfOriginList)
    artworkList.setAttribute("artworkEndDate", artworkObject.date_end)
    
    loadImage(artworkObject.image_id);

}

//INITIAL INFO 
let pieceTitles = [];
function loadImageInfo () {
    fetch("https://api.artic.edu/api/v1/artworks")
    .then((resp) => resp.json())
    .then((json) => {
        createArtList(json.data[0]);
        loadOptions(json.data);
    })
  };

//LOAD OPTIONS AT BOTTOM
//switch to forEach
function loadOptions (titles) {
    for (let i = 0; i < titles.length; ++i) {
        pieceTitles.push(titles[i]);
        let pieceTitlesList = document.createElement('li')
        pieceTitlesList.innerText = titles[i].title;
        document.getElementById("titles-list").appendChild(pieceTitlesList)
        pieceTitlesList.addEventListener("onClick", () => createArtList(titles[i]))
        }
}

//IMAGE LOAD
function loadImage (imageIdentifier) {
    let url = `https://www.artic.edu/iiif/2/${imageIdentifier}/full/843,/0/default.jpg`;
    fetch(url)
        .then(response => response.blob())
        .then(data => {
        let objectURL = URL.createObjectURL(data);
        const image = document.getElementById("image");
        image.setAttribute("src", objectURL);
    });
}

//PLAY AGAIN FUNCTIONALITY
let randomPage;
document.getElementById('play-again').addEventListener("click", function(){
        loadNewInfo();
})

//FUNCTIONS TO LOAD NEW INFO AND IMAGE
let newImageIdentifier;
let dateEndHolder;
function loadNewInfo () {
    let oldImage = document.getElementById("image")
    oldImage.src = "";
    randomPage = Math.random() * 9914 | 0;
    //Reset the Titles Array
    document.getElementById("titles-list").innerHTML = " "
    pieceTitles = [];
    //Dynamic fetch call to new page
    fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}`)
    .then((resp) => resp.json())
    .then((json) => {
        createArtList(json.data[0]);
        loadOptions(json.data);
        document.getElementById("search-input").value = " "
})
}

//GUESSING FUNCTIONALITY AND RESPONSE
const form = document.getElementById("search-form");
form.addEventListener("submit", async function(e) {
    e.preventDefault();
    let dateEnd = parseInt(artworkList.artworkEndDate)
    const searchTerm = document.getElementById("search-input").value;
    let dateDifferenceResult = Math.abs(searchTerm - dateEnd);
    console.log(dateDifferenceResult);
    showMessageToUser(dateDifferenceResult);
})

function showMessageToUser (difference) {
    let popup = document.getElementById("feedback-popup");

    if (difference < 20) {
        popup.innerHTML = `Nice work! You're only ${difference} off! <button id="close-button">Close</button>`
    }
    else if (difference > 20) {
        popup.innerHTML = `Not quite there, try again. <button id="close-button">Close</button>`
    }
    else if (difference === 0) {
        popup.innerHTML = `Amazing! Right on the money! <button id="close-button">Close</button>`
    }
    else {
        popup.innerHTML = `Oops, this item doesn't have a date. Click "Reveal" to see what info it does have or Play Again to move on. <button id="close-button">Close</button> `
    }
    popup.style.display = "block";

    let closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", function() {
    popup.style.display = "none";
    document.getElementById("search-input").value = " "
});
}


//REVEAL FUNCTIONALITY 
const revealForm = document.getElementById("reveal-form");
revealForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    let dateDisplayListItem = document.createElement('li');
    dateDisplayListItem.innerText = dateEndHolder;
    document.getElementById("artwork-list").appendChild(dateDisplayListItem);
})

