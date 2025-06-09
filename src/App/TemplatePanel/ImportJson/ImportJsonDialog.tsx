import React, { useState } from 'react';

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import { resetDocument } from '../../../documents/editor/EditorContext';

import validateJsonStringValue from './validateJsonStringValue';

type ImportJsonDialogProps = {
  onClose: () => void;
};
export default function ImportJsonDialog({ onClose }: ImportJsonDialogProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showExample, setShowExample] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (ev) => {
    const v = ev.currentTarget.value;
    setValue(v);
    const { error } = validateJsonStringValue(v);
    setError(error ?? null);
  };

  let errorAlert = null;
  if (error) {
    errorAlert = <Alert color="error">{error}</Alert>;
  }

  return (
    <>
      <Dialog open onClose={onClose}>
        <DialogTitle>Import JSON</DialogTitle>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            const { error, data } = validateJsonStringValue(value);
            setError(error ?? null);
            if (!data) {
              return;
            }
            resetDocument(data);
            onClose();
          }}
        >
          <DialogContent>
            <Typography color="text.secondary" paragraph>
              Copy and paste an EmailBuilder.js JSON (
              <Link
                component="button"
                type="button"
                onClick={() => setShowExample(true)}
                underline="none"
              >
                example
              </Link>
              ).
            </Typography>
            {errorAlert}
            <TextField
              error={error !== null}
              value={value}
              onChange={handleChange}
              type="text"
              helperText="This will override your current template."
              variant="outlined"
              fullWidth
              rows={10}
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={error !== null}>
              Import
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      
      {showExample && (
        <ExampleJsonDialog onClose={() => setShowExample(false)} />
      )}
    </>
  );
}

function ExampleJsonDialog({ onClose }: { onClose: () => void }) {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Example JSON</DialogTitle>
      <DialogContent>
        <Typography color="text.secondary" paragraph>
          This is an example of a valid EmailBuilder.js JSON.
        </Typography>
        <pre>
          {`{
  "root": {
    "type": "EmailLayout",
    "data": {
      "backdropColor": "#F5F5F5",
      "canvasColor": "#FFFFFF",
      "textColor": "#262626",
      "fontFamily": "MODERN_SANS",
      "childrenIds": [
        "block-1713199011299"
      ]
    }
  },
  "block-1713199011299": {
    "type": "Text",
    "data": {
      "style": {
        "fontWeight": "normal",
        "padding": {
          "top": 16,
          "bottom": 16,
          "right": 24,
          "left": 24
        }
      },
      "props": {
        "text": "Hello world"
      }
    }
  }
}`}
        </pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}