import { React, useEffect, useState } from "react";

import {
  Avatar,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";

import Logo from "../../assets/logo.jpg";

import { createPost } from "./api";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");

  const handlePost = async () => {
    setStatus("loading");
    await createPost({ title: title, body: body, userId: 1 })
      .then(() => {
        setStatus("done");
        setBody("");
        setTitle("");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => {
    if (status !== "") {
      setTimeout(() => {
        setStatus("");
      }, 1000);
    }
  }, [status]);

  return (
    <Grid container className="create-post-wrapper">
      <Snackbar
        open={status === "done"}
        autoHideDuration={10000}
        message={"Post added successfully"}
      />
      <Grid item xs={2} className="avatar-container">
        <Avatar alt="Remy Sharp" src={Logo} />
      </Grid>
      <Grid item xs={10} className="post-input-container">
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          className="input"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={10} className="post-input-container">
        <Collapse in={title !== ""}>
          <TextField
            multiline
            minRows={3}
            id="outlined-basic"
            label="Post"
            variant="outlined"
            className="text-area"
            size="small"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="button-container">
            <Button
              variant="contained"
              className="c-button"
              disabled={body === ""}
              onClick={handlePost}
            >
              {status === "loading" ? (
                <CircularProgress size="1rem" color="success" />
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </Collapse>
      </Grid>
    </Grid>
  );
}

export default CreatePost;
