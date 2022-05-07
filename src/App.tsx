import React from 'react';
import Header from "./components/Header/Header";
import {Link, Outlet} from "react-router-dom";
import Box from '@mui/material/Box';
import NavBar from "./components/NavBar/NavBar";
import NavItem from "./components/NavBar/NavItem/NavItem";

function App() {
  return (
      <>
          <Header />
          <Box
              sx={{
                  maxWidth: 1200,
                  height: "auto",
                  margin: "auto",
              }}
          >
              <NavBar />
              <Outlet />
          </Box>
      </>
  );
}

export default App;
