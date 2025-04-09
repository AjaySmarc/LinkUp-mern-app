// // // import React, { useEffect, useState } from "react";
// // // import {
// // //   AppBar,
// // //   Backdrop,
// // //   Button,
// // //   CircularProgress,
// // //   Dialog,
// // //   DialogActions,
// // //   DialogContent,
// // //   DialogTitle,
// // //   IconButton,
// // //   ListItemIcon,
// // //   Menu,
// // //   MenuItem,
// // //   Toolbar,
// // //   Tooltip,
// // //   Typography,
// // // } from "@mui/material";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import {
// // //   useDeleteRoomMutation,
// // //   useEditRoomMutation,
// // //   useGetRoomQuery,
// // // } from "../../redux/api";
// // // import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// // // import VideocamIcon from "@mui/icons-material/Videocam";
// // // import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// // // import LockIcon from "@mui/icons-material/Lock";
// // // import LockOpenIcon from "@mui/icons-material/LockOpen";
// // // import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// // // import MoreVertIcon from "@mui/icons-material/MoreVert";
// // // import { toast } from "react-toastify";
// // // import { Box } from "@mui/system";
// // // import { grey } from "@mui/material/colors";
// // // import { useSelector } from "react-redux";
// // // import { callActive } from "../../redux/callreducer";
// // // import RemoveUserFromRoom from "./RemoveUserFromRoom";
// // // import AddUserInRoom from "./AddUserInRoom";
// // // import Chat from "../Chat/Chat";
// // // import "../../index.css";

// // // const Room = () => {
// // //   const { roomId } = useParams();
// // //   const navigate = useNavigate();
// // //   const inCall = useSelector(callActive);
// // //   const user = JSON.parse(localStorage.getItem("user"));
// // //   const [isProtected, setIsProtected] = useState(true);
// // //   const {
// // //     data: room,
// // //     isSuccess,
// // //     isError,
// // //     isLoading,
// // //     isFetching,
// // //     error,
// // //   } = useGetRoomQuery({ userId: user._id, roomId });

// // //   const [
// // //     deleteRoom,
// // //     {
// // //       data: deleteData,
// // //       isSuccess: isDeleteSuccess,
// // //       isError: isDeleteError,
// // //       isLoading: isDeleteLoading,
// // //       error: deleteError,
// // //     },
// // //   ] = useDeleteRoomMutation();

// // //   const [editRoom] = useEditRoomMutation();
// // //   const [open, setOpen] = useState(false);
// // //   const [openRemove, setOpenRemove] = useState(false);

// // //   const [anchorEl, setAnchorEl] = React.useState(null);
// // //   const menuOpen = Boolean(anchorEl);
// // //   const handleMenuClick = (event) => {
// // //     setAnchorEl(event.currentTarget);
// // //   };
// // //   const handleMenuClose = () => {
// // //     setAnchorEl(null);
// // //   };

// // //   const handleClickOpen = () => {
// // //     setOpen(true);
// // //   };

// // //   const handleClose = () => {
// // //     setOpen(false);
// // //   };

// // //   const handleClickOpenRemove = () => {
// // //     setOpenRemove(true);
// // //   };

// // //   const handleCloseRemove = () => {
// // //     setOpenRemove(false);
// // //   };

// // //   const handleClick = async () => {
// // //     await deleteRoom({ userId: user._id, roomId });
// // //   };

// // //   const handleChange = async () => {
// // //     await editRoom({ userId: user._id, roomId, isProtected: !isProtected });
// // //     setIsProtected(!isProtected);
// // //   };

// // //   useEffect(() => {
// // //     if (isSuccess) setIsProtected(room.isProtected);
// // //     if (isError) toast.error(error.message);
// // //     //eslint-disable-next-line
// // //   }, [isSuccess, isError]);

// // //   useEffect(() => {
// // //     if (isDeleteSuccess) {
// // //       toast.success(deleteData.message);
// // //       navigate("/rooms");
// // //     }
// // //     if (isDeleteError) {
// // //       toast.error(deleteError.message);
// // //     }
// // //     //eslint-disable-next-line
// // //   }, [isDeleteSuccess, isDeleteError]);

// // //   return (
// // //     <>
// // //       <Backdrop
// // //         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
// // //         open={isLoading || isFetching || isDeleteLoading}
// // //       >
// // //         <CircularProgress color="inherit" />
// // //       </Backdrop>
// // //       {isSuccess && (
// // //         <>
// // //           {!inCall && (
// // //             <AppBar
// // //               color="inherit"
// // //               elevation={1}
// // //               position="sticky"
// // //               sx={{ top: 65 }}
// // //             >
// // //               <Toolbar>
// // //                 <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
// // //                   <div
// // //                     className="animate-charcter"
// // //                     style={{ fontSize: "25px", paddingLeft: "8px" }}
// // //                   >
// // //                     {room.name}
// // //                   </div>
// // //                 </Typography>
// // //                 <Typography
// // //                   noWrap
// // //                   variant="h5"
// // //                   component="div"
// // //                   sx={{ flexGrow: 5 }}
// // //                 >
// // //                   {room.users.map((user) => (
// // //                     <span
// // //                       className="text-uppercase"
// // //                       style={{ fontSize: "18px" }}
// // //                       key={user.userId}
// // //                     >
// // //                       {user.userName},{" "}
// // //                     </span>
// // //                   ))}
// // //                 </Typography>

// // //                 <IconButton
// // //                   disableRipple
// // //                   onClick={handleMenuClick}
// // //                   sx={{
// // //                     display: { xs: "block", md: "none", color: grey[900] },
// // //                   }}
// // //                 >
// // //                   <MoreVertIcon />
// // //                 </IconButton>

// // //                 <Box sx={{ display: { xs: "none", md: "flex" } }}>
// // //                   {room.host === user._id && (
// // //                     <Tooltip arrow title="Add User in room">
// // //                       <button
// // //                         onClick={handleClickOpen}
// // //                         className="btn btn-primary mx-2"
// // //                       >
// // //                         <PersonAddAlt1Icon />
// // //                       </button>
// // //                     </Tooltip>
// // //                   )}

// // //                   {room.host === user._id && (
// // //                     <Tooltip arrow title="Remove User from room">
// // //                       <button
// // //                         onClick={handleClickOpenRemove}
// // //                         className="btn btn-danger mx-2"
// // //                       >
// // //                         <PersonRemoveIcon />
// // //                       </button>
// // //                     </Tooltip>
// // //                   )}

// // //                   <Link
// // //                     to={`/video-call/${roomId}`}
// // //                     style={{ textDecoration: "none" }}
// // //                   >
// // //                     <Tooltip arrow title="Start Video Call">
// // //                       <button className="btn btn-primary mx-2">
// // //                         <VideocamIcon />
// // //                       </button>
// // //                     </Tooltip>
// // //                   </Link>

// // //                   <Tooltip arrow title="Leave Room">
// // //                     <button
// // //                       onClick={handleClick}
// // //                       className="btn btn-danger mx-2"
// // //                     >
// // //                       <ExitToAppIcon />
// // //                     </button>
// // //                   </Tooltip>

