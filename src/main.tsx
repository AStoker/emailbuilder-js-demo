import React from 'react';
import ReactDOM from 'react-dom/client';
import createCache, { EmotionCache } from '@emotion/cache';

import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import theme from './theme';
import { CacheProvider } from '@emotion/react';

export function EmailBuilderApp({ cache }: { cache: EmotionCache }) {
  return (
    <CacheProvider value={cache}>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </CacheProvider>
  );
}

class EmailBuilderWebComponent extends HTMLElement {
  private cache: EmotionCache | undefined;
  private reactRoot: ReactDOM.Root | undefined;

  connectedCallback() {
    // Create shadow DOM
    const shadowRoot = this.attachShadow({ mode: 'open' });
    
    // Create Emotion cache with shadow DOM container
    this.cache = createCache({
      key: 'css',
      prepend: true,
      container: shadowRoot as any
    });

    console.log('EmailBuilderWebComponent connected');

    // Create a container div for React
    const container = document.createElement('div');
    container.style.height = '100%';
    container.style.overflow = 'auto';
    container.id = 'email-builder-react-container';
    shadowRoot.appendChild(container);

    // Create React root and render
    this.reactRoot = ReactDOM.createRoot(container);
    this.reactRoot.render(<EmailBuilderApp cache={this.cache} />);
  }

  disconnectedCallback() {
    // Clean up when component is removed
    if (this.reactRoot) {
      this.reactRoot.unmount();
    }
  }
}

customElements.define('email-builder', EmailBuilderWebComponent);