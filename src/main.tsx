import React from 'react';
// import ReactDOM from 'react-dom/client';
import createCache, { EmotionCache } from '@emotion/cache';

import r2wc from '@r2wc/react-to-web-component'

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

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <EmailBuilderApp />
// );

class EmailBuilderWebComponent extends HTMLElement {
  private cache: EmotionCache | undefined;
  private reactRoot: any;

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
    shadowRoot.appendChild(container);

    // Convert React component to work with shadow DOM
    const ReactComponent = r2wc(() => <EmailBuilderApp cache={this.cache!} />, {
      shadow: undefined, // We're handling shadow DOM ourselves
    });

    // Create and append the React web component
    const reactElement = new ReactComponent();
    container.appendChild(reactElement);
  }

  disconnectedCallback() {
    // Clean up when component is removed
    if (this.reactRoot) {
      this.reactRoot.unmount();
    }
  }
}
// const EmailBuilderWebComponent = r2wc(EmailBuilderApp, {
//   shadow: "open",
// });
customElements.define('email-builder', EmailBuilderWebComponent);