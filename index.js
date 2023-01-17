//document.addEventListener("DOMContentLoaded", loadImages())

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("user-greeting").textContent = "Welcome back, Player One";
});


//Declare variables so they are accessible globally outside of the fetch function
let imageIdentifier;

//INITIAL LOAD
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

//GUESSING FUNCTIONALITY AND RESPONSE
let dateDifferenceResult;
const form = document.getElementById("search-form");
form.addEventListener("submit", async function(e) {
    e.preventDefault();
    let dateEnd = dateEndHolder;
    const searchTerm = document.getElementById("search-input").value;
    dateDifferenceResult = Math.abs(searchTerm - dateEnd);
    console.log(dateDifferenceResult);
    showMessageToUser();
   
})

function showMessageToUser () {
    let popup = document.getElementById("feedback-popup");

    if (dateDifferenceResult < 50) {
        popup.innerHTML = `Nice work! You're close. <button id="close-button">Close</button>`
    }
    else if (dateDifferenceResult > 50) {
        popup.innerHTML = `Not quite there, try again. <button id="close-button">Close</button>`
    }
    else {
        popup.innerHTML = `Oops, this item doesn't have a date. Click "Reveal" to see what info it does have or Play Again to move on. <button id="close-button">Close</button> `
    }
    popup.style.display = "block";

    let closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", function() {
    popup.style.display = "none";
});
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