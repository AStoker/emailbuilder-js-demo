import React from 'react';
import ReactDOM from 'react-dom/client';

import r2wc from '@r2wc/react-to-web-component'

import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import theme from './theme';

export function EmailBuilderApp() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <EmailBuilderApp />
// );

const EmailBuilderWebComponent = r2wc(EmailBuilderApp);
customElements.define('email-builder', EmailBuilderWebComponent);