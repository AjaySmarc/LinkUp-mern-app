// import React from "react";
// import Message from "./Message";
// import "../../index.scss";

// const Messages = ({ messages, name, userId }) => {
//   return (
//     <div className="messages">
//       {messages.map((message, i) => (
//         <div key={i}>
//           <Message message={message} name={name} userId={userId} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Messages;
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
import "../../index.scss";

// Styled components with proper fallbacks
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
  backgroundColor: isSender 
    ? theme.palette?.primary?.light || '#e3f2fd' 
    : theme.palette?.background?.paper || '#ffffff',
  color: isSender 
    ? theme.palette?.primary?.contrastText || '#000000'
    : theme.palette?.text?.primary || '#000000',
  boxShadow: theme.shadows?.[1] || '0px 2px 1px -1px rgba(0,0,0,0.2)',
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

const Message = ({ message = {}, name = "", userId = "" }) => {
  // Safe defaults for message object
  const safeMessage = {
    senderId: "",
    sender: "",
    message: "",
    timestamp: new Date(),
    isFile: false,
    fileType: "",
    fileUrl: "",
    ...message
  };

  const isSentByCurrentUser = safeMessage.senderId === userId;

  const renderFilePreview = () => {
    if (!safeMessage.isFile) return null;

    const { fileType, fileUrl } = safeMessage;
    
    switch (fileType) {
      case "image":
        return (
          <FilePreviewWrapper>
            <img 
              src={fileUrl} 
              alt={safeMessage.message} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '200px', 
                borderRadius: '8px' 
              }} 
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/200x150?text=Image+Not+Available';
              }}
            />
          </FilePreviewWrapper>
        );
      case "audio":
        return (
          <Box sx={{ mt: 1 }}>
            <audio controls style={{ width: '100%' }}>
              <source src={fileUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </Box>  
        );
      case "pdf":
        return (
          <Link href={fileUrl} target="_blank" underline="none">
            <Chip
              icon={<PictureAsPdfIcon />}
              label={safeMessage.message || "PDF File"}
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
              label={safeMessage.message || "Presentation File"}
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
              label={safeMessage.message || "Download File"}
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
          {safeMessage.isFile ? (
            renderFilePreview()
          ) : (
            <Typography variant="body1">
              {safeMessage.message || ""}
            </Typography>
          )}
          <TimeStamp color="textSecondary">
            {moment(safeMessage.timestamp).isValid() 
              ? moment(safeMessage.timestamp).format("DD/MM hh:mm") 
              : ""}
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
          {safeMessage.sender || "Unknown"}
        </Typography>
        <MessageContent isSender={false}>
          {safeMessage.isFile ? (
            renderFilePreview()
          ) : (
            <Typography variant="body1">
              {safeMessage.message || ""}
            </Typography>
          )}
          <TimeStamp color="textSecondary">
            {moment(safeMessage.timestamp).isValid() 
              ? moment(safeMessage.timestamp).format("DD/MM hh:mm") 
              : ""}
          </TimeStamp>
        </MessageContent>
      </Box>
    </MessageWrapper>
  );
};

const Messages = ({ messages = [], name = "", userId = "" }) => {
  if (!Array.isArray(messages)) {
    console.error("Messages prop must be an array");
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error">
          Error: Messages data is not available
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 2, 
      overflow: "auto",
      minHeight: '100px',
      backgroundColor: 'background.default'
    }}>
      {messages.length > 0 ? (
        messages.map((message, i) => (
          <Message 
            key={`${i}-${message.timestamp || i}`} 
            message={message} 
            name={name} 
            userId={userId} 
          />
        ))
      ) : (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100px'
        }}>
          <Typography variant="body1" color="text.secondary">
            No messages yet
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Messages;