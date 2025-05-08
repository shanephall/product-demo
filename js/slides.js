// Slide Manager - handles loading and managing slide content
window.SlideManager = (function() {
    // Slide information cache
    let slidesCache = null;
    let slideContentCache = {};
    
    // Get information about all available slides
    async function getSlides() {
        if (slidesCache !== null) {
            return slidesCache;
        }
        
        try {
            const response = await fetch('slides/index.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch slides index: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            slidesCache = data.slides;
            return slidesCache;
        } catch (error) {
            console.error('Error fetching slides:', error);
            
            // If the index.json doesn't exist, try to detect markdown files directly
            try {
                const fallbackSlides = await detectSlidesFromDirectory();
                slidesCache = fallbackSlides;
                return fallbackSlides;
            } catch (fallbackError) {
                console.error('Failed to detect slides from directory:', fallbackError);
                return [];
            }
        }
    }
    
    // Get a specific slide's content by ID
    async function getSlideContent(slideId) {
        // Check cache first
        if (slideContentCache[slideId]) {
            return slideContentCache[slideId];
        }
        
        try {
            const response = await fetch(`slides/${slideId}.md`);
            if (!response.ok) {
                throw new Error(`Failed to fetch slide content: ${response.status} ${response.statusText}`);
            }
            
            const content = await response.text();
            // Cache the content
            slideContentCache[slideId] = content;
            return content;
        } catch (error) {
            console.error(`Error fetching slide content for ${slideId}:`, error);
            throw error;
        }
    }
    
    // Fallback method to detect slides from directory if index.json doesn't exist
    async function detectSlidesFromDirectory() {
        // This is a fallback - since we can't directly scan the directory from the browser,
        // we'll generate a default set of slides if nothing is found
        
        const defaultSlides = [
            {
                id: 'welcome',
                title: 'Welcome to Markdown Slides',
                filename: 'welcome.md',
                order: 1
            },
            {
                id: 'how-to-use',
                title: 'How to Use This Presentation System',
                filename: 'how-to-use.md',
                order: 2
            },
            {
                id: 'markdown-features',
                title: 'Markdown Features',
                filename: 'markdown-features.md',
                order: 3
            },
            {
                id: 'conclusion',
                title: 'Conclusion',
                filename: 'conclusion.md',
                order: 4
            }
        ];
        
        return defaultSlides;
    }
    
    // Create a new slide in the slides directory
    async function createSlide(slideId, content) {
        // Note: This would typically be handled by a backend service
        // For GitHub Pages, you would need to commit the file to the repo
        console.error('Creating slides dynamically is not supported in this static demo.');
        return false;
    }
    
    // Update the order of slides
    async function updateSlideOrder(newOrder) {
        // Note: This would typically be handled by a backend service
        // For GitHub Pages, you would need to commit the changes to the repo
        console.error('Updating slide order dynamically is not supported in this static demo.');
        return false;
    }
    
    return {
        getSlides,
        getSlideContent,
        createSlide,
        updateSlideOrder
    };
})();
