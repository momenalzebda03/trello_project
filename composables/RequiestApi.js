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

  static async DeleteTitle(id) {
    await useFetch(`http://localhost:3000/Trello/${id}`, {
      method: "delete",
    }).catch((error) => {
      console.log(error);
    });
  }

  static async addMainTitle(MainTitle, posts) {
    await ApiService.postMainTitle(MainTitle.value)
      .then(() => {
        MainTitle.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
    await this.fetchReload(posts);
  }

  static async fetchReload(posts) {
    ApiService.fetchGet()
      .then((data) => {
        posts.value = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // static async DeleteId(id) {
  //   await ApiService.DeleteTitle(id).catch((error) => {
  //     console.log(error);
  //   });
  //   await this.fetchReload();
  // }
}