// // //                   {room.host === user._id && (
// // //                     <>
// // //                       {isProtected ? (
// // //                         <Tooltip arrow title="Unlock Room">
// // //                           <button
// // //                             onClick={handleChange}
// // //                             className="btn btn-success mx-2"
// // //                           >
// // //                             <LockOpenIcon />
// // //                           </button>
// // //                         </Tooltip>
// // //                       ) : (
// // //                         <Tooltip arrow title="Lock Room">
// // //                           <button
// // //                             onClick={handleChange}
// // //                             className="btn btn-danger mx-2"
// // //                           >
// // //                             <LockIcon />
// // //                           </button>
// // //                         </Tooltip>
// // //                       )}
// // //                     </>
// // //                   )}
// // //                 </Box>
// // //               </Toolbar>
// // //             </AppBar>
// // //           )}

// // //           <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
// // //             <DialogTitle>Add User:</DialogTitle>
// // //             <DialogContent>
// // //               <AddUserInRoom roomId={roomId} usersInRoom={room.users} />
// // //             </DialogContent>
// // //             <DialogActions>
// // //               <Button onClick={handleClose}>Cancel</Button>
// // //             </DialogActions>
// // //           </Dialog>

// // //           <Dialog
// // //             open={openRemove}
// // //             onClose={handleCloseRemove}
// // //             maxWidth="sm"
// // //             fullWidth
// // //           >
// // //             <DialogTitle>Remove User:</DialogTitle>
// // //             <DialogContent>
// // //               <RemoveUserFromRoom roomId={roomId} usersInRoom={room.users} />
// // //             </DialogContent>
// // //             <DialogActions>
// // //               <Button onClick={handleCloseRemove}>Cancel</Button>
// // //             </DialogActions>
// // //           </Dialog>

// // //           <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
// // //             {room.host === user._id && (
// // //               <MenuItem onClick={handleClickOpen}>
// // //                 <ListItemIcon>
// // //                   <PersonAddAlt1Icon fontSize="small" />
// // //                 </ListItemIcon>
// // //                 Add User
// // //               </MenuItem>
// // //             )}

// // //             {room.host === user._id && (
// // //               <MenuItem onClick={handleClickOpenRemove}>
// // //                 <ListItemIcon>
// // //                   <PersonRemoveIcon fontSize="small" />
// // //                 </ListItemIcon>
// // //                 RemoveUser
// // //               </MenuItem>
// // //             )}

// // //             <Link
// // //               to={`/video-call/${roomId}`}
// // //               style={{ textDecoration: "none" }}
// // //             >
// // //               <MenuItem>
// // //                 <ListItemIcon>
// // //                   <VideocamIcon fontSize="small" />
// // //                 </ListItemIcon>
// // //                 Video Call
// // //               </MenuItem>
// // //             </Link>

// // //             <MenuItem onClick={handleClick}>
// // //               <ListItemIcon>
// // //                 <ExitToAppIcon fontSize="small" />
// // //               </ListItemIcon>
// // //               Leave Room
// // //             </MenuItem>

// // //             {room.host === user._id && (
// // //               <MenuItem onClick={handleChange}>
// // //                 {isProtected ? (
// // //                   <>
// // //                     <ListItemIcon>
// // //                       <LockOpenIcon fontSize="small" />
// // //                     </ListItemIcon>
// // //                     Unlock Room
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <ListItemIcon>
// // //                       <LockIcon fontSize="small" />
// // //                     </ListItemIcon>
// // //                     Lock Room
// // //                   </>
// // //                 )}
// // //               </MenuItem>
// // //             )}
// // //           </Menu>

// // //           <Box sx={inCall ? { paddingTop: "35px" } : { paddingTop: "0px" }}>
// // //             <Chat
// // //               userId={user._id}
// // //               name={user.name}
// // //               room={room}
// // //               prevMessages={room.messages}
// // //             />
// // //           </Box>
// // //         </>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // export default Room;
// // import React, { useEffect, useState } from "react";
// // import {
// //   AppBar,
// //   Backdrop,
// //   Button,
// //   CircularProgress,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// //   IconButton,
// //   ListItemIcon,
// //   Menu,
// //   MenuItem,
// //   Toolbar,
// //   Tooltip,
// //   Typography,
// //   Avatar,
// //   Badge,
// //   Chip,
// // } from "@mui/material";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import {
// //   useDeleteRoomMutation,
// //   useEditRoomMutation,
// //   useGetRoomQuery,
// // } from "../../redux/api";

// //   import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// //   import VideocamIcon from "@mui/icons-material/Videocam";
// //   import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// //   import LockIcon from "@mui/icons-material/Lock";
// //   import LockOpenIcon from "@mui/icons-material/LockOpen";
// //   import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// //   import MoreVertIcon from "@mui/icons-material/MoreVert"; 

// // import { toast } from "react-toastify";
// // import { Box } from "@mui/system";
// // import { grey, deepPurple, teal } from "@mui/material/colors";
// // import { useSelector } from "react-redux";
// // import { callActive } from "../../redux/callreducer";
// // import RemoveUserFromRoom from "./RemoveUserFromRoom";
// // import AddUserInRoom from "./AddUserInRoom";
// // import Chat from "../Chat/Chat";
// // import "../../index.css";

// // const Room = () => {
// //   const { roomId } = useParams();
// //   const navigate = useNavigate();
// //   const inCall = useSelector(callActive);
// //   const user = JSON.parse(localStorage.getItem("user"));
// //   const [isProtected, setIsProtected] = useState(true);
// //   const {
// //     data: room,
// //     isSuccess,
// //     isError,
// //     isLoading,
// //     isFetching,
// //     error,
// //   } = useGetRoomQuery({ userId: user._id, roomId });

// //   const [
// //     deleteRoom,
// //     {
// //       data: deleteData,
// //       isSuccess: isDeleteSuccess,
// //       isError: isDeleteError,
// //       isLoading: isDeleteLoading,
// //       error: deleteError,
// //     },
// //   ] = useDeleteRoomMutation();

// //   const [editRoom] = useEditRoomMutation();
// //   const [open, setOpen] = useState(false);
// //   const [openRemove, setOpenRemove] = useState(false);

// //   const [anchorEl, setAnchorEl] = React.useState(null);
// //   const menuOpen = Boolean(anchorEl);
// //   const handleMenuClick = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };
// //   const handleMenuClose = () => {
// //     setAnchorEl(null);
// //   };

// //   const handleClickOpen = () => {
// //     setOpen(true);
// //   };

// //   const handleClose = () => {
// //     setOpen(false);
// //   };

// //   const handleClickOpenRemove = () => {
// //     setOpenRemove(true);
// //   };

// //   const handleCloseRemove = () => {
// //     setOpenRemove(false);
// //   };

// //   const handleClick = async () => {
// //     await deleteRoom({ userId: user._id, roomId });
// //   };

// //   const handleChange = async () => {
// //     await editRoom({ userId: user._id, roomId, isProtected: !isProtected });
// //     setIsProtected(!isProtected);
// //   };

