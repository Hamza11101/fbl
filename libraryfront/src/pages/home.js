import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Hamza Books
      </Typography>
      <Divider />
      <List>
        
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Login"/>
              <ListItemText primary="Register"/>
            </ListItemButton>
          </ListItem>
  
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Hamza Books
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            
              <Button href='/login' sx={{ color: '#fff' }}>
                Login
              </Button>
              <Button href='/register' sx={{ color: '#fff' }}>
                Register
              </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    
        <Toolbar />
       
        <Box component="main" sx={{ p: 3,mt:5,ml:50 }}>
          <Container maxWidth="sm" >
            {/* this is the header */}
            
              <Typography
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                E-Booker
              </Typography>

              {/* this will be the description */}
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Come explore the world of books. Browse through the internet and
                choose your favorites from millions books. Read your offline
                epubs online
              </Typography>
          
            <div >
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <ButtonGroup
                    variant="text"
                    color="primary"
                    aria-label="text primary button group"
                  >
                    <Button href='/books'>
                    Books
                    </Button>
                   
                    <Button href='/categoriesofbooks' >Discover</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </div>
          </Container>
        </Box>
      
    
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;