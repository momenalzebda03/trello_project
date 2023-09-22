const baseUrl = "http://localhost:3000";

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
    return fetch(`${baseUrl}/${ApiTerllo}/${postId}`)
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
      .then(() => {
        return `${baseUrl}/${ApiTerllo}`;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static async deleteCard(cardId, postId, urlTrello) {
    return fetch(`${baseUrl}/${urlTrello}/${postId}`)
      .then((fetchResponse) => {
        return fetchResponse.json();
      })
      .then((trelloapi) => {
        const cardIndexToDelete = trelloapi.cards.findIndex(
          (item) => item.id == cardId
        );
        if (cardIndexToDelete !== -1) {
          trelloapi.cards.splice(cardIndexToDelete, 1);
          return fetch(`http://localhost:3000/Trello/${postId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(trelloapi),
          });
        }
      })
      .then(() => {
        return `${baseUrl}/${urlTrello}`;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
