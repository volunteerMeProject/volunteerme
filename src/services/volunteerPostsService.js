import { getAllVolunteerPostsAPI, getOnePost } from '../config.json';
import axios from 'axios';

export function getAllVolunteerPosts() {
  return axios.get(getAllVolunteerPostsAPI);
}

export function postVolunteerPost(params) {
  return axios.post(getAllVolunteerPostsAPI, params);
}

export function getVolunteerPost(id) {
  return axios.get(`${getOnePost}/${id}`)
}

export function updatePost(params) {
  return axios.put(getAllVolunteerPostsAPI, params)
}