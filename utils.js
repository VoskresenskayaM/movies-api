/* const { PORT = 3000 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;
const { SECRET_KEY = 'my-secret-key' } = process.env; */
const ok = 200;
const created = 201;
const notValidation = 400;
const incorrectData = 401;
const noRights = 403;
const notFound = 404;
const isExist = 409;
const serverError = 500;
const isExists = 11000;
const regEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;
const regPassword = /[0-9a-zA-Z!@#$%^&*]{6,20}/;
const regId = /^[\w]{24}$/;
const regLink = /https?:\/\/\S+/;
const movieCreateYear = /^20[0-1][0-9]$|^202[0-3]$|^19[0-9]{2}$/;
const movieNameRu = /* /^[?!,.:-«»'а-яА-ЯёЁ0-9a-zA-Z\s]+$/ *//^[?!,.-яА-ЯёЁa-zA-Z0-9\s'«»:–&-ё—’]+$/;
const movieNameEn = /* /^[?!,.:-«»'a-zA-Z0-9\s]+$/; *//^[?!,.-яА-ЯёЁa-zA-Z0-9\s'«»:–&-ё—’]+$/;

module.exports = {
  ok,
  created,
  notValidation,
  incorrectData,
  noRights,
  notFound,
  isExist,
  serverError,
  /* PORT,
  DB_ADDRESS,
  SECRET_KEY, */
  regEmail,
  regPassword,
  regId,
  regLink,
  isExists,
  movieCreateYear,
  movieNameRu,
  movieNameEn,
};
