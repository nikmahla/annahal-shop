"use client";

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import useStore from "@/app/store";
import Basket from "@/app/components/basket/page";            
import FavoriteItem from "@/app/components/favoriteItem/page"; 

export default function ProductDetailClient({ product }) {
  // ----- store (always lowercase 'favorites')
  const addProductToBasket     = useStore((s) => s.addProductToBasket);
  const favorites              = useStore((s) => s.favorites) || [];
  const addToFavorites         = useStore((s) => s.addToFavorites);
  const removeFromFavorites    = useStore((s) => s.removeFromFavorites);

  const isFav = favorites.some((f) => f.id === product.id);

  // drawers
  const [isBasketOpen, setIsBasketOpen] = React.useState(false);
  const [isFavoriteOpen, setIsFavoriteOpen] = React.useState(false);

  // hydration guard to avoid SSR mismatch
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);

  const handleAddToCart = () => {
    addProductToBasket(product);
    setIsBasketOpen(true);
  };

  const handleToggleFav = () => {
    if (isFav) removeFromFavorites(product.id);
    else addToFavorites(product);
    setIsFavoriteOpen(true);
  };

  return (
    <>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 3, md: 6 } ,mt:8}}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.avatar}
              alt={product.name}
              sx={{
                width: "100%",
                height: { xs: 320, md: 480 },
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 2,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#30180d" }}>
                {product.name}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <Rating value={4.5} precision={0.5} readOnly />
                <Chip label="In stock" size="small" sx={{ bgcolor: "#fdf5ee", color: "#b83806" }} />
              </Stack>

              <Typography variant="h5" sx={{ color: "#b83806", fontWeight: 700 }}>
                ${product.priceR}
              </Typography>

              <Typography sx={{ color: "#5a4237" }}>
                {product.description || "Delicious honey product with premium quality."}
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 1 }}>
                <Button
                  onClick={handleAddToCart}
                  startIcon={<ShoppingCartIcon />}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    background: "linear-gradient(90deg, #a13602 0%, #feb934 100%)",
                    "&:hover": { opacity: 0.9 },
                    borderRadius: 2,
                    px: 3,
                  }}
                >
                  Add to cart
                </Button>

                <Button
                  onClick={handleToggleFav}
                  startIcon={isFav ? <FavoriteIcon sx={{ color: "#b83806" }} /> : <FavoriteBorderIcon sx={{ color: "#b83806" }} />}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderColor: "#b83806",
                    color: "#b83806",
                    "&:hover": { borderColor: "#a13602", backgroundColor: "#fff6eb" },
                    borderRadius: 2,
                    px: 3,
                  }}
                >
                  {isFav ? "Remove from favorites" : "Add to favorites"}
                </Button>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" sx={{ color: "#7a5a4a" }}>
                ID: {product.id}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Drawers */}
      {hydrated && isBasketOpen && (
        <Basket isOpen={isBasketOpen} onClose={() => setIsBasketOpen(false)} />
      )}
      {hydrated && isFavoriteOpen && (
        <FavoriteItem isOpen={isFavoriteOpen} onClose={() => setIsFavoriteOpen(false)} />
      )}
    </>
  );
}
