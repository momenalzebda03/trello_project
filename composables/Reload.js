// export class ApiReload {
//   static async addMainTitle(MainTitle, posts) {
//     await ApiService.postMainTitle(MainTitle.value)
//       .then(() => {
//         MainTitle.value = "";
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     await this.fetchReload(posts);
//   }

//   static async fetchReload(posts) {
//     ApiService.fetchGet()
//       .then((data) => {
//         posts.value = data;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// }
