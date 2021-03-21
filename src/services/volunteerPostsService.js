import { getAllVolunteerPostsAPI } from '../config.json';
import axios from 'axios';

export function getAllVolunteerPosts() {
  return axios.get(getAllVolunteerPostsAPI);
}

export function postVolunteerPost(params) {
  return axios.post(getAllVolunteerPostsAPI, params);
}