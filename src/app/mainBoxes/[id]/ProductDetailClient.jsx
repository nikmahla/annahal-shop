"use client";

import React from 'react';
import Link from 'next/link';
import {
    Box, Grid, Typography, Stack, Button, IconButton, Divider, Chip, Rating, Tooltip
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useStore from '@/app/store';
import { useRouter } from 'next/navigation';
import Basket from '../../components/basket/page';
import FavoriteItem from '../../components/favoriteItem/page';

export default function ProductDetailClient({ product }) {
    const {
        addProductToBasket,
        addToFavorites,
        removeFromFavorites,
        favorites = []
    } = useStore();
    const router = useRouter();
    const [isBasketOpen, setIsBasketOpen] = React.useState(false);
    const [isFavOpen, setIsFavOpen] = React.useState(false);
    const goBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    const isFav = favorites.some(f => f.id === product.id);

    const handleAddToCart = () => {
        addProductToBasket(product);
        setIsBasketOpen(true);

    };

    const handleToggleFav = () => {
        isFav ? removeFromFavorites(product.id) : addToFavorites(product);
        setIsFavOpen(true);
    };




    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 }, py: 4, mt: 12, }}>
            {/* Top bar */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <Button onClick={goBack} startIcon={<ArrowBackIosNewIcon />} variant="text" sx={{ color: '#b83806', fontWeight: 500, cursor: 'pointer' }}>
                        Back
                    </Button>
                </Link>
                <Chip
                    label="In stock"
                    sx={{ backgroundColor: '#fdf5ee', color: '#b83806', border: '1px solid #b83806' }}
                    size="small"
                />
            </Stack>

            <Grid container spacing={4}>
                {/* Image */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
                            background:
                                'linear-gradient(180deg, rgba(254,185,52,0.15), rgba(161,54,2,0.08))',
                        }}
                    >
                        <Box sx={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                            <img
                                src={product.avatar}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        </Box>
                    </Box>
                </Grid>

                {/* Details */}
                <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#30180d' }}>
                            {product.name}
                        </Typography>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <Rating value={4.0} precision={0.5} readOnly size="small" />
                            <Typography variant="body2" sx={{ color: '#6b4a3a' }}>
                                (4.0) • Popular item
                            </Typography>
                        </Stack>

                        <Divider />

                        <Typography variant="h5" sx={{ color: '#b83806', fontWeight: 700 }}>
                            ${product.priceR ?? 'N/A'}
                        </Typography>

                        <Typography variant="body1" sx={{ color: '#5a3e32' }}>

                            Premium quality product from HonyShop. Fast shipping, easy returns.
                        </Typography>

                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            <Button
                                onClick={handleAddToCart}
                                startIcon={<ShoppingCartIcon />}
                                variant="contained"
                                sx={{
                                    textTransform: 'none',
                                    background:
                                        'linear-gradient(90deg, #a13602 0%, #feb934 100%)',
                                    '&:hover': { opacity: 0.9 },
                                    borderRadius: 2,
                                    px: 3,
                                }}
                            >
                                Add to Cart
                            </Button>


                            <Button
                                onClick={handleToggleFav}
                                startIcon={
                                    isFav
                                        ? <FavoriteIcon sx={{ color: '#b83806' }} />
                                        : <FavoriteBorderIcon sx={{ color: '#b83806' }} />
                                }
                                variant="contained"
                                sx={{
                                    textTransform: 'none',
                                    background: 'linear-gradient(90deg, #a13602 0%, #feb934 100%)',
                                    '&:hover': { opacity: 0.9 },
                                    borderRadius: 2,
                                    px: 3,
                                }}
                            >
                                Add to favorites
                            </Button>


                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        {/* Meta */}
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            <Chip label="Free returns" size="small" />
                            <Chip label="Secure checkout" size="small" />
                            <Chip label="2–4 day delivery" size="small" />
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#30180d' }}>
                        More Information
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#5a3e32' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    </Typography>
                </Grid>
            </Grid>

            <Basket
                isOpen={isBasketOpen}
                onClose={() => setIsBasketOpen(false)}
            />

          <FavoriteItem isOpen={isFavOpen} onClose={() => setIsFavOpen(false)} />
        </Box>
    );
}
