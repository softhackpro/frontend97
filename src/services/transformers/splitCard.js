export const splitTeenCards = (cards) => {
  let Joker = null;
  let Player_A = [];
  let Player_B = [];

  if (cards.length % 2 !== 0) {
    // If length is odd, take the first element separately
    Joker = cards[0];
    cards = cards.slice(1); // Remove the first element
  }

  // Split remaining elements into even and odd indexed groups
  cards.forEach((card, index) => {
    if (index % 2 === 0) {
      Player_A.push(card);
    } else {
      Player_B.push(card);
    }
  });

  return [
    { cards: Joker, playerName: "Joker" },
    { cards: Player_A, playerName: "Player A" },
    { cards: Player_B, playerName: "Player B" },
  ];
};

// Example usage
const cardsArray = ["JCC", "8CC", "10SS", "2SS", "8SS", "3CC"];
// //(splitTeenCards(cardsArray));

export const splitPokerCards = (cardsArray) => {
  let Player_A = [];
  let Player_B = [];
  let Board = [];

  // Splitting cards into Player_A and Player_B
  for (let i = 0; i < cardsArray.length; i++) {
    if (i < 2) {
      Player_A.push(cardsArray[i]);
    } else if (i < 4) {
      Player_B.push(cardsArray[i]);
    } else {
      Board.push(cardsArray[i]);
    }
  }
  return [
    { cards: Player_A, playerName: "Player A" },
    { cards: Player_B, playerName: "Player B" },
    { cards: Board, playerName: "Board" },
  ];
};
// //(splitPokerCards([8, 2, 6, 2, 10, 10, 19, 15]));

export const splitDTL = (cardsArray) => {
  let dragon = cardsArray[0];
  let tiger = cardsArray[1];
  let lion = null;
  if (cardsArray.length > 2) {
    lion = cardsArray[2];
  }
  return [
    { cards: dragon, playerName: "dragon" },
    { cards: tiger, playerName: "tiger" },
    { cards: lion, playerName: "lion" },
  ];
};
