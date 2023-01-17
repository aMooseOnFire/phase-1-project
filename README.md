
Phase 1 Project

SPA that uses the Art Institute of Chicago API to present user with a piece of art. It will display certain info about that art, including an image, but it will keep the 'Date Created' field hidden. 

Upon load, the app should pull back an item and info. If it does not, click "Play Again". 

Use "Guess" to guess what year the item was created/finished in. 
Use "Reveal" to reveal the date that the item was created finished in.
Use "Play Again" to refresh

//Base API URL
"https://api.artic.edu/api/v1/artworks"

//Image API URL
https://www.artic.edu/iiif/2/{identifier}/full/843,/0/default.jpg
... Which pulls the identifier from the 
