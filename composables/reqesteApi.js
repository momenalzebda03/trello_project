export async function request(url, options) {
  const alertConfirm = confirm("Are You Sure");
  if (alertConfirm == true) {
    options.onRequest = function ({ options }) {
      options.headers = options.headers || {};
      options.headers.Authorization = "Bearer token";
    };
    return useFetch(url, options);
  }
}