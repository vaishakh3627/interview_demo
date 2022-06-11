import React from "react";

import { Grid } from "@mui/material";

import "./style.scss";

import CreatePost from "./home/CreatePost";
import Post from "./home/Post";

function Layout() {
  return (
    <Grid container className="layout-wrapper">
      <CreatePost />
      <Post />
    </Grid>
  );
}

export default Layout;
