// src/app/mainBoxes/[id]/loading.js
import { Box, Grid, Skeleton, Stack } from '@mui/material';

export default function Loading() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 },mt:12, py: 4 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Skeleton variant="rectangular" width={100} height={36} />
        <Skeleton variant="rectangular" width={80} height={28} />
      </Stack>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rectangular" sx={{ width: '100%', height: 360, borderRadius: 2 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Skeleton width="70%" height={40} />
            <Skeleton width="40%" />
            <Skeleton width="30%" height={36} />
            <Skeleton width="100%" height={80} />
            <Stack direction="row" spacing={2}>
              <Skeleton variant="rectangular" width={140} height={44} />
              <Skeleton variant="rectangular" width={44} height={44} />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
