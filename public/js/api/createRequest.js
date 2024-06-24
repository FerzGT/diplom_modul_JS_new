/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  let formData = new FormData();
  xhr.responseType = `json`;
  xhr.withCredentials = true;

  if (options.method === `GET`) {
    options.url += "?"; 
    for (let item in options.data) { 
    options.url += `${item}=${options.data[item]}&`;
    formData.append(item, options.data[item]);
    }
    options.url = options.url.slice(0,-1);
  } else {
    for (let key in options.data) {
      formData.append(key,options.data[key]);
    }
  };

  try {
    xhr.open(options.method, options.url, true);
      
    xhr.send(formData);
  } catch (err) {
    options.callback(err)
  };

  xhr.addEventListener(`load`, function() {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      options.callback(null, xhr.response);
    }
  });

  return xhr;
};