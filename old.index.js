function loadImageInfoVF () {
    fetch("https://api.artic.edu/api/v1/artworks")
    .then((resp) => resp.json())
    .then((json) => {
        for (let i = 0; i < json.data.length; ++i) {
        console.log('hello')
        }

    })
    .catch(error => console.error(error));
}

loadImageInfoVF();


 //const listHTML = document.getElementById("art-image-list")
 //createTitleElement();

 //Create the list of items
 // const imageList = document.getElementById("art-image-list");
    //let artImg = document.createElement("li");
    //imageList.appendChild(artImg);

    //Need to create the dropdown and add Event Listener
document.getElementById("select1").addEventListener("change", function() { 
    console.log(this.value); 
  })

  //use this to get a random page (not ID)
const myRandomNumber = Math.random() * 1000 | 0;


// Empty arrays to store API call info
let pieceTitles = [];
let artistNames = [];
let datesCreated = [];
let mediumOfArt = [];
let placesOfOrigin = [];
let categoryTags = [];

//API Call to get all DATA 
function loadImageInfo () {
    fetch("https://api.artic.edu/api/v1/artworks")
    .then((resp) => resp.json())
    .then((json) => {
    console.log(json.data[0].title)
    let pieceTitleListItem = document.createElement('li')
    pieceTitlesListItem.innerText = XXX
    document.getElementById("artwork-list").appendChild(pieceTitleListItem)
    
    for (let i = 0; i < json.data.length; ++i) {
            pieceTitles.push(json.data[i].title);   
        }
        pieceTitles.map((pieceTitle) => {
            console.log(pieceTitle)
            let pieceTitlesList = document.createElement('li')
            pieceTitlesList.innerText = pieceTitle
            document.getElementById("artwork-list").appendChild(pieceTitlesList)
        })
    
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


function loadImage () {
    let id = imageIdentifier
    fetch(`https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`)
    .then((resp) => resp.json())
    .then((json) => {
        console.log(imageIdentifier)
        //const imageLink = json.imageLink;
        //const image = document.getElementById("image");
        //image.setAttribute("src", imageLink);
})
}

loadImage();

function loadNewData () {
    randomPage = Math.random() * 9914 | 0;
    fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}`)
    .then((resp) => resp.json())
    .then((json) => {
        console.log(json)
    })
}

let dateDisplayYear = json.data[0].date_display
let dateDisplayListItem = document.createElement('li')
dateDisplayListItem.innerText = dateDisplayYear
document.getElementById("artwork-list").appendChild(dateDisplayListItem)


async function searchArtworkDateDifference(searchTerm) {
    // Make the API request
    const response = await fetch("https://api.artic.edu/api/v1/artworks");
    const data = await response.json();
    const result = {};

    // Iterate through the artworks and find the difference
    for (let i = 0; i < data.length; i++) {
        const artwork = data[i];
        const dateEnd = artwork.date_end;
        if (dateEnd) {
            const difference = searchTerm - dateEnd;
            result[artwork.title] = difference;
        }
    }
    return result;
}

showMessageToUser();

//
function showMessageToUser () {
    //Take result from eventListener and insert here

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
        let li = document.createElement('li')
        li.innerText = `Oops, this item doesn't have a date. Click "Reveal" to see what info it does have or Play Again to move on.`
        document.getElementById("feedback-list").appendChild(li)
    }
}


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

//CREATE ARTWORK OPTIONS FOR LATER USE

for (let i = 0; i < json.data.length; ++i) {
    pieceTitles.push(json.data[i].title);
    let pieceTitlesList = document.createElement('li')
    document.getElementById("titles-list").appendChild(pieceTitlesList)
    pieceTitlesList.addEventListener(click, () => createArtList(json.data[i]))
    }
    
    pieceTitles.map((pieceTitle) => {
         
         pieceTitlesList.innerText = pieceTitle
         document.getElementById("titles-list").appendChild(pieceTitlesList)
    })


   /*      let pieceTitle = json.data[0].title
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
        document.getElementById("artwork-list").appendChild(placeOfOriginList) */