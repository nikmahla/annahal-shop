"use client";
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import useStore from "../../store";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  cursor: "pointer",
  "&:hover": { backgroundColor: "rgba(184, 56, 6, 0.04)" },
  "&:active": { backgroundColor: "rgba(184, 56, 6, 0.12)" },
}));

export default function FavoriteItems({ isOpen, onClose }) {
  const favorites = useStore((s) => s.favorites) || [];
  const removeFromFavorites = useStore((s) => s.removeFromFavorites);

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
           
          width: { xs: "100%", sm: 400 },
          height: "100dvh",
          maxWidth: "100vw",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",          
          backgroundColor: "#fdf5ee",
        },
      }}
    >
      {/* Header (fixed) */}
      <Box
        sx={{ 
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#30180d", fontSize: { xs: "1rem", sm: "1.1rem" } }}
        >
          Your Favorite Items
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      {/* Items (the ONLY scrollable area) */}
      <List sx={{ flex: "1 1 auto", minHeight: 0, overflowY: "auto", py: 0 }}>
        {favorites.length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "gray",
              fontStyle: "italic",
              p: { xs: 2, sm: 3 },
            }}
          >
            Your favorites list is empty.
          </Typography>
        ) : (
          favorites.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem
                alignItems="flex-start"
                disableGutters
                sx={{
                  px: { xs: 1.25, sm: 1.5 },
                  py: { xs: 1, sm: 1.25 },
                  pr: { xs: 7.5, sm: 9 }, // room for trailing delete button
                }}
                secondaryAction={
                  <StyledIconButton
                    size="small"
                    onClick={() => removeFromFavorites(item.id)}
                    sx={{ color: "#b83806" }}
                    aria-label={`Remove ${item.name} from favorites`}
                  >
                    <DeleteIcon fontSize="medium" />
                  </StyledIconButton>
                }
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "72px 1fr", sm: "84px 1fr" },
                    columnGap: { xs: 1.25, sm: 1.5 },
                    width: "100%",
                    alignItems: "start",
                  }}
                >
                  <Box
                    component="img"
                    src={item.avatar || "/placeholder-image.jpg"}
                    alt={item.name}
                    sx={{
                      width: { xs: 72, sm: 84 },
                      height: { xs: 72, sm: 84 },
                      objectFit: "cover",
                      borderRadius: 1.25,
                    }}
                  />

                  <Box sx={{ minWidth: 0 }}>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            color: "#30180d",
                            fontSize: { xs: ".95rem", sm: "1rem" },
                            fontWeight: 500,
                            pr: 1,
                            wordBreak: "break-word",
                          }}
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: 0.75,
                          }}
                        >
                          <Typography
                            component="span"
                            variant="body2"
                            color="#b83806"
                            sx={{ fontWeight: 600 }}
                          >
                            ${item.priceR}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </Box>
              </ListItem>
              {index < favorites.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))
        )}
      </List>
      {/* no footer here = no extra scrollbar */}
    </Drawer>
  );
}