// //   useEffect(() => {
// //     if (isSuccess) setIsProtected(room.isProtected);
// //     if (isError) toast.error(error.message);
// //     //eslint-disable-next-line
// //   }, [isSuccess, isError]);

// //   useEffect(() => {
// //     if (isDeleteSuccess) {
// //       toast.success(deleteData.message);
// //       navigate("/rooms");
// //     }
// //     if (isDeleteError) {
// //       toast.error(deleteError.message);
// //     }
// //     //eslint-disable-next-line
// //   }, [isDeleteSuccess, isDeleteError]);

// //   return (
// //     <>
// //       <Backdrop
// //         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
// //         open={isLoading || isFetching || isDeleteLoading}
// //       >
// //         <CircularProgress color="inherit" />
// //       </Backdrop>
// //       {isSuccess && (
// //         <>
// //           {!inCall && (
// //             <AppBar
// //               color="inherit"
// //               elevation={1}
// //               position="sticky"
// //               sx={{ 
// //                 top: 65,
// //                 background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
// //                 borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
// //               }}
// //             >
// //               <Toolbar>
// //                 <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
// //                   <Badge 
// //                     badgeContent={room.messages.length} 
// //                     color="primary"
// //                     overlap="circular"
// //                     sx={{ mr: 2 }}
// //                   >
// //                     <Avatar 
// //                       sx={{ 
// //                         bgcolor: deepPurple[500],
// //                         width: 56,
// //                         height: 56,
// //                         fontSize: '1.5rem',
// //                         fontWeight: 'bold'
// //                       }}
// //                     >
// //                       {room.name.charAt(0).toUpperCase()}
// //                     </Avatar>
// //                   </Badge>
// //                   <Box>
// //                     <Typography 
// //                       variant="h6" 
// //                       component="div"
// //                       sx={{ 
// //                         fontWeight: 700,
// //                         background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
// //                         WebkitBackgroundClip: 'text',
// //                         WebkitTextFillColor: 'transparent'
// //                       }}
// //                     >
// //                       {room.name}
// //                     </Typography>
// //                     <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
// //                       <Chip 
// //                         label={`${room.users.length} members`}
// //                         size="small"
// //                         sx={{ 
// //                           mr: 1,
// //                           bgcolor: teal[50],
// //                           color: teal[800],
// //                           fontWeight: 500
// //                         }}
// //                       />
// //                       {isProtected && (
// //                         <LockIcon fontSize="small" sx={{ color: grey[600] }} />
// //                       )}
// //                     </Box>
// //                   </Box>
// //                 </Box>

// //                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                   <Box sx={{ 
// //                     display: 'flex', 
// //                     alignItems: 'center',
// //                     mr: 2,
// //                     p: 1,
// //                     borderRadius: 1,
// //                     bgcolor: 'rgba(108, 92, 231, 0.08)'
// //                   }}>
// //                     {room.users.slice(0, 3).map((user, index) => (
// //                       <Tooltip key={user.userId} title={user.userName}>
// //                         <Avatar
// //                           sx={{ 
// //                             width: 32,
// //                             height: 32,
// //                             ml: index > 0 ? -1 : 0,
// //                             border: '2px solid white',
// //                             bgcolor: deepPurple[300],
// //                             fontSize: '0.875rem'
// //                           }}
// //                         >
// //                           {user.userName.charAt(0).toUpperCase()}
// //                         </Avatar>
// //                       </Tooltip>
// //                     ))}
// //                     {room.users.length > 3 && (
// //                       <Chip 
// //                         label={`+${room.users.length - 3}`}
// //                         size="small"
// //                         sx={{ 
// //                           ml: 1,
// //                           bgcolor: 'rgba(108, 92, 231, 0.1)',
// //                           color: deepPurple[600],
// //                           fontWeight: 500
// //                         }}
// //                       />
// //                     )}
// //                   </Box>

// //                   <IconButton
// //                     onClick={handleMenuClick}
// //                     sx={{
// //                       display: { xs: 'block', md: 'none' },
// //                       color: grey[800],
// //                       '&:hover': {
// //                         bgcolor: 'rgba(108, 92, 231, 0.08)'
// //                       }
// //                     }}
// //                   >
// //                     <MoreVertIcon />
// //                   </IconButton>

// //                   <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
// //                     {room.host === user._id && (
// //                       <Tooltip title="Add User">
// //                         <IconButton
// //                           onClick={handleClickOpen}
// //                           sx={{
// //                             bgcolor: 'rgba(108, 92, 231, 0.08)',
// //                             color: deepPurple[600],
// //                             '&:hover': {
// //                               bgcolor: 'rgba(108, 92, 231, 0.2)'
// //                             }
// //                           }}
// //                         >
// //                           <PersonAddAlt1Icon />
// //                         </IconButton>
// //                       </Tooltip>
// //                     )}

// //                     {room.host === user._id && (
// //                       <Tooltip title="Remove User">
// //                         <IconButton
// //                           onClick={handleClickOpenRemove}
// //                           sx={{
// //                             bgcolor: 'rgba(255, 86, 48, 0.08)',
// //                             color: '#ff5630',
// //                             '&:hover': {
// //                               bgcolor: 'rgba(255, 86, 48, 0.2)'
// //                             }
// //                           }}
// //                         >
// //                           <PersonRemoveIcon />
// //                         </IconButton>
// //                       </Tooltip>
// //                     )}

// //                     <Link to={`/video-call/${roomId}`}>
// //                       <Tooltip title="Start Video Call">
// //                         <IconButton
// //                           sx={{
// //                             bgcolor: 'rgba(0, 184, 148, 0.08)',
// //                             color: '#00b894',
// //                             '&:hover': {
// //                               bgcolor: 'rgba(0, 184, 148, 0.2)'
// //                             }
// //                           }}
// //                         >
// //                           <VideocamIcon />
// //                         </IconButton>
// //                       </Tooltip>
// //                     </Link>

// //                     <Tooltip title="Leave Room">
// //                       <IconButton
// //                         onClick={handleClick}
// //                         sx={{
// //                           bgcolor: 'rgba(255, 86, 48, 0.08)',
// //                           color: '#ff5630',
// //                           '&:hover': {
// //                             bgcolor: 'rgba(255, 86, 48, 0.2)'
// //                           }
// //                         }}
// //                       >
// //                         <ExitToAppIcon />
// //                       </IconButton>
// //                     </Tooltip>

// //                     {room.host === user._id && (
// //                       <Tooltip title={isProtected ? "Unlock Room" : "Lock Room"}>
// //                         <IconButton
// //                           onClick={handleChange}
// //                           sx={{
// //                             bgcolor: isProtected 
// //                               ? 'rgba(0, 184, 148, 0.08)' 
// //                               : 'rgba(255, 86, 48, 0.08)',
// //                             color: isProtected ? '#00b894' : '#ff5630',
// //                             '&:hover': {
// //                               bgcolor: isProtected 
// //                                 ? 'rgba(0, 184, 148, 0.2)' 
// //                                 : 'rgba(255, 86, 48, 0.2)'
// //                             }
// //                           }}
// //                         >
// //                           {isProtected ? <LockOpenIcon /> : <LockIcon />}
// //                         </IconButton>
// //                       </Tooltip>
// //                     )}
// //                   </Box>
// //                 </Box>
// //               </Toolbar>
// //             </AppBar>
// //           )}

