# EmailBuilder Web Component Test

This is a simple HTML page to test the EmailBuilder web component.

## Setup

1. First, build the main EmailBuilder project:
   ```bash
   cd ..
   npm run build
   ```

2. Serve this test page:
   ```bash
   npm install
   npm run serve
   ```

3. Open http://localhost:8080 in your browser

## What it tests

- Basic web component loading and rendering
- Multiple instances of the component
- Component event handling
- Error handling

## Expected behavior

- The EmailBuilder should render as a web component
- Multiple instances should work independently
- Console should show "EmailBuilder web component is ready!" when loaded
- Any component changes should be logged to console