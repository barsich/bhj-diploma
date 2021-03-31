/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  if (!options.data) {
    return;
  }
  

  const xhr = new XMLHttpRequest();
  let formData;

  if (options.method === 'GET') {
    options.url += '?';
    for (let key in options.data) {
      options.url += `${key}=${options.data[key]}&`;
    }
    options.url -= '&';
  } else {
    formData = new FormData();
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
  }

  try {
    xhr.open(options.method, options.url);
    xhr.send(formData);
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        options.callback(response.error, response);
      }
    });
  } catch (error) {
    console.error(error);
  }
};