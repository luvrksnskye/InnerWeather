document.addEventListener('DOMContentLoaded', function() {
    updateGreeting();
    startTypingAnimation();

    document.fonts.ready.then(() => {
        console.log("KTEGAKI font has loaded successfully");
    }).catch(() => {
        console.warn("KTEGAKI font failed to load, using fallback fonts");
    });

    initEmotionCarousel();
    enhanceElementEffects();
    initializeHeart();
});

const emotionsList = [
    { name: "Happy", color: "#FF9A00" },
    { name: "Joyful", color: "#FFA726" },
    { name: "Ecstatic", color: "#FFB74D" },
    { name: "Excited", color: "#FFCC80" },
    { name: "Delighted", color: "#FFD54F" },
    { name: "Cheerful", color: "#FFE082" },
    { name: "Amused", color: "#FFECB3" },
    { name: "Jubilant", color: "#FFC107" },
    { name: "Elated", color: "#FFCA28" },
    { name: "Thrilled", color: "#FFD54F" },
    { name: "Enthusiastic", color: "#FFE57F" },
    { name: "Zestful", color: "#FFF176" },
    { name: "Optimistic", color: "#FFF59D" },
    { name: "Pleased", color: "#FFF9C4" },
    { name: "Blissful", color: "#FFEE58" },
    { name: "Playful", color: "#FFEB3B" },
    { name: "Satisfied", color: "#FFF176" },
    { name: "Exhilarated", color: "#FFF59D" },
    { name: "Carefree", color: "#FFEE58" },
    { name: "Gleeful", color: "#FFEB3B" },
    { name: "Jovial", color: "#FDD835" },
    { name: "Merry", color: "#FBC02D" },
    { name: "Content", color: "#F9A825" },
    { name: "Pleasant", color: "#F57F17" },
    { name: "Grateful", color: "#FFB300" },
    { name: "Buoyant", color: "#FFA000" },
    { name: "Radiant", color: "#FF8F00" },
    { name: "Blessed", color: "#FF6F00" },
    { name: "Festive", color: "#FFD180" },
    { name: "Vivacious", color: "#FFAB40" },

    { name: "Calm", color: "#00B4D8" },
    { name: "Serene", color: "#03A9F4" },
    { name: "Peaceful", color: "#29B6F6" },
    { name: "Relaxed", color: "#4FC3F7" },
    { name: "Tranquil", color: "#81D4FA" },
    { name: "Composed", color: "#B3E5FC" },
    { name: "Centered", color: "#E1F5FE" },
    { name: "Balanced", color: "#0288D1" },
    { name: "Harmonious", color: "#039BE5" },
    { name: "Still", color: "#03A9F4" },
    { name: "Gentle", color: "#29B6F6" },
    { name: "Placid", color: "#0277BD" },
    { name: "Quiet", color: "#01579B" },
    { name: "Restful", color: "#80D8FF" },
    { name: "Meditative", color: "#40C4FF" },
    { name: "Mindful", color: "#00B0FF" },
    { name: "Grounded", color: "#0091EA" },
    { name: "At ease", color: "#00BCD4" },
    { name: "Secure", color: "#26C6DA" },
    { name: "Soothed", color: "#4DD0E1" },
    { name: "Settled", color: "#80DEEA" },
    { name: "Steady", color: "#B2EBF2" },
    { name: "Absorbed", color: "#E0F7FA" },
    { name: "Reflective", color: "#006064" },
    { name: "Equanimous", color: "#0097A7" },
    { name: "Comforted", color: "#00ACC1" },
    { name: "Mellow", color: "#00BCD4" },
    { name: "Comfortable", color: "#26C6DA" },
    { name: "Untroubled", color: "#4DD0E1" },
    { name: "Contented", color: "#80DEEA" },

    { name: "Sad", color: "#7678ED" },
    { name: "Blue", color: "#5C6BC0" },
    { name: "Melancholic", color: "#7986CB" },
    { name: "Gloomy", color: "#9FA8DA" },
    { name: "Downcast", color: "#C5CAE9" },
    { name: "Somber", color: "#3949AB" },
    { name: "Sorrowful", color: "#303F9F" },
    { name: "Mournful", color: "#283593" },
    { name: "Wistful", color: "#1A237E" },
    { name: "Disappointed", color: "#9575CD" },
    { name: "Disheartened", color: "#7E57C2" },
    { name: "Forlorn", color: "#673AB7" },
    { name: "Dejected", color: "#5E35B1" },
    { name: "Despondent", color: "#512DA8" },
    { name: "Heartbroken", color: "#4527A0" },
    { name: "Bereft", color: "#311B92" },
    { name: "Regretful", color: "#B39DDB" },
    { name: "Depressed", color: "#9575CD" },
    { name: "Down", color: "#7E57C2" },
    { name: "Hopeless", color: "#673AB7" },
    { name: "Miserable", color: "#7C4DFF" },
    { name: "Lonely", color: "#651FFF" },
    { name: "Empty", color: "#6200EA" },
    { name: "Grieving", color: "#D1C4E9" },
    { name: "Lost", color: "#B39DDB" },
    { name: "Desolate", color: "#9575CD" },
    { name: "Abandoned", color: "#7E57C2" },
    { name: "Alienated", color: "#673AB7" },
    { name: "Homesick", color: "#5E35B1" },
    { name: "Unhappy", color: "#512DA8" },

    { name: "Angry", color: "#FF5C8D" },
    { name: "Irritated", color: "#F06292" },
    { name: "Frustrated", color: "#EC407A" },
    { name: "Annoyed", color: "#E91E63" },
    { name: "Resentful", color: "#D81B60" },
    { name: "Agitated", color: "#C2185B" },
    { name: "Infuriated", color: "#AD1457" },
    { name: "Enraged", color: "#880E4F" },
    { name: "Indignant", color: "#F48FB1" },
    { name: "Seething", color: "#F06292" },
    { name: "Outraged", color: "#EC407A" },
    { name: "Hostile", color: "#E91E63" },
    { name: "Contemptuous", color: "#D81B60" },
    { name: "Bitter", color: "#C2185B" },
    { name: "Exasperated", color: "#AD1457" },
    { name: "Disgusted", color: "#880E4F" },
    { name: "Offended", color: "#FF80AB" },
    { name: "Grumpy", color: "#FF4081" },
    { name: "Vexed", color: "#F50057" },
    { name: "Displeased", color: "#C51162" },
    { name: "Impatient", color: "#E91E63" },
    { name: "Jealous", color: "#F06292" },
    { name: "Vengeful", color: "#EC407A" },
    { name: "Insulted", color: "#E91E63" },
    { name: "Aggravated", color: "#D81B60" },
    { name: "Raging", color: "#C2185B" },
    { name: "Fuming", color: "#AD1457" },
    { name: "Furious", color: "#880E4F" },
    { name: "Livid", color: "#C51162" },
    { name: "Irate", color: "#F50057" },

    { name: "Anxious", color: "#9D4EDD" },
    { name: "Nervous", color: "#8E24AA" },
    { name: "Worried", color: "#7B1FA2" },
    { name: "Stressed", color: "#6A1B9A" },
    { name: "Uneasy", color: "#4A148C" },
    { name: "Apprehensive", color: "#AB47BC" },
    { name: "Tense", color: "#9C27B0" },
    { name: "Concerned", color: "#8E24AA" },
    { name: "Jittery", color: "#7B1FA2" },
    { name: "Panicky", color: "#6A1B9A" },
    { name: "Alarmed", color: "#4A148C" },
    { name: "Restless", color: "#CE93D8" },
    { name: "Overwhelmed", color: "#BA68C8" },
    { name: "Frightened", color: "#AB47BC" },
    { name: "Terrified", color: "#9C27B0" },
    { name: "Doubtful", color: "#8E24AA" },
    { name: "Insecure", color: "#7B1FA2" },
    { name: "On edge", color: "#6A1B9A" },
    { name: "Perturbed", color: "#4A148C" },
    { name: "Paranoid", color: "#EA80FC" },
    { name: "Distressed", color: "#E040FB" },
    { name: "Fearful", color: "#D500F9" },
    { name: "Scared", color: "#AA00FF" },
    { name: "Disturbed", color: "#9575CD" },
    { name: "Troubled", color: "#7E57C2" },
    { name: "Hesitant", color: "#673AB7" },
    { name: "Uncertain", color: "#5E35B1" },
    { name: "Intimidated", color: "#512DA8" },
    { name: "Vulnerable", color: "#4527A0" },
    { name: "Frantic", color: "#311B92" }
];

