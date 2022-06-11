import { React, useState, useEffect, useLayoutEffect } from "react";

import { Button, Collapse, Grid } from "@mui/material";

import { MdOutlineModeComment, MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";

import { deletePost, getComment, getPost } from "./api";

import EditModal from "./EditModal";

function Post() {
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});

  const addToComments = (index, data) =>
    setComments((previousState) => ({ ...previousState, [index]: data }));

  const populatePosts = () => getPost().then((res) => setPosts(res.data));

  useLayoutEffect(() => {
    populatePosts();
  }, []);

  const handleClose = () => {
    setModal(false);
  };

  const populateComments = () => {
    let commentIds = posts.map((item) => item.id);
    commentIds.map((item) =>
      getComment(item).then((res) => addToComments(item, res.data))
    );
  };

  useEffect(() => {
    populateComments();
  }, [posts]);

  const handleDelete = (e) => {
    deletePost().then(
      (res) => setPosts((res) => res.filter((_, index) => index !== 0)),
      console.log("post deleted")
    );
  };

  const handleComment = (e) => {
    setShow(!show);
  };

  return (
    <Grid container className="post-wrapper">
      {posts &&
        posts.map((item, key) => (
          <Grid item xs={12} className="post" key={key}>
            <div className="title">
              <h3>{item.title}</h3>
              <div className="title-buttons">
                <Button
                  variant="contained"
                  className="edit"
                  onClick={() => setModal(true)}
                >
                  <BiEdit size={20} />
                </Button>
                <Button
                  variant="contained"
                  className="delete"
                  onClick={() => handleDelete(item.id)}
                >
                  <MdDelete size={20} />
                </Button>
              </div>
            </div>
            <div className="description">
              <p>{item.body}</p>
            </div>
            <div
              className="comment-section"
              onClick={() => handleComment(item.id)}
            >
              <MdOutlineModeComment size={25} color="rgba(40, 52, 62, 0.57)" />
              {comments[item.id] && comments[item.id] && (
                <p>
                  {comments[item.id].length}
                  <span>Comments</span>
                </p>
              )}
            </div>
            <Collapse in={show}>
              <Grid container className="comments">
                {comments[item.id] &&
                  comments[item.id].map((item, key) => (
                    <Grid item xs={12} className="comments-wrapper" key={key}>
                      <div className="account-icon">
                        <VscAccount size={40} color="blue" />
                      </div>
                      <div className="comment">
                        <h4>{item.name}</h4>
                        <p>{item.body}</p>
                      </div>
                    </Grid>
                  ))}
              </Grid>
            </Collapse>
          </Grid>
        ))}
      <EditModal modal={modal} handleClose={handleClose} />
    </Grid>
  );
}

export default Post;
