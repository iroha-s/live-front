import type { NextPage } from "next";
import Link from 'next/link'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import OvenPlayer from 'ovenplayer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const posts = [
  {
    title: "百葉箱",
    excerpt: "芝生広場のカメラ",
    image: "https://live.attamari.jp/thumb/stream1/thumb.jpg"
  },
  {
    title: "3D Printer1",
    excerpt: "1代目の3Dプリンター",
    image: "https://live.attamari.jp/thumb/stream2/thumb.jpg"
  },
  {
    title: "3D Printer2",
    excerpt: "2代目の3Dプリンター",
    image: "https://live.attamari.jp/thumb/stream3/thumb.jpg"
  },
  // {
  //   title: "3D Printer3",
  //   excerpt: "3代目の3Dプリンター",
  //   image: "https://live.attamari.jp/thumb/stream4/thumb.jpg"
  // },
]

type Anchor = 'top' | 'left' | 'bottom' | 'right';
const Home: NextPage = () => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <div className={"flex flex-row w-screen h-screen bg-base dark:bg-baseDark"}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              // onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              ECC LIVE
            </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          <DrawerHeader>
            <IconButton
              //  onClick={handleDrawerClose}
              onClick={toggleDrawer('left', false)}
            >
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {/* {['Home', 'Live'].map((text, index) => (
              <ListItem key={index} disablePadding>
                <Link href={text}>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))} */}
            {posts.map((text, index) => (
              <ListItem key={text.title} disablePadding>
                <Link href={text.image}>
                  <ListItemButton>
                    <ListItemIcon>
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      <LiveTvIcon />
                    </ListItemIcon>
                    <ListItemText primary={text.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          {/* <Divider /> */}
        </SwipeableDrawer>
        <Main open={open}>
          <DrawerHeader />
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              ECC LIVE
            </Typography>
          </Container>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {posts.map((text, index) => (
                <Grid key={text.title} item xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="210"
                      image={"https://live.attamari.jp/thumb/stream" + (index + 1).toString() + "/thumb.jpg"}
                      title={text.title}
                    />
                    <div style={{ background: "whitesmoke", color: 'black', textAlign: "center" }}>
                      <CardContent >
                        <Typography gutterBottom variant="h5" component="h2">
                          {text.title}
                        </Typography>
                        <Typography>
                          {text.excerpt}
                        </Typography>
                      </CardContent>

                      <CardActions style={{ textAlign: "center", justifyContent: 'center'}}>
                        <Button color="primary" variant="contained"
                          href={'https://live.attamari.jp/watch.php?n=stream' + (index + 1).toString()}
                        >
                          見る
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Main>
      </Box >
    </div >
  );
};

export default Home;
