"use client"
import React, { useState, useCallback } from 'react';
import {
    Box, Card, CardContent, IconButton, Rating, Stack, Tooltip, Typography,
    TextField
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import useStore from '@/app/store';
import useFetch from '../fetch/useFetch';
import Basket from '../basket/page'
import Link from 'next/link';
import Badge from '@mui/material/Badge';


const MainMenu = () => {
    const { basket, addProductToBasket, removeFromBasket, updateQuantity, addToFavorites, removeFromFavorites, favorites = [] } = useStore();
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [addedItems, setAddedItems] = React.useState(new Set());
    const [addedToFavorites, setAddedToFavorites] = React.useState(new Set());
    const [searchTerm, setSearchTerm] = React.useState('');

    const { data: fetchedData = [] } = useFetch('https://66dee1fdde4426916ee2c7b3.mockapi.io/HonyShop');

    const filteredData = fetchedData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const favoritesCount = favorites?.length ?? 0;

    const handleAddToCart = useCallback((product) => {
        addProductToBasket(product);
        setIsDrawerOpen(true);
        setAddedItems(prev => new Set(prev).add(product.id));
    }, [addProductToBasket]);

    const handleRemoveFromCart = (productId) => {
        removeFromBasket(productId);
    };

    const handleUpdateQuantity = (productId, delta) => {
        updateQuantity(productId, delta);
    };

    // const handleAddToFavorites = useCallback((product) => {
    //     if (favorites && favorites.some(fav => fav.id === product.id)) {
    //         removeFromFavorites(product.id);
    //         setAddedToFavorites(prev => {
    //             const newSet = new Set(prev);
    //             newSet.delete(product.id);
    //             return newSet;
    //         });
    //     } else {
    //         addToFavorites(product);
    //         setAddedToFavorites(prev => new Set(prev).add(product.id));
    //     }
    // }, [addToFavorites, removeFromFavorites, favorites]);
    const handleAddToFavorites = useCallback((product) => {
        if (favorites && favorites.some(fav => fav.id === product.id)) {
            removeFromFavorites(product.id);
            setAddedToFavorites(prev => {
                const newSet = new Set(prev);
                newSet.delete(product.id);
                return newSet;
            });
        } else {
            addToFavorites(product);
            setAddedToFavorites(prev => new Set(prev).add(product.id));
        }
    }, [addToFavorites, removeFromFavorites, favorites]);


    const getTotalPrice = () => {
        return basket.reduce((total, item) => total + parseFloat(item.priceR) * item.quantity, 0).toFixed(2);
    };

    return (
        <>
            <Box sx={{ width: { xs: '90%', sm: 400 }, margin: 'auto', mt: 6, mb: 4 }}>
                <TextField
                    fullWidth
                    label="Search products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#fdf5ee',
                            borderRadius: '8px',
                            color: '#30180d',
                            '& fieldset': {
                                borderColor: '#b83806',
                            },
                            '&:hover fieldset': {
                                borderColor: '#b83806',
                                borderWidth: 2,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#b83806',
                                borderWidth: 2,
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#b83806',
                            // No shrink forced here!
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#b83806',
                        },
                        input: {
                            color: '#30180d',
                            fontSize: { xs: '0.85rem', sm: '1rem' },
                        },
                    }}
                />
            </Box>


            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                },
                gap: '20px',
                marginTop: '40px',
                maxWidth: '1400px',
                width: '100%',
                margin: '40px auto',
                // backgroundColor: '#f4eae1',
                padding: '20px',
            }}>
                {filteredData.length === 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            gridColumn: '1 / -1',
                            justifyContent: 'center',
                            mt: 4,
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                textAlign: 'center',
                                color: '#b83806',
                                fontSize: { xs: '1rem', sm: '1.2rem' },
                                border: '2px solid #b83806',
                                borderRadius: '8px',
                                padding: '10px 20px',
                                fontWeight: '600',
                                maxWidth: '400px',
                                backgroundColor: '#fdf5ee',
                            }}
                        >
                            No products found matching :"{searchTerm}"
                        </Typography>
                    </Box>

                ) : (
                    filteredData.map((item) => (
                        <Card
                            key={item.id}
                            sx={{
                                maxWidth: { xs: '100%', sm: 420 },
                                backgroundColor: '#fff',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    height: 280,
                                    '&:hover .overlay': {
                                        transform: 'translateY(0)',
                                    },
                                }}
                            >
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease-in-out',
                                    }}
                                />
                                <Box
                                    className="overlay"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(0deg,#a13602,#feb934)',
                                        transform: 'translateY(-100%)',
                                        transition: 'transform 0.3s ease-in-out',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Tooltip title={addedItems.has(item.id) ? "Already added to cart" : "Add to cart"} arrow>
                                       
                                        <Box
                                            onClick={() => !addedItems.has(item.id) && handleAddToCart(item)}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '50%',
                                                border: '2px solid #fff',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                },
                                                cursor: addedItems.has(item.id) ? 'default' : 'pointer',
                                                opacity: addedItems.has(item.id) ? 0.5 : 1,
                                            }}
                                        >
                                            <ShoppingCartIcon sx={{ color: '#fff', fontSize: '2rem' }} />
                                        </Box>
                                    </Tooltip>
                                    <Tooltip title={favorites && favorites.some(fav => fav.id === item.id) ? "Remove from favorites" : "Add to favorites"} arrow>
                                        <Box
                                            onClick={() => handleAddToFavorites(item)}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '50%',
                                                border: '2px solid #fff',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                },
                                                cursor: 'pointer',
                                                opacity: 1,
                                                marginLeft: '10px',
                                            }}
                                        >
                                            <FavoriteBorderIcon sx={{ color: '#fff', fontSize: '2rem' }} />
                                        </Box>
                                    </Tooltip>



                                    <Link href={`/mainBoxes/${item.id}`} legacyBehavior passHref>

                                        <Tooltip title="More Info" arrow>
                                            <Box
                                                component="a"
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '60px',
                                                    height: '60px',
                                                    borderRadius: '50%',
                                                    border: '2px solid #fff',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                                                    cursor: 'pointer',
                                                    opacity: 1,
                                                    marginLeft: '10px',
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                <InfoOutlinedIcon sx={{ color: '#fff', fontSize: '2rem' }} />
                                            </Box>
                                        </Tooltip>
                                    </Link>


                                </Box>
                            </Box>
                            <CardContent>
                                <Typography sx={{ fontSize: '1rem', fontWeight: '600', color: '#30180d', }} variant="h6" component="div">
                                    {item.name}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                                    <Typography variant="body2" sx={{ color: '#b83806', fontSize: '.9rem' }}>
                                        $ {item.priceR || 'N/A'}
                                    </Typography>
                                    <Rating name="half-rating" defaultValue={4.1} precision={0.5} readOnly size="small" />
                                </Stack>
                            </CardContent>
                        </Card>
                    )))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Basket
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                />

            </Box>
        </>
    );
};

export default MainMenu;