// //           {/* Dialogs remain unchanged */}
// //           <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
// //             <DialogTitle>Add User:</DialogTitle>
// //             <DialogContent>
// //               <AddUserInRoom roomId={roomId} usersInRoom={room.users} />
// //             </DialogContent>
// //             <DialogActions>
// //               <Button onClick={handleClose}>Cancel</Button>
// //             </DialogActions>
// //           </Dialog>

// //           <Dialog
// //             open={openRemove}
// //             onClose={handleCloseRemove}
// //             maxWidth="sm"
// //             fullWidth
// //           >
// //             <DialogTitle>Remove User:</DialogTitle>
// //             <DialogContent>
// //               <RemoveUserFromRoom roomId={roomId} usersInRoom={room.users} />
// //             </DialogContent>
// //             <DialogActions>
// //               <Button onClick={handleCloseRemove}>Cancel</Button>
// //             </DialogActions>
// //           </Dialog>

// //           <Menu 
// //             anchorEl={anchorEl} 
// //             open={menuOpen} 
// //             onClose={handleMenuClose}
// //             PaperProps={{
// //               sx: {
// //                 minWidth: 200,
// //                 boxShadow: '0 4px 20px 0 rgba(31, 38, 135, 0.15)',
// //                 border: '1px solid rgba(255, 255, 255, 0.18)'
// //               }
// //             }}
// //           >
// //             {room.host === user._id && (
// //               <MenuItem onClick={handleClickOpen}>
// //                 <ListItemIcon>
// //                   <PersonAddAlt1Icon fontSize="small" />
// //                 </ListItemIcon>
// //                 Add User
// //               </MenuItem>
// //             )}

// //             {room.host === user._id && (
// //               <MenuItem onClick={handleClickOpenRemove}>
// //                 <ListItemIcon>
// //                   <PersonRemoveIcon fontSize="small" />
// //                 </ListItemIcon>
// //                 Remove User
// //               </MenuItem>
// //             )}

// //             <Link to={`/video-call/${roomId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
// //               <MenuItem>
// //                 <ListItemIcon>
// //                   <VideocamIcon fontSize="small" />
// //                 </ListItemIcon>
// //                 Video Call
// //               </MenuItem>
// //             </Link>

// //             <MenuItem onClick={handleClick}>
// //               <ListItemIcon>
// //                 <ExitToAppIcon fontSize="small" />
// //               </ListItemIcon>
// //               Leave Room
// //             </MenuItem>

// //             {room.host === user._id && (
// //               <MenuItem onClick={handleChange}>
// //                 <ListItemIcon>
// //                   {isProtected ? (
// //                     <LockOpenIcon fontSize="small" />
// //                   ) : (
// //                     <LockIcon fontSize="small" />
// //                   )}
// //                 </ListItemIcon>
// //                 {isProtected ? 'Unlock Room' : 'Lock Room'}
// //               </MenuItem>
// //             )}
// //           </Menu>

// //           <Box sx={inCall ? { paddingTop: "35px" } : { paddingTop: "0px" }}>
// //             <Chat
// //               userId={user._id}
// //               name={user.name}
// //               room={room}
// //               prevMessages={room.messages}
// //             />
// //           </Box>
// //         </>
// //       )}
// //     </>
// //   );
// // };

// // export default Room;
// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Backdrop,
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   ListItemIcon,
//   Menu,
//   MenuItem,
//   Toolbar,
//   Tooltip,
//   Typography,
//   Avatar,
//   Badge,
//   Chip,
//   TextField,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
// import {
//   useDeleteRoomMutation,
//   useEditRoomMutation,
//   useGetRoomQuery,
//   useUpdateRoomPictureMutation,
// } from "../../redux/api";
// import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";
// import Videocam from "@mui/icons-material/Videocam";
// import ExitToApp from "@mui/icons-material/ExitToApp";
// import Lock from "@mui/icons-material/Lock";
// import LockOpen from "@mui/icons-material/LockOpen";
// import PersonRemove from "@mui/icons-material/PersonRemove";
// import MoreVert from "@mui/icons-material/MoreVert";
// import LinkIcon from "@mui/icons-material/Link";
// import Edit from "@mui/icons-material/Edit";
// import { toast } from "react-toastify";
// import { Box } from "@mui/system";
// import { grey, deepPurple, teal, indigo, amber } from "@mui/material/colors";
// import { useSelector } from "react-redux";
// import { callActive } from "../../redux/callreducer";
// import RemoveUserFromRoom from "./RemoveUserFromRoom";
// import AddUserInRoom from "./AddUserInRoom";
// import Chat from "../Chat/Chat";
// import "../../index.css";


// // Color themes for different groups
// // Color themes for different groups
// const groupThemes = [
//   { bg: 'rgba(108, 92, 231, 0.1)', text: deepPurple[600], hover: 'rgba(108, 92, 231, 0.2)' },
//   { bg: 'rgba(0, 184, 148, 0.1)', text: teal[600], hover: 'rgba(0, 184, 148, 0.2)' },
//   { bg: 'rgba(255, 171, 0, 0.1)', text: amber[600], hover: 'rgba(255, 171, 0, 0.2)' },
//   { bg: 'rgba(255, 86, 48, 0.1)', text: '#ff5630', hover: 'rgba(255, 86, 48, 0.2)' },
// ];

// const Room = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const inCall = useSelector(callActive);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [isProtected, setIsProtected] = useState(true);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [inviteLink, setInviteLink] = useState('');
//   const [editPicture, setEditPicture] = useState(false);
//   const [pictureUrl, setPictureUrl] = useState('');
  
//   // Get theme based on roomId hash for consistent theming
//   const themeIndex = parseInt(roomId.slice(-1)) % groupThemes.length;
//   const theme = groupThemes[themeIndex];

//   const {
//     data: room,
//     isSuccess,
//     isError,
//     isLoading,
//     isFetching,
//     error,
//   } = useGetRoomQuery({ userId: user._id, roomId });

//   const [
//     deleteRoom,
//     {
//       data: deleteData,
//       isSuccess: isDeleteSuccess,
//       isError: isDeleteError,
//       isLoading: isDeleteLoading,
//       error: deleteError,
//     },
//   ] = useDeleteRoomMutation();

