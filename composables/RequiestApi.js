export class ApiService {
  static async postMainTitle(MainTitle) {
    await useFetch("http://localhost:3000/Trello", {
      method: "post",
      body: {
        MainTitle: MainTitle,
      },
    }).catch((error) => {
      console.log(error);
    });
    this.fetchGet();
  }
  static async fetchGet() {
    return fetch("http://localhost:3000/Trello")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}
