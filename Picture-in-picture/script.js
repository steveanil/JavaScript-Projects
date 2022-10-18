const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt the user to select media stream, pass to video element, then play
async function selectMediaStream() {
    // benefit of using try-catch is that anything that needs to be resolved will wait untill the try has been completed
    try {
        // Capturing screen contents as a live MediaStream is initiated by calling navigator.mediaDevices.getDisplayMedia(), which returns a promise that resolves to a stream containing the live screen contents.
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        // passes the mediStream as a source aobject of the video
        videoElement.srcObject = mediaStream;
        // when the video has loaded its metadata, its going to call a function that is going to play the video
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        
    }
}

button.addEventListener('click', async() => {
    // Disable the button
    button.disabled = true;
    // Start picture in picture
    await videoElement.requestPictureInPicture();
    // Reset Button, this will only happen if we sucessfully request our picture in picture otherwise the button will remain disabled
    button.disabled = false;
});

// onLoad
selectMediaStream();