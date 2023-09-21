const baseUrl = "http://localhost:3000";
import axios from "axios";

export class ApiService {
  static async postMainTitle(ApiTerllo, MainTitle) {
    await useFetch(`${baseUrl}/${ApiTerllo}`, {
      method: "post",
      body: {
        MainTitle: MainTitle,
      },
    }).catch((error) => {
      console.log(error);
    });
  }

  static async fetchGet(ApiTerllo) {
    return fetch(`${baseUrl}/${ApiTerllo}`)
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

  static async DeleteTitle(ApiTerllo, id) {
    await useFetch(`${baseUrl}/${ApiTerllo}/${id}`, {
      method: "delete",
    }).catch((error) => {
      console.log(error);
    });
  }

  static async ApiPost(ApiTerllo, postId, cardTitle) {
    fetch(`${baseUrl}/${ApiTerllo}/${postId}`)
      .then((response) => {
        return response.json();
      })
      .then((trelloapi) => {
        const newCard = {
          id: Math.floor(Math.random() * 1000),
          titleCard: cardTitle,
        };
        if (!trelloapi.cards) {
          trelloapi.cards = [];
        }
        trelloapi.cards.push(newCard);
        return fetch(`${baseUrl}/${ApiTerllo}/${postId}`, {
          method: "PUT",
          body: JSON.stringify(trelloapi),
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
      .then((putResponse) => {
        console.log(baseUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
