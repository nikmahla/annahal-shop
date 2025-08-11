"use client";

import { Box, Button, Typography } from '@mui/material';

export default function Error({ error, reset }) {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 1, color: '#b83806', fontWeight: 700 }}>
        Oops — something went wrong
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#5a3e32' }}>
        {error?.message || 'Please try again.'}
      </Typography>
      <Button
        onClick={reset}
        variant="contained"
        sx={{
          textTransform: 'none',
          background: 'linear-gradient(90deg, #a13602 0%, #feb934 100%)',
          '&:hover': { opacity: 0.9 },
          borderRadius: 2,
          px: 3,
        }}
      >
        Retry
      </Button>
    </Box>
  );
}
