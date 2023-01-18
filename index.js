//document.addEventListener("DOMContentLoaded", loadImages())

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("user-greeting").textContent = "Welcome to GARTY (Guess that Art Year)";
});

//Declare variables so they are accessible globally outside of the fetch function
let imageIdentifier;

//INITIAL INFO AND IMAGE LOAD
let pieceTitles = [];
function loadImageInfo () {
    fetch("https://api.artic.edu/api/v1/artworks")
    .then((resp) => resp.json())
    .then((json) => {
    
        let pieceTitle = json.data[0].title
        let pieceTitleListItem = document.createElement('li')
        pieceTitleListItem.innerText = "Title:" + " " + pieceTitle
        document.getElementById("artwork-list").appendChild(pieceTitleListItem)
        
        let artistName = json.data[0].artist_title
        let artistNameListItem = document.createElement('li')
        artistNameListItem.innerText = "Artist Name:" + " " + artistName
        document.getElementById("artwork-list").appendChild(artistNameListItem)

        let mediumOfWork = json.data[0].medium_display
        let mediumListItem = document.createElement('li')
        mediumListItem.innerText = "Medium:" + " " + mediumOfWork
        document.getElementById("artwork-list").appendChild(mediumListItem)

        let placeOrigin = json.data[0].place_of_origin
        let placeOfOriginList = document.createElement('li')
        placeOfOriginList.innerText = "Place of Origin:" + " " + placeOrigin
        document.getElementById("artwork-list").appendChild(placeOfOriginList)

        //Adds piece titles in this page to list at bottom of page
        for (let i = 0; i < json.data.length; ++i) {
            pieceTitles.push(json.data[i].title);   
        }
        pieceTitles.map((pieceTitle) => {
            let pieceTitlesList = document.createElement('li')
            pieceTitlesList.innerText = pieceTitle
            document.getElementById("titles-list").appendChild(pieceTitlesList)
        })

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


//PLAY AGAIN FUNCTIONALITY
let randomPage;
document.getElementById('play-again').addEventListener("click", function(){
        loadNewInfo();
        loadNewImage();
})

//FUNCTIONS TO LOAD NEW INFO AND IMAGE
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
        pieceTitleListItem.innerText = "Title:" + " " + pieceTitle
        document.getElementById("artwork-list").appendChild(pieceTitleListItem)
        
        let artistName = json.data[0].artist_title
        let artistNameListItem = document.createElement('li')
        artistNameListItem.innerText = "Artist Name:" + " " + artistName
        document.getElementById("artwork-list").appendChild(artistNameListItem)
    
        let mediumOfWork = json.data[0].medium_display
        let mediumListItem = document.createElement('li')
        mediumListItem.innerText = "Medium:" + " " + mediumOfWork
        document.getElementById("artwork-list").appendChild(mediumListItem)
    
        let placeOrigin = json.data[0].place_of_origin
        let placeOfOriginList = document.createElement('li')
        placeOfOriginList.innerText = "Place of Origin:" + " " + placeOrigin
        document.getElementById("artwork-list").appendChild(placeOfOriginList)

        document.getElementById("titles-list").innerHTML = " "

        //Adds piece titles in this page to list at bottom of page
        for (let i = 0; i < json.data.length; ++i) {
            pieceTitles.push(json.data[i].title);   
        }
        pieceTitles.map((pieceTitle) => {
            let pieceTitlesList = document.createElement('li')
            pieceTitlesList.innerText = pieceTitle
            document.getElementById("titles-list").appendChild(pieceTitlesList)
        })
    
        newImageIdentifier = json.data[0].image_id;
        dateEndHolder = json.data[0].date_end
        
        loadNewImage();        

        document.getElementById("search-input").value = " "

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
    else if (dateDifferenceResult = 0) {
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