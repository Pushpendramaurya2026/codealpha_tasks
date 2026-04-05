const items = document.querySelectorAll('.gallery-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let currentIndex = 0;
let visibleImages = [...items]; // Tracks currently filtered images

// 1. Filtering Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        document.querySelector('.active').classList.remove('active');
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        
        visibleImages = []; // Reset visible list
        items.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                visibleImages.push(item);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// 2. Lightbox Navigation
const showImage = (index) => {
    if (index >= visibleImages.length) index = 0;
    if (index < 0) index = visibleImages.length - 1;
    currentIndex = index;
    const imgUrl = visibleImages[currentIndex].querySelector('img').src;
    lightboxImg.src = imgUrl;
    lightbox.style.display = 'flex';
};

// Open on click
items.forEach((item) => {
    item.addEventListener('click', () => {
        const indexInVisible = visibleImages.indexOf(item);
        showImage(indexInVisible);
    });
});

// Close
closeBtn.onclick = () => lightbox.style.display = 'none';

// Next/Prev
nextBtn.onclick = () => showImage(currentIndex + 1);
prevBtn.onclick = () => showImage(currentIndex - 1);

// Close on background click
lightbox.onclick = (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
};