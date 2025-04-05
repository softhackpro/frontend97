import Cards from "./Cards";

const PlayerCards = ({ cardsDetail }) => {
  if (!Array.isArray(cardsDetail) || cardsDetail.length === 0) {
    return null; // or fallback UI
  }

  return (
    <div className="mb-2 max-w-screen overflow-x-auto">
      <div className="flex flex-col gap-2">
        {cardsDetail.map((player, idx) => {
          const playerName = player?.playerName || `Player ${idx + 1}`;
          const cards = Array.isArray(player?.cards) ? player.cards : [];

          if (cards.length === 0) return null;

          return (
            <div key={playerName + idx} className="min-w-fit">
              <div className="text-xs mb-1">{playerName}</div>
              <div className="flex items-center gap-0.5 overflow-x-auto max-w-full scrollbar-thin scrollbar-thumb-gray-300">
                {cards.map((card, index) =>
                  card ? <Cards key={index} cardType={card} /> : null
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerCards;
