import Cards from "./Cards";

const PlayerCards = ({ cardsDetail }) => {
  return (
    <div className="mb-2">
      {cardsDetail.map(
        ({ playerName, cards }) =>
          cards?.length > 0 && (
            <div key={playerName}>
              <div className="text-xs mb-1">{playerName}</div>
              <div className="flex items-center gap-0.5">
                {cards &&
                  cards.length &&
                  cards?.map((card, index) => (
                    <Cards key={index} cardType={card} />
                  ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default PlayerCards;
