const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false; // when the page first loads, it needs to be false;
let imagesLoaded = 0; 
let totalImages = 0; // to keep track of total images so we know when its done loading everything
let photosArray = [];

// Unsplash API
const count = 30;
// Normally, don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were Loaded. This function will be called for each individual image
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
    }
  }

// Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes){
    /* 
    * for in loop to loop through each of the attributes you want to set
    * assign the key that is going to be href, src, alt, title
    * in attributes, which is going to be an object containing both the key and the value to set
    * pass in the elements, that will be the item or image
    */
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links and photos, Add to the DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    // run function for each object in photos Array. Each object is going to be assigned to the photo variable as it runs through the forEach method
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash. 
        // Creates a blank anchor
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer element 
        /* 
        * Item is the parent of the image, it will put the image into the item
        * ImageContainer is the parent, it will put the item into the imageContainer
        * for each item in the array, it will run through the function 
        */
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from unsplash api
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch error
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    // window.innerHeight is the height of our browser window that is in view
    // window.scrollY is how far we scrolled down from the top of the page
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        // so it will only be ready again once imagesLoaded = totalImages
        ready = false;
        getPhotos();
    }
});

//On load
getPhotos();