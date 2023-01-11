import react, { useEffect, useState } from "react";
import "./css/GameGrid.css";
import GameElement from "./GameElement";
import { GameContext, GameState_Type } from "./GameContext";

/*
const GameElementsDefault: String[] = 
[  
"2", "3", "0", "1", "2",
"0", "0", "0", "3", "0",
"3", "1", "2", "0", "2",
"0", "3", "0", "0", "0",
"3", "1", "0", "2", "1"
];
*/

const GameElementsDefault: string[] = [
  "0",
  "3",
  "0",
  "1",
  "2",
  "0",
  "0",
  "0",
  "3",
  "0",
  "3",
  "1",
  "2",
  "0",
  "2",
  "0",
  "3",
  "0",
  "0",
  "0",
  "3",
  "1",
  "0",
  "2",
  "1",
];

const GameStateVal: GameState_Type = {
  LevelRestart: true,
  RegimOfSelectNumber: "@",
  FinishedValues: [],
  GameStep: 0, //--- номер текущей игры (нужен для сброса внутреннего состояния елементов игры)
};

function GameGrid(props: any) {
  const [GameElements, SetGameElements] = useState(GameElementsDefault); //--- инициализируем массив с данными
  const [GameState, SetGameState] = useState(GameStateVal); //--- инициализируем массив с данными

  //--- если стартуем новую игру, то
  if (GameState.LevelRestart) {
    //--- генерим уровень
    GameElementsDefault.forEach(
      (value: String, index: number, array: String[]) => {
        GameElementsDefault[index] = Math.floor(Math.random() * 5).toString();
      }
    );

    SetGameElements(GameElementsDefault);

    GameStateVal.LevelRestart = false;
    SetGameState(GameStateVal);
  }

  //--- проверка завершения уровня
  useEffect(() => {
    if (GameState.FinishedValues.length >= 25) {
      GameStateVal.LevelRestart = true;
      GameStateVal.GameStep = GameState.GameStep + 1;
      SetGameState(GameStateVal); //--- рестартуем уровень
    }
  }, [GameState]);

  return (
    <GameContext.Provider value={{ GameState, SetGameState, GameElements }}>
      <div className="game-grid">
        {GameElements.map((val, index, arr) => {
          return <GameElement value={val} key={index} />;
        })}
      </div>
    </GameContext.Provider>
  );
}

export default GameGrid;
