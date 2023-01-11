document.addEventListener("DOMContentLoaded", loadImages())

function loadImages () {
    fetch('https://api.artic.edu/api/v1/artworks/129884')
    .then((resp) => resp.json())
    .then((json) => {
    console.log(json.data.title)
    console.log(json.data.artist_title)
    console.log(json.data.date_display)
    console.log(json.data.medium_display)
    console.log(json.data.place_of_origin)
    console.log(json.data.category_titles)
    console.log('Hi')
    const imageList = document.getElementById("art-image-list");
    let artImg = document.createElement("li");
    imageList.appendChild(artImg);
    })
  };


