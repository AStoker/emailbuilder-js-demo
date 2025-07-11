import React from 'react';

import { Box, Stack, useTheme } from '@mui/material';

import { useInspectorDrawerOpen } from '../documents/editor/EditorContext';

import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from './InspectorDrawer';
import TemplatePanel from './TemplatePanel';

/**
 * Creates a CSS transition for the drawer.
 * @param cssProperty The CSS property to animate.
 * @param open Whether the drawer is open or closed.
 * @returns The transition CSS string.
 */
function useDrawerTransition(cssProperty: 'margin-left' | 'margin-right', open: boolean) {
  const { transitions } = useTheme();
  return transitions.create(cssProperty, {
    easing: !open ? transitions.easing.sharp : transitions.easing.easeOut,
    duration: !open ? transitions.duration.leavingScreen : transitions.duration.enteringScreen,
  });
}

export default function App() {
  const inspectorDrawerOpen = useInspectorDrawerOpen();

  const marginRightTransition = useDrawerTransition('margin-right', inspectorDrawerOpen);

  return (
    <>
      <div id="drawer-container" style={{position: 'relative', overflow: 'hidden'}}>
        <InspectorDrawer />

        <Stack
          sx={{
            marginRight: inspectorDrawerOpen ? `${INSPECTOR_DRAWER_WIDTH}px` : 0,
            transition: marginRightTransition,
          }}
        >
          <TemplatePanel />
        </Stack>

      </div>
    </>
  );
}
