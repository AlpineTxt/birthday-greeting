document.addEventListener('DOMContentLoaded', () => {
    const thankYouBtn = document.getElementById('thank-you-btn');
    const scene1 = document.getElementById('scene1');
    const scene2 = document.getElementById('scene2');
    const envelope = document.getElementById('envelope');
    const goodLuckBtn = document.getElementById('good-luck-btn');

    function triggerFeedback() {
        if (navigator.vibrate) navigator.vibrate(50);
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.5, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.1);
            }
        } catch (e) {}
    }

    let clickCount = 0;

    thankYouBtn.addEventListener('click', () => {
        triggerFeedback();
        clickCount++;

        if (clickCount >= 1 && clickCount <= 3) {
            // First 3 clicks: Pop up from another coordinate
            const btnWidth = thankYouBtn.offsetWidth;
            const btnHeight = thankYouBtn.offsetHeight;
            
            // Generate random coordinates within viewport, keeping button fully visible
            const maxX = window.innerWidth - btnWidth - 40;
            const maxY = window.innerHeight - btnHeight - 40;
            
            const randomX = Math.max(20, Math.floor(Math.random() * maxX));
            const randomY = Math.max(20, Math.floor(Math.random() * maxY));

            thankYouBtn.style.position = 'fixed';
            thankYouBtn.style.left = `${randomX}px`;
            thankYouBtn.style.top = `${randomY}px`;
            thankYouBtn.style.bottom = 'auto'; // override initial bottom
        } else if (clickCount === 4) {
            // Fourth click: Slide away instantly
            thankYouBtn.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            thankYouBtn.style.left = '-300px'; // slide off screen to the left
            thankYouBtn.style.opacity = '0';

            setTimeout(() => {
                thankYouBtn.style.display = 'none';
                
                // Hide scene 1
                scene1.style.opacity = '0';
                
                setTimeout(() => {
                    scene1.classList.add('hidden');
                    scene2.classList.remove('hidden');
                    
                    // Trigger letter open after a short delay
                    setTimeout(() => {
                        envelope.classList.add('open');
                    }, 500);
                }, 500);
            }, 400);
        }
    });

    goodLuckBtn.addEventListener('click', () => {
        triggerFeedback();
        alert("You're welcome! Have a wonderful day!");
    });
});
