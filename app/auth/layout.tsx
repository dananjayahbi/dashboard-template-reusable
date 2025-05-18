'use client';

import { Box, Container, Grid } from '@mui/material';
import img from "../../public/assets/auth-form-bg.jpg";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#F0F3F9',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Box
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', 
            borderRadius: 2, 
            overflow: 'hidden',
            backgroundColor: 'white',
            height: { xs: 'auto', md: '800px' }
          }}
        >
          {/* Left side - Auth form */}
          <Box
            sx={{ 
              flex: '1 1 50%',
              display: 'flex', 
              flexDirection: 'column', 
              p: { xs: 3, sm: 4 },
              position: 'relative',
              height: '100%',
              justifyContent: 'center'
            }}
          >
            {children}
          </Box>
          
          {/* Right side - Image */}
          <Box
            sx={{ 
              flex: '1 1 50%',
              display: { xs: 'none', md: 'block' },
              position: 'relative',
              height: '100%',
              overflow: 'hidden'
            }}
          >
            <Box
              component="img"
              src={img.src}
              alt="Cherry Blossoms"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}