let selectedEmotions = [];
const MAX_EMOTIONS = 2;

function initEmotionCarousel() {
    const carouselContainer = document.querySelector('.emotion-carousel');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');

    carouselContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    let currentSlide = 0;
    const emotionsPerSlide = 6;
    const totalSlides = Math.ceil(emotionsList.length / emotionsPerSlide);

    for (let i = 0; i < totalSlides; i++) {
        const slide = document.createElement('div');
        slide.className = 'emotion-slide';
        if (i === 0) {
            slide.classList.add('active');
        }

        for (let j = 0; j < emotionsPerSlide; j++) {
            const index = i * emotionsPerSlide + j;
            if (index < emotionsList.length) {
                const emotion = emotionsList[index];
                const button = document.createElement('button');
                button.className = 'emotion-btn';
                button.textContent = emotion.name;
                button.dataset.name = emotion.name;
                button.dataset.color = emotion.color;

                button.style.borderLeft = `4px solid ${emotion.color}`;
                button.style.color = emotion.color;

                slide.appendChild(button);
            }
        }

        carouselContainer.appendChild(slide);
    }

    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.dataset.slide = i;

        indicator.addEventListener('click', () => {
            goToSlide(i);
        });

        indicatorsContainer.appendChild(indicator);
    }

    function updateSlides() {
        const allSlides = document.querySelectorAll('.emotion-slide');
        allSlides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        if (currentSlide >= totalSlides) currentSlide = 0;
        updateSlides();
    }

    prevButton.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    nextButton.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    updateSlides();
    setupEmotionButtons();
}

