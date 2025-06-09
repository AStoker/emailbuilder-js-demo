import React from 'react';

import { AppRegistrationOutlined, LastPageOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { toggleInspectorDrawerOpen, useInspectorDrawerOpen } from '../../documents/editor/EditorContext';

export default function ToggleInspectorPanelButton() {
  const inspectorDrawerOpen = useInspectorDrawerOpen();

  const handleClick = () => {
    toggleInspectorDrawerOpen();
  };
  if (inspectorDrawerOpen) {
    return (
      <Tooltip title="Close inspector panel">
        <IconButton onClick={handleClick}>
          <LastPageOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Open inspector panel">
      <IconButton onClick={handleClick}>
        <AppRegistrationOutlined fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
