"use client";
import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  Button,
  Typography,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import useStore from "../../store";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  cursor: "pointer",
  "&:hover": { backgroundColor: "rgba(184, 56, 6, 0.04)" },
  "&:active": { backgroundColor: "rgba(184, 56, 6, 0.12)" },
}));

const Basket = ({ isOpen, onClose }) => {
  const { basket, plusFromCart, minusFromCart, removeFromBasket } = useStore();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleRemoveFromCart = (productId) => removeFromBasket(productId);
  const getTotalPrice = () =>
    basket.reduce((t, i) => t + parseFloat(i.priceR) * i.quantity, 0).toFixed(2);

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 420 },
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",            // ✅ only the list scrolls
          backgroundColor: "#fdf5ee",
        },
      }}
    >
      {/* Header (no scroll) */}
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
          sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }, fontWeight: 600, color: "#30180d" }}
        >
          Basket
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      {/* Items — the ONLY scrollable area */}
      <List sx={{ flex: "1 1 auto", minHeight: 0, overflowY: "auto", py: 0 }}>
        {basket.length > 0 ? (
          basket.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem
                alignItems="flex-start"
                disableGutters
                sx={{
                  px: { xs: 1.25, sm: 1.75 },
                  py: { xs: 1, sm: 1.25 },
                  pr: { xs: 8, sm: 10 }, // room for delete button
                }}
                secondaryAction={
                  <StyledIconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFromCart(item.id)}
                    sx={{ color: "#b83806" }}
                  >
                    <DeleteIcon />
                  </StyledIconButton>
                }
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "64px 1fr", sm: "72px 1fr" },
                    columnGap: { xs: 1.25, sm: 1.5 },
                    width: "100%",
                    alignItems: "start",
                  }}
                >
                  <ListItemAvatar sx={{ m: 0 }}>
                    <Avatar
                      alt={item.name}
                      src={item.avatar}
                      variant="square"
                      sx={{
                        width: { xs: 64, sm: 72 },
                        height: { xs: 72, sm: 84 },
                        borderRadius: "10px",
                        color: "#b83806",
                      }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        color: "#30180d",
                        fontSize: { xs: ".9rem", sm: "1rem" },
                        fontWeight: 500,
                        pr: 1,
                        wordBreak: "break-word",
                      },
                    }}
                    primary={item.name}
                    secondary={
                      <Box sx={{ mt: 0.75 }}>
                        <Box
                          sx={{
                            display: { xs: "grid", sm: "flex" },
                            gridTemplateColumns: { xs: "auto auto", sm: "unset" },
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: { xs: 1, sm: 0 },
                          }}
                        >
                          <Typography component="span" variant="body2" color="#b83806" sx={{ fontWeight: 600 }}>
                            ${item.priceR}
                          </Typography>

                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              gap: 0.5,
                            }}
                          >
                            <StyledIconButton
                              size="small"
                              onClick={() => minusFromCart(item.id)}
                              disabled={item.quantity <= 1}
                              sx={{ color: item.quantity <= 1 ? "#ccc" : "#b83806" }}
                            >
                              <RemoveIcon fontSize="small" />
                            </StyledIconButton>

                            <Typography
                              variant="body2"
                              sx={{
                                mx: 0.5,
                                px: 1,
                                py: 0.25,
                                minWidth: 28,
                                textAlign: "center",
                                borderRadius: 1,
                                border: "1px solid #f0caa6",
                                color: "#b83806",
                                fontWeight: 600,
                              }}
                            >
                              {item.quantity || 1}
                            </Typography>

                            <StyledIconButton
                              size="small"
                              onClick={() => plusFromCart(item.id)}
                              sx={{ color: "#b83806" }}
                            >
                              <AddIcon fontSize="small" />
                            </StyledIconButton>
                          </Box>
                        </Box>
                      </Box>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))
        ) : (
          <Typography
            align="center"
            sx={{ p: { xs: 2, sm: 3 }, fontSize: { xs: "1rem", sm: "1.1rem" }, fontWeight: 600, color: "#30180d" }}
          >
            Your basket is empty
          </Typography>
        )}
      </List>

      {/* Footer (fixed inside drawer, no scroll) */}
      {basket.length > 0 && (
        <Box
          sx={{
            flexShrink: 0,
            p: { xs: 1.25, sm: 2 },
            borderTop: "1px solid #f0caa6",
            bgcolor: "#fdf5ee",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "auto 1fr auto" },
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "1rem", sm: "1.05rem" }, fontWeight: 600, color: "#8f2c05" }}
            >
              Total: ${getTotalPrice()}
            </Typography>

            <Box sx={{ flex: 1 }} />

            <Tooltip
              title="Proceed to payment and complete your order"
              arrow
              open={tooltipOpen}
              onClose={() => setTooltipOpen(false)}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "#b83806",
                  "&:hover": { backgroundColor: "#8f2c05" },
                  py: { xs: 1, sm: 1 },
                }}
                onClick={() => setTooltipOpen(true)}
              >
                Checkout
              </Button>
            </Tooltip>
          </Box>
        </Box>
      )}
    </Drawer>
  );
};

export default Basket;
