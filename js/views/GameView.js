export class GameView {
    renderDeck(elementId, dragons) {
        const deckElement = document.getElementById(elementId);
        deckElement.innerHTML = '';  // Clear existing cards

        dragons.forEach(dragon => {
            const card = this.createCardElement(dragon);
            deckElement.appendChild(card);
        });
    }

    createCardElement(dragon) {
        const card = document.createElement('div');
        card.classList.add('card');

        // Lazy load video element for the dragon animation (background video)
        const videoElement = document.createElement('video');
        videoElement.setAttribute('data-src', `assets/videos/${dragon.name.toLowerCase().replace(' ', '_')}.mp4`); // Lazy load using data-src
        videoElement.muted = true;   // Mute the video
        videoElement.loop = true;    // Loop the video
        videoElement.classList.add('card-video-background');

        // Load video on hover (lazy loading)
        card.addEventListener('mouseenter', () => {
            if (!videoElement.src) {
                videoElement.src = videoElement.getAttribute('data-src');  // Set the video src
                videoElement.play();  // Play the video
            }
        });

        card.addEventListener('mouseleave', () => {
            videoElement.pause();  // Pause video when hover ends
        });

        // Append the video as a background to the card
        card.appendChild(videoElement);

        // Overlay card info
        const info = document.createElement('div');
        info.classList.add('card-info');
        info.innerHTML = `
            <strong>${dragon.name}</strong><br>
            Atk: ${dragon.attack}<br>
            Def: ${dragon.defense}<br>
            HP: ${dragon.health}<br>
            Element: ${dragon.element}
        `;

        card.appendChild(info);
        return card;
    }
}
