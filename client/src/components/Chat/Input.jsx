// import React, { useEffect, useState } from "react";
// import { Tooltip } from "@mui/material";
// import MicSharpIcon from "@mui/icons-material/MicSharp";
// import MicOffSharpIcon from "@mui/icons-material/MicOffSharp";
// import SendIcon from "@mui/icons-material/Send";
// import "../../index.css";
// import "../../index.scss";

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// const mic = new SpeechRecognition();

// mic.continuous = true;
// mic.interimResults = true;
// mic.lang = "en-US";

// const Input = ({
//   room,
//   userId,
//   typingHandler,
//   setMessage,
//   sendMessage,
//   message,
// }) => {
//   const [isListening, setIsListening] = useState(false);

//   useEffect(() => {
//     handleListen();
//     //eslint-disable-next-line
//   }, [isListening]);

//   const handleListen = () => {
//     if (isListening) {
//       mic.start();
//       mic.onend = () => {
//         console.log("continue..");
//         mic.start();
//       };
//     } else {
//       mic.stop();
//       mic.onend = () => {
//         console.log("Stopped Mic on Click");
//       };
//     }
//     mic.onstart = () => {
//       console.log("Mics on");
//     };

//     mic.onresult = (event) => {
//       const transcript = Array.from(event.results)
//         .map((result) => result[0])
//         .map((result) => result.transcript)
//         .join("");
//       console.log(transcript);
//       setMessage(transcript);
//       mic.onerror = (event) => {
//         console.log(event.error);
//       };
//     };
//   };

//   if (room.isProtected === false || room.host === userId) {
//     return (
//       <div className="foot form-group d-flex">
//         <input
//           id="message"
//           placeholder="Type a message..."
//           value={message}
//           className="form-control bg-light"
//           onChange={typingHandler}
//           onKeyPress={(event) =>
//             event.key === "Enter" ? sendMessage(event) : null
//           }
//         />
//         {isListening ? (
//           <Tooltip arrow title="🔴Stop Listening">
//             <button
//               onClick={() => setIsListening((prevState) => !prevState)}
//               className="btn btn-danger mx-2"
//             >
//               <MicOffSharpIcon />
//             </button>
//           </Tooltip>
//         ) : (
//           <Tooltip arrow title="👂Start Listening">
//             <button
//               onClick={() => setIsListening((prevState) => !prevState)}
//               className="btn btn-primary mx-2"
//             >
//               <MicSharpIcon />
//             </button>
//           </Tooltip>
//         )}
//         <button
//           onClick={(e) => sendMessage(e)}
//           className="btn btn-primary mr-2"
//         >
//           <SendIcon />
//         </button>
//       </div>
//     );
//   } else {
//     return (
//       <div className="foot">
//         <h4>Only host can send message.</h4>
//       </div>
//     );
//   }
// };

// export default Input;


import React, { useEffect, useState, useRef } from "react";
import {
  Tooltip,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  CircularProgress,
  Chip,
} from "@mui/material";
import MicSharpIcon from "@mui/icons-material/MicSharp";
import MicOffSharpIcon from "@mui/icons-material/MicOffSharp";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import CloseIcon from "@mui/icons-material/Close";
import "../../index.css";
import "../../index.scss";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const Input = ({
  room,
  userId,
  typingHandler,
  setMessage,
  sendMessage,
  message,
  sendFile,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    handleListen();
    return () => {
      mic.stop();
    };
    // eslint-disable-next-line
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }

    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setMessage(transcript);
    };

    mic.onerror = (event) => {
      console.log(event.error);
    };
  };

  const handleFileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFileClose = () => {
    setAnchorEl(null);
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const triggerFileInput = (type) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = getAcceptAttribute(type);
      fileInputRef.current.click();
    }
    handleFileClose();
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (selectedFile) {
      setIsUploading(true);
      try {
        await sendFile(selectedFile);
        setSelectedFile(null);
      } catch (error) {
        console.error("File upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
    
    if (message.trim()) {
      sendMessage(e);
      setMessage("");
    }
  };

  const getAcceptAttribute = (type) => {
    switch (type) {
      case "pdf":
        return "application/pdf";
      case "image":
        return "image/*";
      case "ppt":
        return "application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation";
      case "audio":
        return "audio/*";
      default:
        return "*";
    }
  };

  if (room.isProtected === false || room.host === userId) {
    return (
      <form onSubmit={handleSend} className="foot form-group d-flex">
        <input
          id="message"
          placeholder="Type a message..."
          value={message}
          className="form-control bg-light"
          onChange={typingHandler}
        />

        {/* File Sharing */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInput}
        />

        {/* File Preview */}
        {selectedFile && (
          <Chip
            label={selectedFile.name}
            onDelete={clearSelectedFile}
            deleteIcon={<CloseIcon />}
            sx={{ mx: 1, maxWidth: 150 }}
          />
        )}

        {/* Attach File Button (always visible) */}
        <Tooltip title="Attach files">
          <IconButton
            onClick={handleFileClick}
            sx={{
              color: "primary.main",
              mx: 1,
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
            }}
          >
            <AttachFileIcon />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleFileClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
            },
          }}
        >
          <MenuItem onClick={() => triggerFileInput("image")}>
            <ListItemIcon>
              <ImageIcon fontSize="small" />
            </ListItemIcon>
            Image
          </MenuItem>
          <MenuItem onClick={() => triggerFileInput("pdf")}>
            <ListItemIcon>
              <PictureAsPdfIcon fontSize="small" />
            </ListItemIcon>
            PDF
          </MenuItem>
          <MenuItem onClick={() => triggerFileInput("ppt")}>
            <ListItemIcon>
              <SlideshowIcon fontSize="small" />
            </ListItemIcon>
            Presentation
          </MenuItem>
          <MenuItem onClick={() => triggerFileInput("audio")}>
            <ListItemIcon>
              <AudiotrackIcon fontSize="small" />
            </ListItemIcon>
            Audio
          </MenuItem>
        </Menu>

        {/* Voice Recording Button (always visible) */}
        <Tooltip title={isListening ? "Stop listening" : "Start listening"}>
          <IconButton
            onClick={() => setIsListening((prev) => !prev)}
            sx={{
              color: isListening ? "error.main" : "primary.main",
              mx: 1,
              "&:hover": {
                backgroundColor: isListening
                  ? "rgba(244, 67, 54, 0.04)"
                  : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            {isListening ? <MicOffSharpIcon /> : <MicSharpIcon />}
          </IconButton>
        </Tooltip>

        {/* Send Button (always visible) */}
        <Tooltip title="Send message">
          <IconButton
            type="submit"
            disabled={isUploading || (!message.trim() && !selectedFile)}
            sx={{
              color: "primary.main",
              mr: 1,
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
              "&:disabled": { opacity: 0.5 },
            }}
          >
            {isUploading ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Tooltip>
      </form>
    );
  } else {
    return (
      <div className="foot">
        <h4>Only host can send messages.</h4>
      </div>
    );
  }
};

export default Input;