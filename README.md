# Fast Transients LLC - Presentation System

A modern, web-based slide presentation system built with HTML, CSS, and JavaScript for Fast Transients LLC. The slides are written in Markdown, making them easy to create and update.

## Features

- Modern, web-based slide presentation system
- Slides written in Markdown for easy content management
- Navigation with keyboard shortcuts and intuitive button controls
- Visual thumbnail gallery for quick slide access
- Fully responsive design optimized for all devices
- Perfect for GitHub Pages deployment
- Professional transitions and animations
- Subtle background patterns for enhanced visual appeal
- Company logo and branding integration
- Direct links to specific slides using URL hash

## Getting Started

### Using the Presentation

1. Navigate between slides:
   - Use arrow keys (Left/Right)
   - Click the Previous/Next buttons
   - Press 'T' to show thumbnails and click on a slide
   - Press '?' to show all keyboard shortcuts

### Creating Your Own Slides

1. Create new markdown (.md) files in the `slides` directory
2. Update the `slides/index.json` file to include your new slides:

```json
{
  "slides": [
    {
      "id": "your-slide-id",
      "title": "Your Slide Title",
      "filename": "your-slide-id.md",
      "order": 1
    },
    // Add more slides...
  ]
}
```

3. Write your slide content in Markdown format
4. Include images and other visual assets in the images directory
5. No need to add navigation links in the slide content - the system handles navigation automatically

### Customizing

- Edit the `css/styles.css` file to change the appearance
- Modify the JavaScript files in the `js` directory to add new features

## Deploying to GitHub Pages

1. Push your repository to GitHub
2. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Set the Source to your desired branch
   - Save the changes

Your presentation will be available at `https://yourusername.github.io/yourrepository/`

## Keyboard Shortcuts

- Left Arrow / Page Up / Up Arrow: Previous slide
- Right Arrow / Page Down / Down Arrow / Space: Next slide
- Home: Go to first slide
- End: Go to last slide
- T: Toggle thumbnails view
- ?: Show keyboard shortcuts help
- Escape: Close overlays and menus

You can also use the on-screen navigation controls, including the thumbnails button (☰).

## License

This project is open source and available under the [MIT License](LICENSE).

## About Fast Transients LLC

This presentation showcases Fast Transients LLC, a company focused on accelerating business decision cycles with AI automation. The slides cover:

- Company introduction and mission
- Market impact and growth statistics
- Technology stack and integration benefits
- Target markets and implementation strategies
- Next steps and action plan

## Credits

- [Marked.js](https://marked.js.org/) for Markdown parsing
- [Highlight.js](https://highlightjs.org/) for syntax highlighting
- Last updated: May 8, 2025
