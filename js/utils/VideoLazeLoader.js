// Lazy load videos using Intersection Observer
class VideoLazyLoader {
    constructor() {
        this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
            root: null,
            threshold: 0.1,  // Video starts loading when 10% of the card is visible
        });
    }

    observe(videoElement) {
        this.observer.observe(videoElement);
    }

    onIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const videoElement = entry.target;
                if (!videoElement.src) {
                    videoElement.src = videoElement.getAttribute('data-src');
                    videoElement.play();
                }
                this.observer.unobserve(videoElement);  // Stop observing once loaded
            }
        });
    }
}

// Initialize the lazy loader in GameView.js
const videoLazyLoader = new VideoLazyLoader();

export class GameView {
    createCardElement(dragon) {
        const card = document.createElement('div');
        card.classList.add('card');

        // Video element with lazy loading
        const videoElement = document.createElement('video');
        videoElement.setAttribute('data-src', `assets/videos/${dragon.name.toLowerCase().replace(' ', '_')}.mp4`);
        videoElement.muted = true;
        videoElement.loop = true;
        videoElement.classList.add('card-video-background');

        // Use Intersection Observer for lazy loading
        videoLazyLoader.observe(videoElement);

        card.appendChild(videoElement);

        // Card info overlay
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
