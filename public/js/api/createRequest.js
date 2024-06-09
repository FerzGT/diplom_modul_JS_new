/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  let formData = new FormData();
  xhr.responseType = 'json';
     if (options.method === "GET") {
      options.url += "?";
      for (let param in options.data) {
          options.url += param + "=" + options.data[param] + "&";
          formData.append(param, options.data[param]);
      }
      options.url = options.url.slice(0, -1);
  } else {
      for (let param in options.data) {
          formData.append(param, options.data[param]);
      }
  }

  xhr.withCredentials = true;

        xhr.addEventListener("load", function () {
          if (this.readyState === 4 && this.status === 200) {
              options.callback(null, xhr.response);
          }
      });


  xhr.open(options.method, options.url, true);

  try {
      options.method == "GET" ? xhr.send(): xhr.send(formData);
      return xhr;
  } catch (err) {
      options.callback(err);
  }
};