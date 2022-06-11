import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../api";

export const getPost = async () => getRequest("posts?_limit=5");

export const getComment = async (id) =>
  getRequest(`posts/${id}/comments?_limit=3`);

export const editPost = async (data) => patchRequest(`posts/2`, data);

export const createPost = async (data) => postRequest("posts", data);

export const deletePost = async (id) => deleteRequest(`posts/${id}`);
