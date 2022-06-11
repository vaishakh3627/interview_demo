import { React, useState } from "react";

import {
  Modal,
  Box,
  Fade,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";

import "../style.scss";

import { editPost } from "./api";

function Edit({ modal, handleClose }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "whitesmoke",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdate = async () => {
    setStatus("loading");
    await editPost({ title: title, body: body, userId: 1 })
      .then(() => {
        setStatus("done");
        setBody("");
        setTitle("");
        handleClose();
      })
      .catch(() => setStatus("error"));
  };

  return (
    <Modal open={modal}>
      <Fade in={modal}>
        <Box sx={style}>
          <h4 className="text-center">Edit Your Post</h4>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            className="input"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            multiline
            minRows={3}
            id="outlined-basic"
            label="Body"
            variant="outlined"
            className="input"
            size="small"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ textTransform: "capitalize" }}
              onClick={handleUpdate}
            >
              {status === "loading" ? (
                <CircularProgress size="1rem" color="success" />
              ) : (
                "Update"
              )}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
              style={{ textTransform: "capitalize" }}
            >
              Close
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default Edit;
