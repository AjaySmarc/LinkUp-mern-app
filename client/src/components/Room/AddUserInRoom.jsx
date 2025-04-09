// import React, { useState } from "react";
// import {
//   Backdrop,
//   Button,
//   CircularProgress,
//   ListItemText,
//   MenuItem,
//   MenuList,
// } from "@mui/material";
// import { useAddUserInRoomMutation, useGetRoomsQuery, useGetUsersQuery } from "../../redux/api";
// import { useEffect } from "react";
// import { toast } from "react-toastify";

// const AddUserInRoom = ({ roomId, usersInRoom }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const { data: users, isSuccess } = useGetUsersQuery();

//   const [
//     addUserInRoom,
//     { isLoading, isSuccess: addUserSuccess, isError, error },
//   ] = useAddUserInRoomMutation();
//   // const { refetch } = useGetRoomsQuery();

//   const [searchTerm, setSearchTerm] = useState("");

//   const handleClick = async (newUser) => {
//     await addUserInRoom({ userId: user._id, roomId, newUserId: newUser._id });
//     // refetch();
//   };

//   useEffect(() => {
//     if (addUserSuccess) {
//       toast.success("User Added");
//       window.location.reload(false);
//     }
//     if (isError) {
//       toast.error(error.message);
//     }
//     //eslint-disable-next-line
//   }, [isLoading]);

//   return (
//     <>
//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={isLoading}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//       <div>
//         <input
//           placeholder="Search User..."
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ marginTop: "10px" }}
//           className="form-control bg-light"
//         />
//         <br />
//         <div>
//           {isSuccess && (
//             <MenuList>
//               {users
//                 .filter((user) => {
//                   if (
//                     usersInRoom.some((newUser) => newUser.userId === user._id)
//                   )
//                     return false;
//                   if (searchTerm === "") return true;
//                   else if (
//                     user.name
//                       .toLowerCase()
//                       .includes(searchTerm.toLowerCase()) ||
//                     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//                   )
//                     return true;
//                   return false;
//                 })
//                 .map((newUser) => (
//                   <MenuItem key={newUser._id}>
//                     <ListItemText>
//                       <h3>{newUser.name}</h3>
//                       <p>{newUser.email}</p>
//                     </ListItemText>
//                     <Button
//                       variant="contained"
//                       onClick={() => handleClick(newUser)}
//                     >
//                       Add
//                     </Button>
//                   </MenuItem>
//                 ))}
//             </MenuList>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddUserInRoom;
import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Avatar,
  Card,
  CardContent,
  CardActions,
  InputAdornment,
  TextField,
  Typography,
  Fade,
  Grow,
} from "@mui/material";
import {
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { useAddUserInRoomMutation, useGetUsersQuery } from "../../redux/api";
import { toast } from "react-toastify";

const AddUserInRoom = ({ roomId, usersInRoom }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data: users = [], isSuccess } = useGetUsersQuery();
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [
    addUserInRoom,
    { isLoading, isSuccess: addUserSuccess, isError, error },
  ] = useAddUserInRoomMutation();

  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on search term and existing room members
  useEffect(() => {
    if (isSuccess) {
      const filtered = users.filter((user) => {
        const isAlreadyInRoom = usersInRoom.some(
          (roomUser) => roomUser.userId === user._id
        );
        
        if (isAlreadyInRoom) return false;
        
        if (!searchTerm) return true;
        
        return (
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm, usersInRoom, isSuccess]);

  const handleAddUser = async (newUser) => {
    try {
      await addUserInRoom({
        userId: user._id,
        roomId,
        newUserId: newUser._id,
      });
    } catch (err) {
      console.error("Failed to add user:", err);
    }
  };

  useEffect(() => {
    if (addUserSuccess) {
      toast.success("User added successfully");
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to add user");
    }
  }, [addUserSuccess, isError, error]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div style={{ padding: "16px" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
        />

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((newUser, index) => (
              <Grow in timeout={(index + 1) * 150} key={newUser._id}>
                <Card
                  sx={{
                    mb: 2,
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          mr: 2,
                          bgcolor: "primary.main",
                        }}
                      >
                        {newUser.name.charAt(0)}
                      </Avatar>
                      <div>
                        <Typography variant="h6" component="div">
                          {newUser.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {newUser.email}
                        </Typography>
                      </div>
                    </div>
                    <CardActions>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<PersonAddIcon />}
                        onClick={() => handleAddUser(newUser)}
                        sx={{
                          borderRadius: "8px",
                          textTransform: "none",
                          px: 2,
                          py: 1,
                        }}
                      >
                        Add to Room
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grow>
            ))
          ) : (
            <Fade in>
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                sx={{ mt: 4 }}
              >
                {searchTerm
                  ? "No users found matching your search"
                  : "No users available to add"}
              </Typography>
            </Fade>
          )}
        </div>
      </div>
    </>
  );
};

export default AddUserInRoom;