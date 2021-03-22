import { getAllVolunteerPostsAPI } from '../config.json';
import axios from 'axios';

export function getAllVolunteerPosts() {
  return axios.get(getAllVolunteerPostsAPI);
}

export function postVolunteerPost(params) {
  return axios.post(getAllVolunteerPostsAPI, params);
}

export function getVolunteerPost(id) {
  return axios.get(`${getAllVolunteerPosts}/${id}`)
}

export function updatePost(params) {
  return axios.put(getAllVolunteerPostsAPI, params)
}

export function deleteVolunteerPost(id) {
  return axios.delete(`${getAllVolunteerPostsAPI}/${id}`)
}
