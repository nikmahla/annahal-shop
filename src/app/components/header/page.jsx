"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import logo from "./img/logo.png";
import Basket from "../basket/page";
import FavoriteItem from "../favoriteItem/page";
import useStore from "../../store";


const HeaderBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#feb934',
    color: '#30180d',
    fontWeight: 700,
    minWidth: 20,
    height: 20,
    lineHeight: '20px',
    fontSize: 10,
    padding: '0 4px',
    borderRadius: 10,
    right: 1,
    top: 1,
    transform: 'none',
    zIndex: 5,
    [theme.breakpoints.down('sm')]: {
      right: -4,
      top: -4,
    },
  },
}));


const navItems = [
  { label: "Home", id: "home" },
  { label: "Category", id: "category" },
  { label: "Products", id: "products" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Clients", id: "clients" },
];

export default function ResponsiveMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isBasketOpen, setIsBasketOpen] = React.useState(false);
  const [isFavoriteOpen, setIsFavoriteOpen] = React.useState(false);

  const favorites = useStore((s) => s.favorites) || [];
  const basket = useStore((s) => s.basket) || [];

  const favoritesCount = favorites.length;      
  const basketCount = basket.length;            

  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);


  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const HEADER_OFFSET = 120;

  const handleNav = React.useCallback(
    (id) => {
      setDrawerOpen(false);
      if (typeof window === "undefined") return;

      if (pathname !== "/") {
        router.push(`/#${id}`);
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [pathname, router]
  );

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: { xs: "#fcf3e9", md: isScrolled ? "#fcf3e9" : "transparent" },
        transition: "background-color 0.3s ease",
        borderBottom: isScrolled ? ".5px solid #fcddba" : "none",
      }}
    >
      <Box
        sx={{
          height: "120px",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Brand */}
        <Image src={logo} alt="Logo" width={30} height={40} />
        <Typography
          variant="h1"
          component="div"
          sx={{ fontSize: { xs: "1.2rem", md: "1.8rem" }, color: "#b83806", ml: 1.5, fontWeight: "bold" }}
        >
          Annahal
        </Typography>

  
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", overflow: "hidden" }}>
          <Grid
            container
            spacing={2}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "900px",
            }}
          >
            {navItems.map((item) => (
              <Grid item key={item.id}>
                <Box sx={{ position: "relative", textAlign: "center", overflow: "hidden" }}>
                  <Typography
                    onClick={() => handleNav(item.id)}
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                      p: "10px",
                      color: "#30180d",
                      userSelect: "none",
                      "&:hover": {
                        color: "#b83806",
                        "& + .bee-icon": { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                  <EmojiNatureIcon
                    className="bee-icon"
                    sx={{
                      pt: "2px",
                      position: "absolute",
                      bottom: 0,
                      left: "30%",
                      transform: "translateX(-50%) translateY(10px)",
                      opacity: 0,
                      transition: "opacity 0.3s, transform 0.3s",
                      color: "#b83806",
                      fontSize: "1.1rem",
                      pointerEvents: "none",
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

    
        <Tooltip title="Menu">
          <IconButton
            onClick={() => setDrawerOpen(true)}
            size="small"
            sx={{
              display: { xs: "block", md: "none" },
              color: "#b83806",
              mr: 1,
            }}
          >
            <MenuIcon sx={{ width: 36, height: 36, pr: 1 }} />
          </IconButton>
        </Tooltip>

      
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.25, sm: 1.5, md: 2 }, ml: { xs: 1, md: 2 } }}>
  <Tooltip title="Cart">
    <HeaderBadge badgeContent={<span suppressHydrationWarning>{hydrated ? basketCount : 0}</span>} showZero>
      <IconButton
        onClick={() => setIsBasketOpen(true)}
        aria-label={`Cart (${basketCount})`}
        sx={{
          color: '#b83806',
          p: { xs: 1.1, md: 1 },          // a touch more padding on mobile = more corner room
          overflow: 'visible',
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: { xs: '1.2rem', md: '1.6rem' } }} />
      </IconButton>
    </HeaderBadge>
  </Tooltip>

  <Tooltip title="Favorites">
    <HeaderBadge badgeContent={<span suppressHydrationWarning>{hydrated ? favoritesCount : 0}</span>} showZero>
      <IconButton
        onClick={() => setIsFavoriteOpen(true)}
        aria-label={`Favorites (${favoritesCount})`}
        sx={{
          color: '#b83806',
          p: { xs: 1.1, md: 1 },
          overflow: 'visible',
        }}
      >
        <FavoriteBorderIcon sx={{ fontSize: { xs: '1.2rem', md: '1.6rem' } }} />
      </IconButton>
    </HeaderBadge>
  </Tooltip>
</Box>

      </Box>

      {/* Mobile drawer menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 200 }} role="presentation">
          {navItems.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => handleNav(item.id)}
              sx={{ "&:hover": { backgroundColor: "#b83806", color: "#fff" } }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Box>
      </Drawer>

      {/* Drawers */}
      {isBasketOpen && <Basket isOpen={isBasketOpen} onClose={() => setIsBasketOpen(false)} />}
      {isFavoriteOpen && <FavoriteItem isOpen={isFavoriteOpen} onClose={() => setIsFavoriteOpen(false)} />}
    </Box>
  );
}
