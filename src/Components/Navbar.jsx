import { Link } from "react-router-dom";
import * as React from "react";
import { useState } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import Tooltip from "@mui/material/Tooltip";

const pages = [
  { name: "Appointments", path: "/appointment" },
  { name: "Reports", path: "/report" },
  { name: "Vaccines", path: "/vaccine" },
];
const settings = [
  { name: "Customers", path: "/customer" },
  { name: "Doctors", path: "/doctor" },
  { name: "Pets", path: "/animal" },
];

  function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [hover, setHover] = useState({});
    
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
      };
      
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        };
        
        const handleCloseUserMenu = () => {
          setAnchorElUser(null);
          };
          
          const handleMouseEnter = (index) => {
            setHover({ [index]: { color: "#A7E6FF"} });
            };
            
            const handleMouseLeave = () => {
              setHover({});
              };
              
      return (
    <AppBar position="static" sx={{ backgroundColor: "#3f418d" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 ,width:45 ,height:45 ,color:"#3572EF"}} />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".35rem",
              color: "#3ABEF9",
              textDecoration: "none",
              }}
              >
            VetApp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
                }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
{/* CHECK IT OUT */}
              {pages.map((page, index) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.path}
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      transition: 'color 0.3s ease, transform 0.3s ease',
                      fontWeight: "bolder",
                      ...hover[index]
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {page.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
{/* CHECK IT OUT */}
          </Box>
          <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 ,width:35 ,height:35 ,color:"#3572EF"}} />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "sans-serif",
              fontWeight: 600,
              letterSpacing: ".35rem",
              color: "#3ABEF9",
              textDecoration: "none",
            }}
          >
            Vet
          </Typography>
{/* CHECK IT OUT */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  to={page.path}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                    ...hover[index]
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  >
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>
{/* CHECK IT OUT */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Management">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AssessmentTwoToneIcon alt="Management" sx={{ color: '#ffca30', width:45 ,height:45}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
           {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link to={setting.path} style={{ color: '#000000', textDecoration: 'none', fontSize: 18 }}>{setting.name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
  }

export default Navbar;
