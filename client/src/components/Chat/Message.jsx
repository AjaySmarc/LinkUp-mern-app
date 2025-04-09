// import React from "react";
// import moment from "moment";
// import { Avatar } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import "./chat.css";
// import "../../index.scss";

// const Message = ({ message, name, userId }) => {
//   let isSentByCurrentUser = false;

//   if (message.senderId === userId) {
//     isSentByCurrentUser = true;
//   }
//   return isSentByCurrentUser ? (
//     <div className="row justify-content-end pl-5 ">
//       <div className="rec d-flex flex-column align-items-end m-2 shadow p-2  border rounded w-auto">
//         <div>
//           <em className="m-1 flex-start fw-bold text-uppercase">{name}</em>
//           <em className="m-1 flex-end" style={{ fontSize: "10px" }}>
//             {moment(message.timestamp).format("DD/MM hh:mm")}
//           </em>
//         </div>
//         <h6 className="m-1">{message.message}</h6>
//       </div>
//     </div>
//   ) : (
//     <div className="row justify-content-start pl-5 ">
//       <Avatar sx={{ marginTop: "12px" }}>
//         <PersonIcon />
//       </Avatar>
//       <div className="sen d-flex flex-column align-items-end my-2 shadow p-2 border rounded w-auto">
//         <div>
//           <em className="m-1 flex-start fw-bold text-uppercase">
//             {message.sender}
//           </em>
//           <em className="m-1 flex-end" style={{ fontSize: "10px" }}>
//             {moment(message.timestamp).format("DD/MM hh:mm")}
//           </em>
//         </div>
//         <h6 className="m-1">{message.message}</h6>
//       </div>
//     </div>
//   );
// };

// export default Message;


import React from "react";
import { Box, Typography, Paper, Avatar, Chip, Link } from "@mui/material";
import { styled } from "@mui/system";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PersonIcon from "@mui/icons-material/Person";
import moment from "moment";
import "./chat.css";
import "../../index.scss";

const MessageWrapper = styled(Box)(({ theme, isSender }) => ({
  display: "flex",
  justifyContent: isSender ? "flex-end" : "flex-start",
  marginBottom: theme.spacing(1),
  padding: theme.spacing(0.5),
}));

const MessageContent = styled(Paper)(({ theme, isSender }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(2),
  maxWidth: "70%",
  wordBreak: "break-word",
  backgroundColor: isSender ? theme.palette.primary.light : theme.palette.background.paper,
  color: isSender ? theme.palette.primary.contrastText : theme.palette.text.primary,
  boxShadow: theme.shadows[1],
}));

const TimeStamp = styled(Typography)({
  fontSize: "0.7rem",
  marginTop: "4px",
  opacity: 0.7,
  textAlign: "right",
});

const FilePreviewWrapper = styled(Box)({
  marginTop: "8px",
  borderRadius: "8px",
  overflow: "hidden",
});

const Message = ({ message, name, userId }) => {
  const isSentByCurrentUser = message.senderId === userId;

  const renderFilePreview = () => {
    const { fileType, fileUrl } = message;
    
    switch (fileType) {
      case "image":
        return (
          <FilePreviewWrapper>
            <img 
              src={fileUrl} 
              alt={message.message} 
              style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} 
            />
          </FilePreviewWrapper>
        );
      case "audio":
        return (
          <Box sx={{ mt: 1 }}>
            <audio controls style={{ width: '100%' }}>
              <source src={fileUrl} />
              Your browser does not support the audio element.
            </audio>
          </Box>  
        );
      case "pdf":
        return (
          <Link href={fileUrl} target="_blank" underline="none">
            <Chip
              icon={<PictureAsPdfIcon />}
              label={message.message}
              variant="outlined"
              sx={{ my: 1, maxWidth: '100%' }}
            />
          </Link>
        );
      case "presentation":
        return (
          <Link href={fileUrl} target="_blank" underline="none">
            <Chip
              icon={<SlideshowIcon />}
              label={message.message}
              variant="outlined"
              sx={{ my: 1, maxWidth: '100%' }}
            />
          </Link>
        );
      default:
        return (
          <Link href={fileUrl} target="_blank" underline="none">
            <Chip
              icon={<InsertDriveFileIcon />}
              label={message.message}
              variant="outlined"
              sx={{ my: 1, maxWidth: '100%' }}
            />
          </Link>
        );
    }
  };

  return isSentByCurrentUser ? (
    <MessageWrapper isSender={true}>
      <Box sx={{ maxWidth: "70%" }}>
        <MessageContent isSender={true}>
          {message.isFile ? (
            renderFilePreview()
          ) : (
            <Typography variant="body1">{message.message}</Typography>
          )}
          <TimeStamp color="textSecondary">
            {moment(message.timestamp).format("DD/MM hh:mm")}
          </TimeStamp>
        </MessageContent>
      </Box>
    </MessageWrapper>
  ) : (
    <MessageWrapper isSender={false}>
      <Avatar sx={{ 
        width: 32, 
        height: 32, 
        bgcolor: "secondary.main",
        mr: 1,
        fontSize: "0.875rem"
      }}>
        <PersonIcon />
      </Avatar>
      <Box sx={{ maxWidth: "70%" }}>
        <Typography variant="caption" sx={{ ml: 1, color: "text.secondary" }}>
          {message.sender}
        </Typography>
        <MessageContent isSender={false}>
          {message.isFile ? (
            renderFilePreview()
          ) : (
            <Typography variant="body1">{message.message}</Typography>
          )}
          <TimeStamp color="textSecondary">
            {moment(message.timestamp).format("DD/MM hh:mm")}
          </TimeStamp>
        </MessageContent>
      </Box>
    </MessageWrapper>
  );
};

export default Message;