//   const [editRoom] = useEditRoomMutation();
//   const [updateRoomPicture] = useUpdateRoomPictureMutation();
//   const [open, setOpen] = useState(false);
//   const [openRemove, setOpenRemove] = useState(false);

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const menuOpen = Boolean(anchorEl);

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleClickOpenRemove = () => {
//     setOpenRemove(true);
//   };

//   const handleCloseRemove = () => {
//     setOpenRemove(false);
//   };

//   const handleClick = async () => {
//     await deleteRoom({ userId: user._id, roomId });
//   };

//   const handleChange = async () => {
//     await editRoom({ userId: user._id, roomId, isProtected: !isProtected });
//     setIsProtected(!isProtected);
//   };

//   const handleShareLink = () => {
//     const link = `${window.location.origin}/join/${roomId}`;
//     setInviteLink(link);
//     if (navigator.share) {
//       navigator.share({
//         title: `Join ${room.name} on our app`,
//         text: `You've been invited to join ${room.name}`,
//         url: link,
//       }).catch(() => {
//         navigator.clipboard.writeText(link);
//         setSnackbarOpen(true);
//       });
//     } else {
//       navigator.clipboard.writeText(link);
//       setSnackbarOpen(true);
//     }
//   };

//   const handlePictureUpdate = async () => {
//     try {
//       await updateRoomPicture({ 
//         userId: user._id, 
//         roomId, 
//         pictureUrl 
//       });
//       setEditPicture(false);
//       toast.success("Group picture updated successfully!");
//     } catch (err) {
//       toast.error("Failed to update group picture");
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       setIsProtected(room.isProtected);
//       setPictureUrl(room.pictureUrl || '');
//     }
//     if (isError) toast.error(error.message);
//   }, [isSuccess, isError, room]);

//   useEffect(() => {
//     if (isDeleteSuccess) {
//       toast.success(deleteData.message);
//       navigate("/rooms");
//     }
//     if (isDeleteError) {
//       toast.error(deleteError.message);
//     }
//   }, [isDeleteSuccess, isDeleteError]);

//   return (
//     <>
//       <Backdrop
//         sx={{ 
//           color: "#fff", 
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           backdropFilter: "blur(5px)"
//         }}
//         open={isLoading || isFetching || isDeleteLoading}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
      
//       {isSuccess && (
//         <>
//           {!inCall && (
//             <AppBar
//               position="sticky"
//               sx={{ 
//                 top: 65,
//                 background: 'rgba(255, 255, 255, 0.9)',
//                 backdropFilter: 'blur(10px)',
//                 borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
//                 boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
//               }}
//             >
//               <Toolbar sx={{ px: 3 }}>
//                 <Box sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   flexGrow: 1,
//                   gap: 2
//                 }}>
//                   <Box sx={{ position: 'relative' }}>
//                     {editPicture ? (
//                       <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//                         <TextField
//                           size="small"
//                           value={pictureUrl}
//                           onChange={(e) => setPictureUrl(e.target.value)}
//                           placeholder="Enter image URL"
//                         />
//                         <Button 
//                           variant="contained" 
//                           size="small"
//                           onClick={handlePictureUpdate}
//                           sx={{
//                             bgcolor: theme.text,
//                             '&:hover': { bgcolor: theme.text }
//                           }}
//                         >
//                           Save
//                         </Button>
//                         <Button 
//                           variant="outlined" 
//                           size="small"
//                           onClick={() => setEditPicture(false)}
//                         >
//                           Cancel
//                         </Button>
//                       </Box>
//                     ) : (
//                       <>
//                         <Avatar 
//                           src={pictureUrl}
//                           sx={{ 
//                             width: 56,
//                             height: 56,
//                             fontSize: '1.5rem',
//                             fontWeight: 'bold',
//                             bgcolor: theme.bg,
//                             color: theme.text,
//                             border: `2px solid ${theme.text}`,
//                             transition: 'all 0.3s ease',
//                             '&:hover': {
//                               transform: 'scale(1.05)',
//                               boxShadow: `0 0 0 3px ${theme.text}33`
//                             }
//                           }}
//                         >
//                           {pictureUrl ? '' : room.name.charAt(0).toUpperCase()}
//                         </Avatar>
//                         {room.host === user._id && (
//                           <IconButton
//                             onClick={() => setEditPicture(true)}
//                             sx={{
//                               position: 'absolute',
//                               bottom: 0,
//                               right: 0,
//                               bgcolor: 'white',
//                               '&:hover': {
//                                 bgcolor: 'rgba(255,255,255,0.8)'
//                               }
//                             }}
//                           >
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                         )}
//                       </>
//                     )}
//                   </Box>
                  
//                   <Box>
//                     <Typography 
//                       variant="h6" 
//                       component="div"
//                       sx={{ 
//                         fontWeight: 700,
//                         color: theme.text,
//                         lineHeight: 1.2
//                       }}
//                     >
//                       {room.name}
//                     </Typography>
//                     <Box sx={{ 
//                       display: 'flex', 
//                       alignItems: 'center', 
//                       mt: 0.5,
//                       gap: 1
//                     }}>
//                       <Chip 
//                         label={`${room.users.length} members`}
//                         size="small"
//                         sx={{ 
//                           bgcolor: `${theme.bg}`,
//                           color: theme.text,
//                           fontWeight: 500,
//                           borderRadius: 1
//                         }}
//                       />
//                       {isProtected && (
//                         <LockIcon fontSize="small" sx={{ color: theme.text }} />
//                       )}
//                     </Box>
//                   </Box>
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center',
//                     mr: 1,
//                     p: 1,
//                     borderRadius: 2,
//                     bgcolor: theme.bg
//                   }}>
//                     {room.users.slice(0, 3).map((user, index) => (
//                       <Tooltip key={user.userId} title={user.userName}>
//                         <Avatar
//                           src={user.avatar}
//                           sx={{ 
//                             width: 32,
//                             height: 32,
//                             ml: index > 0 ? -1.5 : 0,
//                             border: '2px solid white',
//                             bgcolor: theme.text,
//                             color: 'white',
//                             fontSize: '0.875rem',
//                             transition: 'all 0.2s ease',
//                             '&:hover': {
//                               transform: 'scale(1.2)',
//                               zIndex: 1
//                             }
//                           }}
//                         >
//                           {user.userName.charAt(0).toUpperCase()}
//                         </Avatar>
//                       </Tooltip>
//                     ))}
//                     {room.users.length > 3 && (
//                       <Chip 
//                         label={`+${room.users.length - 3}`}
//                         size="small"
//                         sx={{ 
//                           ml: 1,
//                           bgcolor: `${theme.bg}`,
//                           color: theme.text,
//                           fontWeight: 500
//                         }}
//                       />
//                     )}
//                   </Box>

//                   <IconButton
//                     onClick={handleMenuClick}
//                     sx={{
//                       display: { xs: 'flex', md: 'none' },
//                       color: theme.text,
//                       bgcolor: theme.bg,
//                       '&:hover': {
//                         bgcolor: theme.hover
//                       }
//                     }}
//                   >
//                     <MoreVertIcon />
//                   </IconButton>

//                   <Box sx={{ 
//                     display: { xs: 'none', md: 'flex' }, 
//                     gap: 1,
//                     '& > *': {
//                       transition: 'all 0.3s ease'
//                     }
//                   }}>
//                     <Tooltip title="Invite via link">
//                       <IconButton
//                         onClick={handleShareLink}
//                         sx={{
//                           bgcolor: theme.bg,
//                           color: theme.text,
//                           '&:hover': {
//                             bgcolor: theme.hover,
//                             transform: 'rotate(15deg) scale(1.1)'
//                           }
//                         }}
//                       >
//                         <LinkIcon />
//                       </IconButton>
//                     </Tooltip>