function initializeHeart() {
    const tank = document.querySelector('.tank');
    const waveElements = document.querySelectorAll('.wave');
    const heartElement = document.querySelector('.heart');
    const heartSparkle = document.querySelector('.heart-sparkle');
    const selectedEmotionsContainer = document.querySelector('.selected-emotions');
    const fillSound = document.getElementById('fill-sound');
    const curve = document.querySelector('.curve');

    let currentFillLevel = 0;
    let targetLevel = 0;
    let isAnimating = false;

    function blendColors(colors) {
        if (colors.length === 0) return 'rgba(174, 196, 238, 0.5)'; 
        if (colors.length === 1) return colors[0];

        const rgbColors = colors.map(color => {
            if (color.startsWith('#')) {
                const r = parseInt(color.slice(1, 3), 16);
                const g = parseInt(color.slice(3, 5), 16);
                const b = parseInt(color.slice(5, 7), 16);
                return [r, g, b];
            } else if (color.startsWith('rgb')) {
                const match = color.match(/\d+/g);
                return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
            }
            return [174, 196, 238]; 
        });

        let r = 0, g = 0, b = 0;
        for (let i = 0; i < rgbColors.length; i++) {
            r += rgbColors[i][0];
            g += rgbColors[i][1];
            b += rgbColors[i][2];
        }

        r = Math.round(r / rgbColors.length);
        g = Math.round(g / rgbColors.length);
        b = Math.round(b / rgbColors.length);

        return `rgba(${r}, ${g}, ${b}, 0.8)`;
    }

    function createStars() {
        const heartRect = heartElement.getBoundingClientRect();
        const centerX = heartRect.left + heartRect.width / 2;
        const centerY = heartRect.top + heartRect.height / 2;

        const colors = selectedEmotions.map(e => e.color);
        const blendedColor = blendColors(colors);

        for (let i = 0; i < 12; i++) {
            const star = document.createElement('div');
            star.className = 'star-particle';

            const size = 5 + Math.random() * 10;
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 120;
            const duration = 1 + Math.random() * 2;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            const rotation = Math.random() * 360;

            star.style.left = `${centerX}px`;
            star.style.top = `${centerY}px`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.backgroundColor = blendedColor;

            star.style.setProperty('--end-x', `${endX}px`);
            star.style.setProperty('--end-y', `${endY}px`);
            star.style.setProperty('--rotation', `${rotation}deg`);
            star.style.animation = `starFly ${duration}s ease-out forwards`;

            document.body.appendChild(star);
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, duration * 1000);
        }

        heartSparkle.style.opacity = 1;
        setTimeout(() => {
            heartSparkle.style.opacity = 0;
        }, 2000);
    }

    function updateSelectedEmotionsUI() {
        selectedEmotionsContainer.innerHTML = '';

        selectedEmotions.forEach(emotion => {
            const pill = document.createElement('div');
            pill.className = 'selected-emotion-pill';
            pill.textContent = emotion.name;
            pill.style.borderLeft = `4px solid ${emotion.color}`;
            pill.style.color = emotion.color;

            const removeBtn = document.createElement('span');
            removeBtn.className = 'remove-emotion';
            removeBtn.textContent = '×';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleEmotion(emotion.name, emotion.color);
            });

            pill.appendChild(removeBtn);
            selectedEmotionsContainer.appendChild(pill);
        });

        const allButtons = document.querySelectorAll('.emotion-btn');
        allButtons.forEach(button => {
            const isSelected = selectedEmotions.some(e => e.name === button.dataset.name);
            button.classList.toggle('selected', isSelected);

            if (isSelected) {
                button.style.transform = 'translateY(-5px) scale(1.05)';
                button.style.boxShadow = '0 5px 15px rgba(233, 154, 255, 0.4)';
            } else {
                button.style.transform = '';
                button.style.boxShadow = '';
            }
        });
    }

    function updateHeartFill() {
        targetLevel = (selectedEmotions.length / MAX_EMOTIONS);

        const colors = selectedEmotions.map(e => e.color);
        const blendedColor = blendColors(colors);

        document.documentElement.style.setProperty('--emotion-color', blendedColor);

        waveElements.forEach(wave => {
            gsap.to(wave, { 
                attr: { fill: blendedColor },
                duration: 0.8,
                ease: "power2.inOut"
            });
        });

        if (!isAnimating) {
            isAnimating = true;

            const heartTimeline = gsap.timeline();
            heartTimeline.to(heartElement, {
                scale: 1.15,
                translateY: -5,
                duration: 0.3,
                ease: "back.out(1.7)"
            });

            const targetHeight = targetLevel * 100;

            gsap.to(tank, {
                height: `${targetHeight}%`,
                backgroundColor: blendedColor,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
                delay: 0.1
            });

            gsap.to(curve, {
                bottom: `calc(-1 * var(--cruve-height) + ${targetHeight}%)`,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.1
            });

            gsap.to('.wave-group', {
                scaleX: 1.1,
                duration: 0.4,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut",
                delay: 0.2
            });

            if (targetLevel === 1 && currentFillLevel < 1) {
                fillSound.currentTime = 0;
                fillSound.play().catch(error => {
                    console.warn('Failed to play sound:', error);
                });

                setTimeout(() => {
                    createStars();
                }, 800);
            }

            heartTimeline.to(heartElement, {
                scale: 1,
                translateY: 0,
                duration: 0.5,
                delay: 0.3,
                ease: "elastic.out(1, 0.3)",
                onComplete: function() {
                    isAnimating = false;
                    currentFillLevel = targetLevel;

                    if (targetLevel >= 1) {
                        gsap.to(heartElement, {
                            scale: 1.05,
                            duration: 0.8,
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut"
                        });
                    }
                }
            });
        }
    }

    function createBubbles(count, color) {
        const convertedColor = color.startsWith('#') 
            ? hexToRgba(color, 0.6) 
            : color;

        for (let i = 0; i < count; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';

            const size = 4 + Math.random() * 6;
            const posX = 10 + Math.random() * 60;
            const delay = Math.random() * 2;
            const opacity = 0.3 + Math.random() * 0.4;

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${posX}%`;
            bubble.style.bottom = '5%';
            bubble.style.opacity = opacity;
            bubble.style.backgroundColor = convertedColor;
            bubble.style.animationDelay = `${delay}s`;

            heartElement.appendChild(bubble);

            setTimeout(() => {
                if (bubble && bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, 4000 + delay * 1000);
        }
    }

    function hexToRgba(hex, alpha = 1) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    document.querySelector('.heart-wrap').addEventListener('click', function() {
        if (!isAnimating) {
            selectedEmotions = [];
            updateSelectedEmotionsUI();

            targetLevel = 0;
            currentFillLevel = 0;

            gsap.killTweensOf(heartElement);

            isAnimating = true;

            gsap.to(heartElement, {
                scaleY: 0.9,
                scaleX: 1.1,
                duration: 0.3,
                ease: "power2.in"
            });

            gsap.to(tank, {
                height: 0,
                duration: 0.8,
                ease: "power4.in",
                delay: 0.1
            });

            gsap.to(curve, {
                bottom: `calc(-1 * var(--cruve-height))`,
                duration: 0.8,
                ease: "power2.in",
                delay: 0.1
            });

            const bubbles = document.querySelectorAll('.bubble');
            bubbles.forEach(bubble => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            });

            gsap.to(heartElement, {
                scale: 1,
                scaleY: 1,
                scaleX: 1,
                duration: 0.5,
                delay: 0.4,
                ease: "elastic.out(1, 0.3)",
                onComplete: function() {
                    isAnimating = false;
                }
            });
        }
    });

    document.addEventListener('emotionToggled', function(e) {
        updateSelectedEmotionsUI();
        updateHeartFill();

        if (selectedEmotions.length > 0) {
            createBubbles(3, selectedEmotions[selectedEmotions.length - 1].color);
        }
    });
}

function setupEmotionButtons() {
    const selectionSound = document.getElementById('selection-sound');

    const emotionButtons = document.querySelectorAll('.emotion-btn');
    emotionButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.2s ease';
            }
        });

        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
            }
        });

        button.addEventListener('click', function() {

            selectionSound.currentTime = 0;
            selectionSound.play().catch(error => {
                console.warn('Failed to play sound:', error);
            });

            const emotion = this.dataset.name;
            const color = this.dataset.color;

            toggleEmotion(emotion, color);

            gsap.to(this, {
                scale: 1.2,
                duration: 0.3,
                ease: "back.out(1.7)",
                onComplete: () => {
                    gsap.to(this, {
                        scale: this.classList.contains('selected') ? 1.05 : 1,
                        duration: 0.2,
                        boxShadow: this.classList.contains('selected') ? '0 5px 15px rgba(255, 255, 255, 0.3)' : ''
                    });
                }
            });
        });
    });
}

function toggleEmotion(emotion, color) {
    const existing = selectedEmotions.findIndex(e => e.name === emotion);

    if (existing >= 0) {

        selectedEmotions.splice(existing, 1);
    } else {

        if (selectedEmotions.length < MAX_EMOTIONS) {
            selectedEmotions.push({ name: emotion, color: color });
        } else {

            selectedEmotions.shift();
            selectedEmotions.push({ name: emotion, color: color });
        }
    }

    document.dispatchEvent(new CustomEvent('emotionToggled', { 
        detail: { name: emotion, color: color }
    }));
}

function updateGreeting() {
    const greetingElement = document.getElementById('time-greeting');
    const currentHour = new Date().getHours();

    const greetings = {
        earlyMorning: [
            "Hello early bird! How are you feeling at this dawn hour?",
            "Good early morning! What emotions are stirring as the day begins?",
            "Dawn has broken! How's your heart feeling this early morning?"
        ],
        morning: [
            "Good morning sunshine! How are you feeling today?",
            "Rise and shine! What emotions are you experiencing this morning?",
            "Hello morning person! How's your emotional state today?"
        ],
        afternoon: [
            "Good afternoon! How's your day treating you emotionally?",
            "Hello there! What feelings are filling your afternoon?",
            "Afternoon greetings! How's your emotional palette today?"
        ],
        evening: [
            "Good evening! How are your feelings as the day winds down?",
            "Evening has arrived! What emotions are you experiencing?",
            "Hello there! How's your heart feeling this evening?"
        ],
        night: [
            "Hello night owl! How are you feeling this late hour?",
            "Burning the midnight oil? What emotions are keeping you company?",
            "Good night-time! How's your emotional state at this hour?"
        ]
    };

    let timeGreetings;
    if (currentHour < 5) {
        timeGreetings = greetings.night;
    } else if (currentHour < 8) {
        timeGreetings = greetings.earlyMorning;
    } else if (currentHour < 12) {
        timeGreetings = greetings.morning;
    } else if (currentHour < 17) {
        timeGreetings = greetings.afternoon;
    } else if (currentHour < 21) {
        timeGreetings = greetings.evening;
    } else {
        timeGreetings = greetings.night;
    }

    const randomIndex = Math.floor(Math.random() * timeGreetings.length);
    greetingElement.textContent = timeGreetings[randomIndex];
}

function startTypingAnimation() {
    const typingContainer = document.getElementById('typing-text');
    const message = "Everyone has a bucket. How do you fill yours today?";

    typingContainer.innerHTML = '<span id="typewriter-text"></span><span class="caret">|</span>';

    const typewriterText = document.getElementById('typewriter-text');
    const caret = document.querySelector('.caret');

    let index = 0;

    function typeWriter() {
        if (index < message.length) {
            let currentChar = message.charAt(index);

            if (currentChar === "<") {
                const brTag = message.slice(index, index + 4);
                if (brTag === "<br>") {
                    typewriterText.innerHTML += brTag;
                    index += 4;
                    setTimeout(typeWriter, 1000);
                    return;
                }
            }

            typewriterText.innerHTML += currentChar;
            index++;

            if (currentChar === "." || currentChar === ",") {
                setTimeout(typeWriter, 1000);
            } else {
                setTimeout(typeWriter, 50);
            }
        } else {

            caret.style.animation = 'blink-caret 0.75s step-end infinite';
        }
    }

    setTimeout(typeWriter, 1000);
}

function enhanceElementEffects() {
    const titleImg = document.querySelector('.title-img');

    if (titleImg) {
        titleImg.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 25px var(--pastel-pink))';
        });

        titleImg.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    }
}