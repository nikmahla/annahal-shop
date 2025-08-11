
import Box from "@mui/material/Box";
import CategoryPage from "./components/category/page";
import HeaderMain from "./components/headerMain/page";
import MainBoxes from "./components/mainBoxes/page";
import Crousel from "./components/crousel/page";
import Gallery from "./components/gallery/page";
import Baner from "./components/baner/page";
import Logos from "./components/logos/page";
import Comments from "./components/comments/page";


export default function Home() {
  return (
    <>


      {/* Home */}
      <Box id="home" sx={{ scrollMarginTop: "130px" }}>
        <HeaderMain />
      </Box>

      {/* Category */}
      <Box id="category" sx={{ scrollMarginTop: "130px" }}>
        <CategoryPage />
      </Box>

      {/* Products */}
      <Box id="products" sx={{ scrollMarginTop: "130px" }}>
        <MainBoxes />
      </Box>

      {/* About */}
      <Box id="about" sx={{ scrollMarginTop: "130px" }}>
        <Baner />
      </Box>
      <Gallery />
      {/* Projects */}
      <Box id="projects" sx={{ scrollMarginTop: "130px" }}>

        <Crousel />
      </Box>

      {/* Clients */}
      <Box id="clients" sx={{ scrollMarginTop: "130px" }}>
        <Logos />
        <Comments />
      </Box>

      {/* (Optional) Contact/footer without nav item now */}
      {/* <Footer /> */}

      {/* If Basket is already mounted from header drawer, avoid double-mounting it here */}
      {/* <Basket /> */}
    </>
  );
}
