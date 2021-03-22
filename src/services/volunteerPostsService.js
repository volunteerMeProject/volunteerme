import { volunteerPostApiUrl } from '../config';
import axios from 'axios';

export function getAllVolunteerPosts() {
  return axios.get(volunteerPostApiUrl);
}

export function postVolunteerPost(params) {
  return axios.post(volunteerPostApiUrl, params);
}

export function getVolunteerPost(id) {
  return axios.get(`${volunteerPostApiUrl}/${id}`)
}

export function updatePost(params) {
  return axios.put(volunteerPostApiUrl, params)
}

export function deleteVolunteerPost(id) {
  return axios.delete(`${volunteerPostApiUrl}/${id}`)
}