import React from "react";

type GameState_Type = {
  LevelRestart: boolean;
  RegimOfSelectNumber: string;
  FinishedValues: string[];
  GameStep: number;
};

type Context_Type = {
  GameState: GameState_Type | null;
  SetGameState: React.Dispatch<React.SetStateAction<GameState_Type>> | null;
  GameElements: String[] | null;
} | null;

const Context_Val: Context_Type = {
  GameState: null,
  SetGameState: null,
  GameElements: null,
};

const GameContext = React.createContext(Context_Val);

export { GameContext, type GameState_Type };