//                     {room.host === user._id && (
//                       <Tooltip title="Add User">
//                         <IconButton
//                           onClick={handleClickOpen}
//                           sx={{
//                             bgcolor: theme.bg,
//                             color: theme.text,
//                             '&:hover': {
//                               bgcolor: theme.hover,
//                               transform: 'translateY(-3px)'
//                             }
//                           }}
//                         >
//                           <PersonAddAlt1Icon />
//                         </IconButton>
//                       </Tooltip>
//                     )}

//                     {room.host === user._id && (
//                       <Tooltip title="Remove User">
//                         <IconButton
//                           onClick={handleClickOpenRemove}
//                           sx={{
//                             bgcolor: theme.bg,
//                             color: theme.text,
//                             '&:hover': {
//                               bgcolor: theme.hover,
//                               animation: 'shake 0.5s'
//                             }
//                           }}
//                         >
//                           <PersonRemoveIcon />
//                         </IconButton>
//                       </Tooltip>
//                     )}

//                     <Link to={`/video-call/${roomId}`}>
//                       <Tooltip title="Start Video Call">
//                         <IconButton
//                           sx={{
//                             bgcolor: theme.bg,
//                             color: theme.text,
//                             '&:hover': {
//                               bgcolor: theme.hover,
//                               transform: 'scale(1.1)'
//                             }
//                           }}
//                         >
//                           <VideocamIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </Link>

//                     <Tooltip title="Leave Room">
//                       <IconButton
//                         onClick={handleClick}
//                         sx={{
//                           bgcolor: theme.bg,
//                           color: theme.text,
//                           '&:hover': {
//                             bgcolor: theme.hover,
//                             transform: 'rotate(15deg)'
//                           }
//                         }}
//                       >
//                         <ExitToAppIcon />
//                       </IconButton>
//                     </Tooltip>

//                     {room.host === user._id && (
//                       <Tooltip title={isProtected ? "Unlock Room" : "Lock Room"}>
//                         <IconButton
//                           onClick={handleChange}
//                           sx={{
//                             bgcolor: theme.bg,
//                             color: theme.text,
//                             '&:hover': {
//                               bgcolor: theme.hover,
//                               transform: 'scale(1.1) rotate(45deg)'
//                             }
//                           }}
//                         >
//                           {isProtected ? <LockOpenIcon /> : <LockIcon />}
//                         </IconButton>
//                       </Tooltip>
//                     )}
//                   </Box>
//                 </Box>
//               </Toolbar>
//             </AppBar>
//           )}

//           {/* Dialogs remain unchanged */}
//           <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//             <DialogTitle>Add User:</DialogTitle>
//             <DialogContent>
//               <AddUserInRoom roomId={roomId} usersInRoom={room.users} />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleClose}>Cancel</Button>
//             </DialogActions>
//           </Dialog>

//           <Dialog
//             open={openRemove}
//             onClose={handleCloseRemove}
//             maxWidth="sm"
//             fullWidth
//           >
//             <DialogTitle>Remove User:</DialogTitle>
//             <DialogContent>
//               <RemoveUserFromRoom roomId={roomId} usersInRoom={room.users} />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseRemove}>Cancel</Button>
//             </DialogActions>
//           </Dialog>

//           <Menu 
//             anchorEl={anchorEl} 
//             open={menuOpen} 
//             onClose={handleMenuClose}
//             PaperProps={{
//               sx: {
//                 minWidth: 200,
//                 boxShadow: '0 4px 20px 0 rgba(31, 38, 135, 0.15)',
//                 border: '1px solid rgba(255, 255, 255, 0.18)',
//                 bgcolor: 'rgba(255,255,255,0.9)',
//                 backdropFilter: 'blur(10px)'
//               }
//             }}
//           >
//             <MenuItem onClick={handleShareLink}>
//               <ListItemIcon>
//                 <LinkIcon fontSize="small" />
//               </ListItemIcon>
//               Invite via Link
//             </MenuItem>

//             {room.host === user._id && (
//               <MenuItem onClick={handleClickOpen}>
//                 <ListItemIcon>
//                   <PersonAddAlt1Icon fontSize="small" />
//                 </ListItemIcon>
//                 Add User
//               </MenuItem>
//             )}

//             {room.host === user._id && (
//               <MenuItem onClick={handleClickOpenRemove}>
//                 <ListItemIcon>
//                   <PersonRemoveIcon fontSize="small" />
//                 </ListItemIcon>
//                 Remove User
//               </MenuItem>
//             )}

//             <Link to={`/video-call/${roomId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//               <MenuItem>
//                 <ListItemIcon>
//                   <VideocamIcon fontSize="small" />
//                 </ListItemIcon>
//                 Video Call
//               </MenuItem>
//             </Link>

//             <MenuItem onClick={handleClick}>
//               <ListItemIcon>
//                 <ExitToAppIcon fontSize="small" />
//               </ListItemIcon>
//               Leave Room
//             </MenuItem>

//             {room.host === user._id && (
//               <MenuItem onClick={handleChange}>
//                 <ListItemIcon>
//                   {isProtected ? (
//                     <LockOpenIcon fontSize="small" />
//                   ) : (
//                     <LockIcon fontSize="small" />
//                   )}
//                 </ListItemIcon>
//                 {isProtected ? 'Unlock Room' : 'Lock Room'}
//               </MenuItem>
//             )}
//           </Menu>

//           <Box sx={inCall ? { paddingTop: "35px" } : { paddingTop: "0px" }}>
//             <Chat
//               userId={user._id}
//               name={user.name}
//               room={room}
//               prevMessages={room.messages}
//             />
//           </Box>

//           <Snackbar
//             open={snackbarOpen}
//             autoHideDuration={3000}
//             onClose={() => setSnackbarOpen(false)}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//           >
//             <Alert 
//               onClose={() => setSnackbarOpen(false)} 
//               severity="success"
//               sx={{ width: '100%' }}
//             >
//               Invite link copied to clipboard!
//             </Alert>
//           </Snackbar>
//         </>
//       )}
//     </>
//   );
// };

// export default Room;









//Included groupInvite and best UI
import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
  Chip,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteRoomMutation,
  useEditRoomMutation,
  useGetRoomQuery,
  useUpdateRoomPictureMutation,
} from "../../redux/api";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VideocamIcon from "@mui/icons-material/Videocam";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LinkIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { toast } from "react-toastify";
import { deepPurple, purple, indigo } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { callActive } from "../../redux/callreducer";
import RemoveUserFromRoom from "./RemoveUserFromRoom";
import AddUserInRoom from "./AddUserInRoom";
import Chat from "../Chat/Chat";
import "../../index.css";

