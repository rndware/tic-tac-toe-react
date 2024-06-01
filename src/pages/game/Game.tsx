import React from "react";
import GameContainer from "../../containers/GameContainer";
import StarBackground from "../../components/star-background";

const Game = () => (
  <div className="GamePage">
    <StarBackground />
    <GameContainer />
  </div>
);

export default Game;
