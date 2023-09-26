export class allRequeste {
  static async request(url, options) {
    console.log(options);
    alert("you sure");
    options.onRequest = function ({ options }) {
      options.headers = options.headers || {};
      options.headers.Authorization = "Bearer token";
    };
    return fetch(url, options);
    // return useFetch(url, options);
  }
}