// Color themes with fallback values
const groupThemes = [
  { 
    bg: 'rgba(103, 58, 183, 0.1)', 
    text: purple[700] || '#7b1fa2', 
    hover: 'rgba(103, 58, 183, 0.2)', 
    button: purple[600] || '#9c27b0'
  },
  { 
    bg: 'rgba(63, 81, 181, 0.1)', 
    text: indigo[600] || '#3949ab', 
    hover: 'rgba(63, 81, 181, 0.2)', 
    button: indigo[500] || '#3f51b5'
  },
  { 
    bg: 'rgba(156, 39, 176, 0.1)', 
    text: deepPurple[700] || '#7b1fa2', 
    hover: 'rgba(156, 39, 176, 0.2)', 
    button: deepPurple[600] || '#8e24aa'
  },
  { 
    bg: 'rgba(111, 66, 193, 0.1)', 
    text: deepPurple[800] || '#5e35b1', 
    hover: 'rgba(111, 66, 193, 0.2)', 
    button: deepPurple[700] || '#7b1fa2'
  },
];

const defaultTheme = {
  bg: 'rgba(103, 58, 183, 0.1)',
  text: '#7b1fa2',
  hover: 'rgba(103, 58, 183, 0.2)',
  button: '#9c27b0'
};

const getSafeTheme = (roomId) => {
  try {
    if (!roomId) return defaultTheme;
    const index = parseInt(roomId.slice(-1)) % groupThemes.length;
    return groupThemes[index] || defaultTheme;
  } catch {
    return defaultTheme;
  }
};

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const inCall = useSelector(callActive);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [isProtected, setIsProtected] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [editPicture, setEditPicture] = useState(false);
  const [pictureFile, setPictureFile] = useState(null);
  const [picturePreview, setPicturePreview] = useState('');
  const fileInputRef = useRef(null);
  
  // Get theme safely with fallbacks
  const theme = getSafeTheme(roomId);

  const {
    data: room,
    isSuccess,
    isError,
    isLoading,
    isFetching,
    error,
  } = useGetRoomQuery({ userId: user?._id, roomId });

  const [
    deleteRoom,
    {
      data: deleteData,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      isLoading: isDeleteLoading,
      error: deleteError,
    },
  ] = useDeleteRoomMutation();

  const [editRoom] = useEditRoomMutation();
  const [updateRoomPicture] = useUpdateRoomPictureMutation();
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const handleClick = async () => {
    await deleteRoom({ userId: user?._id, roomId });
  };

  const handleChange = async () => {
    await editRoom({ userId: user?._id, roomId, isProtected: !isProtected });
    setIsProtected(!isProtected);
  };

  const handleShareLink = () => {
    const link = `${window.location.origin}/join/${roomId}`;
    setInviteLink(link);
    if (navigator.share) {
      navigator.share({
        title: `Join ${room?.name} on our app`,
        text: `You've been invited to join ${room?.name}`,
        url: link,
      }).catch(() => {
        navigator.clipboard.writeText(link);
        setSnackbarOpen(true);
      });
    } else {
      navigator.clipboard.writeText(link);
      setSnackbarOpen(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPictureFile(file);
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPicturePreview(e.target.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handlePictureUpload = () => {
    fileInputRef.current.click();
  };

  const handlePictureUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('picture', pictureFile);
      
      await updateRoomPicture({ 
        userId: user?._id, 
        roomId, 
        pictureUrl: picturePreview,
        pictureFile: formData
      });
      
      setEditPicture(false);
      toast.success("Group picture updated successfully!");
    } catch (err) {
      toast.error("Failed to update group picture");
    }
  };

  const cancelPictureEdit = () => {
    setEditPicture(false);
    setPicturePreview('');
    setPictureFile(null);
  };

  useEffect(() => {
    if (isSuccess && room) {
      setIsProtected(room.isProtected);
      if (room.pictureUrl) {
        setPicturePreview(room.pictureUrl);
      }
    }
    if (isError) toast.error(error?.message || "Error loading room");
  }, [isSuccess, isError, room, error]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success(deleteData?.message || "Room deleted successfully");
      navigate("/rooms");
    }
    if (isDeleteError) {
      toast.error(deleteError?.message || "Error deleting room");
    }
  }, [isDeleteSuccess, isDeleteError, deleteData, deleteError, navigate]);

  if (!user?._id) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Please log in to view this room</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Error loading room: {error?.message || "Unknown error"}
        </Typography>
        <Button onClick={() => navigate('/rooms')} variant="contained" sx={{ mt: 2 }}>
          Back to Rooms
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Backdrop
        sx={{ 
          color: "#fff", 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(5px)"
        }}
        open={isLoading || isFetching || isDeleteLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      
      {isSuccess && room && (
        <>
          {!inCall && (
            <AppBar
              position="sticky"
              sx={{ 
                top: 65,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
              }}
            >
              <Toolbar sx={{ px: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  flexGrow: 1,
                  gap: 2
                }}>
                  <Box sx={{ position: 'relative' }}>
                    {editPicture ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                        />
                        
                        {picturePreview ? (
                          <Avatar 
                            src={picturePreview}
                            sx={{ 
                              width: 80,
                              height: 80,
                              border: `2px solid ${theme.button}`,
                              mb: 1
                            }}
                          />
                        ) : (
                          <Box 
                            sx={{
                              width: 80,
                              height: 80,
                              border: `2px dashed ${theme.button}`,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 1,
                              cursor: 'pointer'
                            }}
                            onClick={handlePictureUpload}
                          >
                            <PhotoCameraIcon sx={{ color: theme.button }} />
                          </Box>
                        )}
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button 
                            variant="contained" 
                            size="small"
                            onClick={handlePictureUpload}
                            sx={{
                              bgcolor: theme.button,
                              '&:hover': { bgcolor: theme.text }
                            }}
                          >
                            Select Image
                          </Button>
                          
                          {pictureFile && (
                            <Button 
                              variant="contained" 
                              size="small"
                              onClick={handlePictureUpdate}
                              sx={{
                                bgcolor: theme.button,
                                '&:hover': { bgcolor: theme.text }
                              }}
                            >
                              Save
                            </Button>
                          )}
                          
                          <Button 
                            variant="outlined" 
                            size="small"
                            onClick={cancelPictureEdit}
                            sx={{
                              color: theme.text,
                              borderColor: theme.text,
                              '&:hover': { borderColor: theme.button }
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <>
                        <Avatar 
                          src={picturePreview}
                          sx={{ 
                            width: 56,
                            height: 56,
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            bgcolor: theme.bg,
                            color: theme.text,
                            border: `2px solid ${theme.text}`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                              boxShadow: `0 0 0 3px ${theme.text}33`
                            }
                          }}
                        >
                          {picturePreview ? '' : room.name.charAt(0).toUpperCase()}
                        </Avatar>
                        {room.host === user._id && (
                          <IconButton
                            onClick={() => setEditPicture(true)}
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              right: 0,
                              bgcolor: 'white',
                              '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.8)'
                              }
                            }}
                          >
                            <EditIcon fontSize="small" sx={{ color: theme.text }} />
                          </IconButton>
                        )}
                      </>
                    )}
                  </Box>
                  
                  <Box>
                    <Typography 
                      variant="h6" 
                      component="div"
                      sx={{ 
                        fontWeight: 700,
                        color: theme.text,
                        lineHeight: 1.2
                      }}
                    >
                      {room.name}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mt: 0.5,
                      gap: 1
                    }}>
                      <Chip 
                        label={`${room.users.length} members`}
                        size="small"
                        sx={{ 
                          bgcolor: theme.bg,
                          color: theme.text,
                          fontWeight: 500,
                          borderRadius: 1
                        }}
                      />
                      {isProtected && (
                        <LockIcon fontSize="small" sx={{ color: theme.text }} />
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mr: 1,
                    p: 1,
                    borderRadius: 2,
                    bgcolor: theme.bg
                  }}>
                    {room.users.slice(0, 3).map((user, index) => (
                      <Tooltip key={user.userId} title={user.userName}>
                        <Avatar
                          src={user.avatar}
                          sx={{ 
                            width: 32,
                            height: 32,
                            ml: index > 0 ? -1.5 : 0,
                            border: '2px solid white',
                            bgcolor: theme.text,
                            color: 'white',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'scale(1.2)',
                              zIndex: 1
                            }
                          }}
                        >
                          {user.userName.charAt(0).toUpperCase()}
                        </Avatar>
                      </Tooltip>
                    ))}
                    {room.users.length > 3 && (
                      <Chip 
                        label={`+${room.users.length - 3}`}
                        size="small"
                        sx={{ 
                          ml: 1,
                          bgcolor: theme.bg,
                          color: theme.text,
                          fontWeight: 500
                        }}
                      />
                    )}
                  </Box>

                  <IconButton
                    onClick={handleMenuClick}
                    sx={{
                      display: { xs: 'flex', md: 'none' },
                      color: theme.text,
                      bgcolor: theme.bg,
                      '&:hover': {
                        bgcolor: theme.hover
                      }
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <Box sx={{ 
                    display: { xs: 'none', md: 'flex' }, 
                    gap: 1,
                    '& > *': {
                      transition: 'all 0.3s ease'
                    }
                  }}>
                    <Tooltip title="Invite via link">
                      <IconButton
                        onClick={handleShareLink}
                        sx={{
                          bgcolor: theme.bg,
                          color: theme.text,
                          '&:hover': {
                            bgcolor: theme.hover,
                            transform: 'rotate(15deg) scale(1.1)'
                          }
                        }}
                      >
                        <LinkIcon />
                      </IconButton>
                    </Tooltip>

                    {room.host === user._id && (
                      <Tooltip title="Add User">
                        <IconButton
                          onClick={handleClickOpen}
                          sx={{
                            bgcolor: theme.bg,
                            color: theme.text,
                            '&:hover': {
                              bgcolor: theme.hover,
                              transform: 'translateY(-3px)'
                            }
                          }}
                        >
                          <PersonAddAlt1Icon />
                        </IconButton>
                      </Tooltip>
                    )}

                    {room.host === user._id && (
                      <Tooltip title="Remove User">
                        <IconButton
                          onClick={handleClickOpenRemove}
                          sx={{
                            bgcolor: theme.bg,
                            color: theme.text,
                            '&:hover': {
                              bgcolor: theme.hover,
                              animation: 'shake 0.5s'
                            }
                          }}
                        >
                          <PersonRemoveIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    <Link to={`/video-call/${roomId}`}>
                      <Tooltip title="Start Video Call">
                        <IconButton
                          sx={{
                            bgcolor: theme.bg,
                            color: theme.text,
                            '&:hover': {
                              bgcolor: theme.hover,
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <VideocamIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>

                    <Tooltip title="Leave Room">
                      <IconButton
                        onClick={handleClick}
                        sx={{
                          bgcolor: theme.bg,
                          color: theme.text,
                          '&:hover': {
                            bgcolor: theme.hover,
                            transform: 'rotate(15deg)'
                          }
                        }}
                      >
                        <ExitToAppIcon />
                      </IconButton>
                    </Tooltip>

                    {room.host === user._id && (
                      <Tooltip title={isProtected ? "Unlock Room" : "Lock Room"}>
                        <IconButton
                          onClick={handleChange}
                          sx={{
                            bgcolor: theme.bg,
                            color: theme.text,
                            '&:hover': {
                              bgcolor: theme.hover,
                              transform: 'scale(1.1) rotate(45deg)'
                            }
                          }}
                        >
                          {isProtected ? <LockOpenIcon /> : <LockIcon />}
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </Toolbar>
            </AppBar>
          )}

          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add User:</DialogTitle>
            <DialogContent>
              <AddUserInRoom roomId={roomId} usersInRoom={room.users} />
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleClose}
                sx={{
                  color: theme.text,
                  '&:hover': { bgcolor: theme.bg }
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openRemove}
            onClose={handleCloseRemove}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Remove User:</DialogTitle>
            <DialogContent>
              <RemoveUserFromRoom roomId={roomId} usersInRoom={room.users} />
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseRemove}
                sx={{
                  color: theme.text,
                  '&:hover': { bgcolor: theme.bg }
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Menu 
            anchorEl={anchorEl} 
            open={menuOpen} 
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                minWidth: 200,
                boxShadow: '0 4px 20px 0 rgba(31, 38, 135, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                bgcolor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)'
              }
            }}
          >
            <MenuItem onClick={handleShareLink}>
              <ListItemIcon>
                <LinkIcon fontSize="small" sx={{ color: theme.text }} />
              </ListItemIcon>
              Invite via Link
            </MenuItem>

            {room.host === user._id && (
              <MenuItem onClick={handleClickOpen}>
                <ListItemIcon>
                  <PersonAddAlt1Icon fontSize="small" sx={{ color: theme.text }} />
                </ListItemIcon>
                Add User
              </MenuItem>
            )}

            {room.host === user._id && (
              <MenuItem onClick={handleClickOpenRemove}>
                <ListItemIcon>
                  <PersonRemoveIcon fontSize="small" sx={{ color: theme.text }} />
                </ListItemIcon>
                Remove User
              </MenuItem>
            )}

            <Link to={`/video-call/${roomId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <ListItemIcon>
                  <VideocamIcon fontSize="small" sx={{ color: theme.text }} />
                </ListItemIcon>
                Video Call
              </MenuItem>
            </Link>

            <MenuItem onClick={handleClick}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" sx={{ color: theme.text }} />
              </ListItemIcon>
              Leave Room
            </MenuItem>

            {room.host === user._id && (
              <MenuItem onClick={handleChange}>
                <ListItemIcon>
                  {isProtected ? (
                    <LockOpenIcon fontSize="small" sx={{ color: theme.text }} />
                  ) : (
                    <LockIcon fontSize="small" sx={{ color: theme.text }} />
                  )}
                </ListItemIcon>
                {isProtected ? 'Unlock Room' : 'Lock Room'}
              </MenuItem>
            )}
          </Menu>

          <Box sx={inCall ? { paddingTop: "35px" } : { paddingTop: "0px" }}>
            <Chat
              userId={user._id}
              name={user.name}
              room={room}
              prevMessages={room.messages}
            />
          </Box>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={() => setSnackbarOpen(false)} 
              severity="success"
              sx={{ width: '100%' }}
            >
              Invite link copied to clipboard!
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};

export default Room;