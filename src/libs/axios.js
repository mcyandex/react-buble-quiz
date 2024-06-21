import axios from "axios";

const instance = axios.create({
  baseURL: "https://bolls.life/",
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  function (err) {
    if (err) {
    }

    return Promise.reject(err);
  }
);

export const GetRandomChapter = (lang, bookId, chapterId) => {
  return new Promise((resolve, reject) => {
    instance
      .get(`/get-chapter/${lang}/${bookId}/${chapterId}/`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const GetBooks = (lang) => {
  return new Promise((resolve, reject) => {
    instance
      .get(`/get-books/${lang}/`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default instance;
