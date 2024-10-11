import AppAppBar from "@/components/AppBar";
// import getMPTheme from "@/theme";
import { Box } from "@mui/material";

export default function Home() {
  // const MPTheme = createTheme(getMPTheme());
  return (
    // <ThemeProvider theme={MPTheme}>

    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <AppAppBar />
    </Box>
    // </ThemeProvider>

  );
}
