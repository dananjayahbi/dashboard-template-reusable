'use client';

import { AppBar, Box, Toolbar } from '@mui/material';
import Image from 'next/image';

export default function Header() {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: 'white',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
          <Image
            src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-simple-v-logo-design-png-image_3632479.jpg"
            alt="Logo"
            width={100}
            height={24}
            priority
            style={{ marginLeft: '8px' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
