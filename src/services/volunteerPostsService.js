import { getAllVolunteerPostsAPI } from '../config';
import axios from 'axios';

export function getAllVolunteerPosts() {
  return axios.get(getAllVolunteerPostsAPI);
}

export function postVolunteerPost(params) {
  return axios.post(getAllVolunteerPostsAPI, params);
}