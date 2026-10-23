"use client"
import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Rightimg from './img/c4.jpg'
import c1 from './img/c1.png'
import c2 from './img/c2.png'
import c3 from './img/c3.png'

const CategoryPage = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            padding: { xs: '0 10px', md: 0 },
            marginTop: { xs: '100px', md: '0px' }
        }}>
            {/* Left column */}
            <Box sx={{ flex: 1 }}>
                <Typography
                    variant='h2'
                    sx={{
                        letterSpacing: '2px',
                        color: '#30180d',
                        fontSize: { md: '2.6rem', xs: '1.8rem' },
                        fontWeight: '600',
                        textAlign: 'center',
                        padding: '20px',
                        textTransform: 'capitalize'
                    }}
                >
                    our honey category
                </Typography>

                <Typography
                    variant='body1'
                    sx={{
                        padding: { md: '15px', xs: '10px' },
                        color: 'gray',
                        fontSize: '.8rem',
                        marginBlock: '20px'
                    }}
                >
                    Browse our honey by type: fresh from the hive, raw and unfiltered, or certified organic.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[
                        { src: c1, alt: "Category 1", header: "Fresh Honey", body: "Harvested in small batches and jarred within days, with a light, floral flavour." },
                        { src: c2, alt: "Category 2", header: "Raw Honey", body: "Unheated and unfiltered, so it keeps its natural pollen, enzymes and thick texture." },
                        { src: c3, alt: "Category 3", header: "Organic Honey", body: "From hives placed in pesticide-free areas, for a clean and balanced taste." }
                    ].map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'center', sm: 'flex-start' },
                                gap: 2,
                                padding: '20px',
                            }}
                        >
                            <Box
                                sx={{
                                    flex: { xs: '0 0 auto', sm: '0 0 100px' },
                                    width: { xs: '30%', sm: '200px' },
                                    height: 'auto',
                                    paddingTop: { xs: '10px', sm: '0px' },
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': { transform: 'translateY(-10px)' }
                                }}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    width={100}
                                    height={100}
                                    style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                                />
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        '&:hover': { color: '#a13602' },
                                        marginBottom: 1,
                                        color: '#30180d',
                                        fontSize: '1.4rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    {item.header}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'gray', fontSize: { xs: '0.8rem', md: '.8rem' } }}
                                >
                                    {item.body}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Right column (image) */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: { md: 'flex-start' },
                    marginTop: {md:'5rem' ,sm:'.5rem'}

                }}
            >
                <Image
                    src={Rightimg}
                    alt="Rightimg"
                    style={{
                        width: '90%',
                        height: 'auto',              
                        maxHeight: 'min(100vh, 520px)',  
                        objectFit: 'cover',
                        borderRadius: 12,
                        display: 'block',


                    }}
                />
            </Box>
        </Box>
    );
};

export default CategoryPage;
