// Main application code
document.addEventListener('DOMContentLoaded', async function() {
    // DOM elements
    const slideContainer = document.getElementById('slide-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const slideCounter = document.getElementById('slide-counter');
    const slideThumbnails = document.getElementById('slide-thumbnails');
    
    let currentSlideIndex = 0;
    let slides = [];
    
    // Initialize the presentation
    async function initPresentation() {
        try {
            // Fetch available slides
            slides = await window.SlideManager.getSlides();
            
            if (slides.length === 0) {
                slideContainer.innerHTML = '<div class="error">No slides found! Please add markdown slides to the /slides directory.</div>';
                return;
            }
            
            // Load the first slide
            loadSlide(0);
            
            // Update slide counter
            updateSlideCounter();
            
            // Generate thumbnails
            generateThumbnails();
            
            // Check if there's a slide index in the URL hash
            checkHashForSlide();
            
            // Setup event listeners
            setupEventListeners();
        } catch (error) {
            console.error('Failed to initialize presentation:', error);
            slideContainer.innerHTML = `<div class="error">Failed to load slides: ${error.message}</div>`;
        }
    }
      // Load a specific slide by index
    async function loadSlide(index) {
        if (index < 0 || index >= slides.length) {
            return;
        }
        
        try {
            currentSlideIndex = index;
            
            // Add fade-out effect
            slideContainer.style.opacity = '0';
            
            // Parse the markdown content
            const slideContent = await window.SlideManager.getSlideContent(slides[index].id);
            const parsedContent = marked.parse(slideContent);
            
            // Create a slide div
            const slideDiv = document.createElement('div');
            slideDiv.className = 'slide';
            slideDiv.innerHTML = parsedContent;
            
            // Wait for fade-out to complete
            setTimeout(() => {
                // Clear the container and add the new slide
                slideContainer.innerHTML = '';
                slideContainer.appendChild(slideDiv);
                
                // Apply syntax highlighting to code blocks
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
                
                // Update the URL hash
                window.location.hash = slides[index].id;
                
                // Update slide counter
                updateSlideCounter();
                
                // Update active thumbnail
                updateActiveThumbnail();
                
                // Apply responsive table attributes for mobile
                applyResponsiveTableAttributes();
                
                // Fade in the new slide
                slideContainer.style.opacity = '1';
            }, 300);
        } catch (error) {
            console.error(`Failed to load slide ${index}:`, error);
            slideContainer.innerHTML = `<div class="error">Failed to load slide ${index + 1}: ${error.message}</div>`;
            slideContainer.style.opacity = '1';
        }
    }
    
    // Apply responsive table attributes for mobile devices
    function applyResponsiveTableAttributes() {
        document.querySelectorAll('table').forEach(table => {
            // Get header text
            const headerCells = table.querySelectorAll('th');
            const headerTexts = Array.from(headerCells).map(cell => cell.textContent.trim());
            
            // Add data-label attributes to td elements
            table.querySelectorAll('tbody tr').forEach(row => {
                row.querySelectorAll('td').forEach((cell, index) => {
                    if (index < headerTexts.length) {
                        cell.setAttribute('data-label', headerTexts[index]);
                    }
                });
            });
        });
    }
    
    // Update the slide counter display
    function updateSlideCounter() {
        slideCounter.textContent = `${currentSlideIndex + 1}/${slides.length}`;
    }
    
    // Generate thumbnails for all slides
    async function generateThumbnails() {
        slideThumbnails.innerHTML = '';
        
        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            const thumbnail = document.createElement('div');
            thumbnail.className = 'slide-thumbnail';
            thumbnail.dataset.index = i;
            thumbnail.textContent = slide.title || `Slide ${i + 1}`;
            
            thumbnail.addEventListener('click', () => {
                loadSlide(i);
            });
            
            slideThumbnails.appendChild(thumbnail);
        }
        
        updateActiveThumbnail();
    }
    
    // Update which thumbnail is active
    function updateActiveThumbnail() {
        document.querySelectorAll('.slide-thumbnail').forEach((thumb, idx) => {
            if (idx === currentSlideIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
    
    // Check for a slide ID in the URL hash
    function checkHashForSlide() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const slideIndex = slides.findIndex(slide => slide.id === hash);
            if (slideIndex !== -1) {
                loadSlide(slideIndex);
            }
        }
    }
    
    // Navigate to the previous slide
    function prevSlide() {
        if (currentSlideIndex > 0) {
            loadSlide(currentSlideIndex - 1);
        }
    }
    
    // Navigate to the next slide
    function nextSlide() {
        if (currentSlideIndex < slides.length - 1) {
            loadSlide(currentSlideIndex + 1);
        }
    }
    
    // Toggle thumbnails visibility
    function toggleThumbnails() {
        const nav = document.querySelector('.slide-navigation');
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    }
    
    // Show keyboard shortcuts help
    function showKeyboardShortcuts() {
        // Create overlay if it doesn't exist
        let overlay = document.querySelector('.shortcuts-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'shortcuts-overlay';
            
            const content = document.createElement('div');
            content.className = 'shortcuts-content';
            content.innerHTML = `
                <h2>Keyboard Shortcuts</h2>
                <table>
                    <tr>
                        <th>Key</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>Left Arrow / Page Up / Up Arrow</td>
                        <td>Previous Slide</td>
                    </tr>
                    <tr>
                        <td>Right Arrow / Page Down / Down Arrow / Space</td>
                        <td>Next Slide</td>
                    </tr>
                    <tr>
                        <td>Home</td>
                        <td>First Slide</td>
                    </tr>
                    <tr>
                        <td>End</td>
                        <td>Last Slide</td>
                    </tr>
                    <tr>
                        <td>T</td>
                        <td>Toggle Thumbnails</td>
                    </tr>
                    <tr>
                        <td>?</td>
                        <td>Show/Hide Keyboard Shortcuts</td>
                    </tr>
                    <tr>
                        <td>Esc</td>
                        <td>Close Dialogs / Overlays</td>
                    </tr>
                </table>
                <p style="margin-top: 20px; text-align: center;">Press any key to close</p>
            `;
            
            overlay.appendChild(content);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                overlay.style.display = 'none';
            });
        }
        
        overlay.style.display = 'flex';
    }
      // Setup event listeners
    function setupEventListeners() {
        // Button navigation
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Thumbnail button
        const thumbnailsBtn = document.getElementById('thumbnails-btn');
        if (thumbnailsBtn) {
            thumbnailsBtn.addEventListener('click', toggleThumbnails);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            switch (e.key) {
                case 'ArrowLeft':
                case 'PageUp':
                case 'ArrowUp':
                    prevSlide();
                    break;
                case 'ArrowRight':
                case 'PageDown':
                case 'ArrowDown':
                case ' ':
                    nextSlide();
                    break;
                case 'Home':
                    loadSlide(0);
                    break;
                case 'End':
                    loadSlide(slides.length - 1);
                    break;
                case 't':
                case 'T':
                    toggleThumbnails();
                    break;
                case '?':
                    showKeyboardShortcuts();
                    break;
                case 'Escape':
                    // Close any open overlays
                    document.querySelectorAll('.shortcuts-overlay').forEach(el => {
                        el.style.display = 'none';
                    });
                    const slideNavigation = document.querySelector('.slide-navigation');
                    if (slideNavigation && slideNavigation.style.display === 'block') {
                        slideNavigation.style.display = 'none';
                    }
                    break;
            }
        });
        
        // Handle hash changes
        window.addEventListener('hashchange', checkHashForSlide);
        
        // Handle window resize
        window.addEventListener('resize', function() {
            // Adjust any UI elements if needed when window resizes
        });
    }
    
    // Initialize the presentation
    initPresentation();
});
