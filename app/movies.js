// import fs from 'fs';
// import path from 'path';

// const movieJson = fs.readFileSync(path.resolve(__dirname, './movie.json'), 'utf8');
// const genreJson = fs.readFileSync(path.resolve(__dirname, './genre.json'), 'utf8');
// const sortOptionJson = fs.readFileSync(path.resolve(__dirname, './sortOptions.json'), 'utf8');
// const watchStatusJson = fs.readFileSync(path.resolve(__dirname, './watchStatus.json'), 'utf8');
//
// export const movies = JSON.parse(movieJson);
// export const genres= JSON.parse(genreJson);
// export const sortOptions = JSON.parse(sortOptionJson);
// export const watchStatus = JSON.parse(watchStatusJson);


const movieJson = require('./data/movie.json');
const genreJson = require('./data/genre.json');
const sortOptionJson = require('./data/sortoptions.json');
const watchStatusJson = require('./data/watchstatus.json');
const watchListJson = require('./data/watchlist.json');
export const movies = movieJson;
export const genres = genreJson;
export const sortOptions = sortOptionJson;
export const watchStatus = watchStatusJson;
export const watchList = watchListJson;
