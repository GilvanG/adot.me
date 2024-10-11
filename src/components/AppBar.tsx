import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ListItemIcon, Menu, Typography } from "@mui/material";
import { signInWithPopup, User } from "firebase/auth";
import { auth, provider } from "../../firebase-config";
import { Logout, Settings } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  boxShadow: theme.shadows[1],
  padding: "8px 26px",
}));

export default function AppAppBar() {
  const [openMenuMobile, setOpenMenuMobile] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const router = useRouter();

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const toggleDrawerMenuMobile = (newOpen: boolean) => () => {
    setOpenMenuMobile(newOpen);
  };
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuário logado: ", user);
      setUser(user);
      localStorage.setItem("@user_adot-me", JSON.stringify(user));
    } catch (error) {
      console.error("Erro ao fazer login com Google: ", error);
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("@user_adot-me");
    router.push('/');
    handleCloseMenu();
  };

  React.useEffect(() => {
    const localStorageUser = localStorage.getItem("@user_adot-me");
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    }
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              fontSize="1"
              mr={1}
            >
              ADOT<span style={{ color: "hsl(120, 100%, 62%)" }}>.ME</span>
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="text" color="info" size="small">
                Início
              </Button>
              <Button variant="text" color="info" size="small">
                Cadastra Pet
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                Sobre Nós
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {/* <Button color="primary" variant="text" size="small">
              Sign in
            </Button> */}
            {user ? (
              <Box display={"inline"}>
                <Typography fontSize={12} display={"inline"}>
                  Olá, {user.displayName}
                </Typography>
                <IconButton onClick={handleClickMenu} sx={{ border: 0 }}>
                  <ArrowDropDownIcon />
                </IconButton>
              </Box>
            ) : (
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={signInWithGoogle}
              >
                Entrar
              </Button>
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              onClose={handleCloseMenu}
              onClick={handleCloseMenu}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Divider />
              <MenuItem onClick={handleCloseMenu}>
                <Link
                  href="/settings"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Configurações
                </Link>
              </MenuItem>
              <MenuItem onClick={logOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton
              aria-label="Menu button"
              onClick={toggleDrawerMenuMobile(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={openMenuMobile}
              onClose={toggleDrawerMenuMobile(false)}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={toggleDrawerMenuMobile(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                  {user && (
                    <Typography fontSize={20}>
                      Olá, {user.displayName}
                    </Typography>
                  )}
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>Início</MenuItem>
                <MenuItem>Cadastrar Pet</MenuItem>
                <MenuItem>Sobre Nós</MenuItem>
                <MenuItem>
                  {user ? (
                    ""
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={signInWithGoogle}
                    >
                      Entrar
                    </Button>
                  )}
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
