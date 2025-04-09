// import { useNavigate } from "react-router-dom";
// import {
//   AppBar,
//   Box,
//   Button,
//   Drawer,
//   IconButton,
//   Link,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import CloseIcon from "@mui/icons-material/Close";
// import Rooms from "../Rooms/Rooms";
// import { styled } from "@mui/system";
// import { grey } from "@mui/material/colors";
// import "../../index.css";

// const Navbar = ({ open, setOpen }) => {
//   const navigate = useNavigate();

//   const BlackButton = styled(Button)(() => ({
//     color: grey.A100,
//     borderRadius: "25px",
//     margin: "2px",
//     backgroundColor: grey[900],
//     "&:hover": {
//       backgroundColor: grey[800],
//     },
//   }));

//   const logout = () => {
//     localStorage.removeItem("user");
//     navigate("/auth");
//   };

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         elevation={6}
//         sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
//       >
//         <Toolbar>
//           <IconButton disableRipple onClick={() => setOpen(!open)}>
//             {!open ? (
//               <MenuRoundedIcon fontSize="large" />
//             ) : (
//               <CloseIcon fontSize="large" />
//             )}
//           </IconButton>
//           <Typography
//             component="p"
//             variant="h4"
//             sx={{ flexGrow: 1, fontFamily: "cursive" }}
//           >
//             LinkUp
//             <Box
//               component="span"
//               sx={{ display: { xs: "none", md: "inline" }, fontSize:"20px" }}
//             >
//               {" "}group chats and calls!
//             </Box>
//           </Typography>
//           <Link
//             href="https://github.com/AjaySmarc"
//             target="_blank"
//             rel="noopener"
//             underline="none"
//           >
//             <BlackButton variant="contained" startIcon={<GitHubIcon />}>
//               GitHub
//             </BlackButton>
//           </Link>
//           <BlackButton
//             variant="contained"
//             startIcon={<ExitToAppIcon />}
//             onClick={logout}
//           >
//             Logout
//           </BlackButton>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{ flexShrink: 0 }}
//         variant="persistent"
//         transitionDuration={2}
//         anchor={"left"}
//         open={open}
//         onClose={() => setOpen(false)}
//       >
//         <Rooms setOpen={setOpen} />
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Rooms from "../Rooms/Rooms";
import { styled } from "@mui/system";
import { grey, blue } from "@mui/material/colors";
import "../../index.css";

const Navbar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const TrendyButton = styled(Button)(() => ({
    color: "#fff",
    borderRadius: "25px",
    margin: "5px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    transition: "transform 0.2s ease-in-out, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 4px 15px rgba(106, 17, 203, 0.3)",
    },
  }));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={6}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#ffffff",
          color: "#333",
        }}
      >
        <Toolbar>
          <IconButton disableRipple onClick={() => setOpen(!open)}>
            {open ? (
              <MenuOpenRoundedIcon fontSize="large" sx={{ color: blue[600] }} />
            ) : (
              <MenuRoundedIcon fontSize="large" sx={{ color: blue[600] }} />
            )}
          </IconButton>
          <Typography
            component="p"
            variant="h4"
            sx={{
              flexGrow: 1,
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            LinkUp
            <Box
              component="span"
              sx={{ display: { xs: "none", md: "inline" }, fontSize: "18px" }}
            >
              {" "}Group Chats & Calls
            </Box>
          </Typography>
          <Link
            href="https://github.com/AjaySmarc"
            target="_blank"
            rel="noopener"
            underline="none"
          >
            <TrendyButton variant="contained" startIcon={<GitHubIcon />}>GitHub</TrendyButton>
          </Link>
          <TrendyButton
            variant="contained"
            startIcon={<LogoutRoundedIcon />}
            onClick={logout}
          >
            Logout
          </TrendyButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{ flexShrink: 0 }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Rooms setOpen={setOpen} />
      </Drawer>
    </>
  );
};

export default Navbar;