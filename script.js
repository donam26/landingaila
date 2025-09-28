// Poster data and functionality
const posters = [
    {
        src: 'poster1.png',
        title: 'Lịch sử ngàn năm',
        description: 'Huyền thoại anh hùng',
        alt: 'Traditional Ải Lao Festival Poster'
    },
    {
        src: 'poster2.png',
        title: 'Nguồn gốc Ải Lao',
        description: 'Truyền thống ngàn năm',
        alt: 'Gióng Festival Hero Legend Poster'
    },
    {
        src: 'poster3.png',
        title: 'Di sản văn hóa',
        description: 'Bảo tồn và phát triển',
        alt: 'Cultural Heritage Preservation Poster'
    },
    {
        src: 'poster4.png',
        title: 'Lễ rước thánh trong ánh nắng',
        description: 'Bảo tồn và phát triển',
        alt: 'Cultural Heritage Preservation Poster'
    },
];

let currentPosterIndex = 0;
let autoSlideInterval;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    startAutoSlide();
    addEventListeners();
    setupScrollAnimations();
    initializeLightbox();

    const posterImg = document.getElementById('current-poster');
    posterImg.addEventListener('error', () => {
        // Create a placeholder if image fails to load
        posterImg.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #8B4513, #A0522D);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFD700;
            font-size: 1.2rem;
            text-align: center;
            font-family: 'Playfair Display', serif;
        `;
        placeholder.innerHTML = 'Ải Lao<br>Festival';
        posterImg.parentNode.appendChild(placeholder);
    });
});

function initializePage() {
    // Set initial poster
    updatePosterDisplay();

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Initialize particles animation
    initializeParticles();

    // Add entrance animations
    addEntranceAnimations();
}

function addEntranceAnimations() {
    // Animate header elements
    const headerContent = document.querySelector('.header-content');
    const posterContainer = document.querySelector('.poster-container');
    const ctaSection = document.querySelector('.cta-section');

    // Add animation classes
    headerContent.style.opacity = '0';
    headerContent.style.transform = 'translateY(-30px)';

    posterContainer.style.opacity = '0';
    posterContainer.style.transform = 'scale(0.9)';

    ctaSection.style.opacity = '0';
    ctaSection.style.transform = 'translateY(30px)';

    // Animate in sequence
    setTimeout(() => {
        headerContent.style.transition = 'all 1s ease-out';
        headerContent.style.opacity = '1';
        headerContent.style.transform = 'translateY(0)';
    }, 300);

    setTimeout(() => {
        posterContainer.style.transition = 'all 0.8s ease-out';
        posterContainer.style.opacity = '1';
        posterContainer.style.transform = 'scale(1)';
    }, 800);

    setTimeout(() => {
        ctaSection.style.transition = 'all 0.8s ease-out';
        ctaSection.style.opacity = '1';
        ctaSection.style.transform = 'translateY(0)';
    }, 1300);
}

function updatePosterDisplay() {
    const posterImg = document.getElementById('current-poster');
    const posterTitle = document.querySelector('.poster-title');
    const posterDescription = document.querySelector('.poster-description');
    const indicators = document.querySelectorAll('.indicator');

    const currentPoster = posters[currentPosterIndex];

    // Update poster with fade effect
    posterImg.style.opacity = '0';

    setTimeout(() => {
        posterImg.src = currentPoster.src;
        posterImg.alt = currentPoster.alt;
        posterTitle.textContent = currentPoster.title;
        posterDescription.textContent = currentPoster.description;
        posterImg.style.opacity = '1';
    }, 300);

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentPosterIndex);
    });
}

function changePoster(direction) {
    // Stop auto-slide temporarily
    clearInterval(autoSlideInterval);

    // Update index
    currentPosterIndex += direction;

    if (currentPosterIndex >= posters.length) {
        currentPosterIndex = 0;
    } else if (currentPosterIndex < 0) {
        currentPosterIndex = posters.length - 1;
    }

    updatePosterDisplay();

    // Restart auto-slide after user interaction
    setTimeout(() => {
        startAutoSlide();
    }, 5000);
}

function goToPoster(index) {
    clearInterval(autoSlideInterval);
    currentPosterIndex = index;
    updatePosterDisplay();

    setTimeout(() => {
        startAutoSlide();
    }, 5000);
}

function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        changePoster(1);
    }, 3000);
}

function addEventListeners() {
    // Indicator click events
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToPoster(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changePoster(-1);
        } else if (e.key === 'ArrowRight') {
            changePoster(1);
        } else if (e.key === 'Enter' || e.key === ' ') {
            enterMainSite();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const posterDisplay = document.querySelector('.poster-display');

    posterDisplay.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    posterDisplay.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changePoster(1); // Swipe left - next poster
            } else {
                changePoster(-1); // Swipe right - previous poster
            }
        }
    }

    // Pause auto-slide on hover
    const posterContainer = document.querySelector('.poster-container');
    posterContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    posterContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

function initializeParticles() {
    const particles = document.querySelectorAll('.particle');

    particles.forEach(particle => {
        // Randomize particle properties
        const size = Math.random() * 4 + 2;
        const animationDuration = Math.random() * 4 + 6;
        const delay = Math.random() * 8;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = animationDuration + 's';
        particle.style.animationDelay = delay + 's';

        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
    });
}

function enterMainSite() {
    // Add exit animation
    const container = document.querySelector('.container');
    container.style.transition = 'all 0.8s ease-out';
    container.style.opacity = '0';
    container.style.transform = 'scale(0.95)';

    // Show loading message
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 1000;
            color: #FFD700;
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
        ">
            <div style="margin-bottom: 20px;">Đang chuyển hướng...</div>
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255, 215, 0, 0.3);
                border-top: 3px solid #FFD700;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            "></div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;

    document.body.appendChild(loadingDiv);

    // Simulate navigation to main site
    setTimeout(() => {
        // Replace with actual navigation
        alert('Chuyển hướng đến trang chính của website Ải Lao!\n\nThay thế dòng này bằng: window.location.href = "main-site.html";');
        // window.location.href = 'main-site.html';
    }, 2000);
}

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const decorativeElements = document.querySelectorAll('.pattern-left, .pattern-right');

    decorativeElements.forEach((element, index) => {
        const speed = (index + 1) * 0.02;
        const x = (e.clientX * speed);
        const y = (e.clientY * speed);

        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});



// Smooth scrolling for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: Lazy load background image
function loadBackgroundImage() {
    const img = new Image();
    img.onload = function() {
        document.querySelector('.background-overlay').style.backgroundImage = `url('${this.src}')`;
    };
    img.src = 'backgrnew.png';
}

// Load background image after page load
window.addEventListener('load', loadBackgroundImage);


// Scroll animations for info sections
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.info-section, .gallery-section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
}

// Lightbox functionality
function initializeLightbox() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('modal-caption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeModal = document.querySelector('.close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.querySelector('img').src;
            captionText.innerHTML = this.querySelector('img').alt;
        });
    });

    closeModal.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

