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

import { resetDocument, useInspectorDrawerOpen } from '../../../documents/editor/EditorContext';
import { INSPECTOR_DRAWER_WIDTH } from '../../InspectorDrawer';
// TODO: Resume Wednesday. The height is off on the dialogs when the window is short.
/* TODO:
 Also need to do:
 - color box doesn't expand properly
 - Odd times selecting a container to add something to it the box doesn't get the right styles
*/

import validateJsonStringValue from './validateJsonStringValue';

type ImportJsonDialogProps = {
  onClose: () => void;
};
export default function ImportJsonDialog({ onClose }: ImportJsonDialogProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showExample, setShowExample] = useState(false);
  const inspectorDrawerOpen = useInspectorDrawerOpen();

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

  // Calculate the offset for centering in the available editor space
  const dialogOffset = inspectorDrawerOpen ? -(INSPECTOR_DRAWER_WIDTH / 2) : 0;

  return (
    <>
      <Dialog 
        open 
        onClose={onClose}
        sx={{
          '& .MuiDialog-container': {
            transform: `translateX(${dialogOffset}px)`,
          },
        }}
      >
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
        <ExampleJsonDialog 
          onClose={() => setShowExample(false)} 
          inspectorDrawerOpen={inspectorDrawerOpen}
        />
      )}
    </>
  );
}

function ExampleJsonDialog({ 
  onClose, 
  inspectorDrawerOpen 
}: { 
  onClose: () => void; 
  inspectorDrawerOpen: boolean;
}) {
  const dialogOffset = inspectorDrawerOpen ? -(INSPECTOR_DRAWER_WIDTH / 2) : 0;

  return (
    <Dialog 
      open 
      onClose={onClose}
      sx={{
        '& .MuiDialog-container': {
          transform: `translateX(${dialogOffset}px)`,
        },
      }}
    >
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