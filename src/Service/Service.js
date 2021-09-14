export default function apiService(imageSearch, page) {
  const API_KEY = '22326636-8d9d25d1f9cff7f7e66e8dd75';
  const BASE_URL = 'https://pixabay.com/api/';
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${imageSearch}&page=${page}&per_page=12&key=${API_KEY}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Это ошибка, её нужно как-то решить'));
  });
}
