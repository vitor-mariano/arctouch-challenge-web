import axios from 'axios';

const request = axios.create({
  baseURL: process.env.apiUrl,
  timeout: 10000,
});

export const getUpcomingMovies = (page: number = 1) => {
  return request.get(`movie/upcoming?page=${page}`);
};

export const getMovieById = (id: number) => {
  return request.get(`movie/${id}`);
};
