import React, { useContext } from 'react'
import Section from '../Section'
import GridContainer from '../GridContainer'
import CasinoCard from './CasinoCard'
import { CasinoContext } from '../../services/casino/casino.context'


const CasinoBox = () => {
  const { allCasinoGames } = useContext(CasinoContext);
  
  return (
      <Section backgroundImage="https://97sports.in/casinobg.4aafd0d08a047031.png" classname='max-w-lg m-auto'>
          <GridContainer>
  {allCasinoGames.length > 0 ? (
    allCasinoGames.map((game, index) => (
      <CasinoCard key={`${game.gid}-${index}`} game={game} />
    ))
  ) : (
    <div style={{ color: "white", textAlign: "center", padding: "20px" }}>
      No games available to play.
    </div>
  )}
</GridContainer>
      </Section>
  );
};

export default CasinoBox;