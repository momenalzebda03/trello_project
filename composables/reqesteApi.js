export async function request(url, options) {
  const alertConfirm = confirm("Are You Sure");
  if (alertConfirm) {
    options.headers = options.headers || {};
    options.headers.Authorization = "Bearer token";
    try {
      const response = await $fetch(url, options);
      return response;
    } catch (error) {
      console.error("Fetch error:", error);
      error;
    }
  }
}
