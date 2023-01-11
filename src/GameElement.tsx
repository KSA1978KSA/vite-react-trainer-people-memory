import react, { useState, useCallback, useRef } from "react";
import "./css/GameElement.css";
import { GameContext, GameState_Type } from "./GameContext";

type GameElementProps = {
  value: string;
};

function GameElement(props: GameElementProps) {
  const context = react.useContext(GameContext);

  const GameElementRef = useRef({
    ClickState: false,
    GameStep: 0,
    context: context,
  });

  GameElementRef.current.context = context;

  const [ReRender, SetReRender] = useState(false);
  //const [GameStep, SetGameStep] = useState(0);
  //const [ClickState, SetClickState] = useState(false);

  if (!!context.GameState) {
    if (context.GameState?.GameStep != GameElementRef.current.GameStep) {
      //SetClickState(false)
      GameElementRef.current.ClickState = false;
      GameElementRef.current.GameStep = context.GameState?.GameStep;
    }
  }

  //---- если идет рестарт уровня, то нужно сбросить внутренние данные
  if (context.GameState?.LevelRestart) {
    //SetClickState(false);
    GameElementRef.current.ClickState = false;
  }

  //----------------------------------------------
  // Основная логика компоненты
  //----------------------------------------------
  const GameElementLogic = () => {
    //
    //
    //
    //---------------------------------
    //--- Процедура проверки параметров
    //---------------------------------
    const CheckParams = (context: any, value: string) => {
      //--- считаем количество всех элементов в текущем режиме
      const CurrentGameElements = context.GameElements?.filter(
        (value: String, index: number, array: String[]) => {
          if (
            value ==
            (context.GameState?.RegimOfSelectNumber == "@"
              ? value
              : context.GameState?.RegimOfSelectNumber)
          )
            return true;
        }
      );
      const SelectedCurrentGameElements =
        context.GameState?.FinishedValues.filter(
          (value: String, index: number, array: String[]) => {
            if (
              value ==
              (context.GameState?.RegimOfSelectNumber == "@"
                ? value
                : context.GameState?.RegimOfSelectNumber)
            )
              return true;
          }
        );

      if (
        !!context.SetGameState &&
        !!context.GameState &&
        !!CurrentGameElements &&
        !!SelectedCurrentGameElements
      ) {
        //--- если
        if (
          SelectedCurrentGameElements.length + 1 <
          CurrentGameElements.length
        ) {
          let GameStateLocal: GameState_Type = {
            LevelRestart: false,
            RegimOfSelectNumber: value, //--- продолжаем текущий режим
            FinishedValues: [...context.GameState.FinishedValues, value],
            GameStep: context.GameState.GameStep,
          };
          context.SetGameState(GameStateLocal);
        } else {
          let GameStateLocal: GameState_Type = {
            LevelRestart: false,
            RegimOfSelectNumber: "@", //--- сбрасываем
            FinishedValues: [...context.GameState.FinishedValues, value],
            GameStep: context.GameState.GameStep,
          };
          context.SetGameState(GameStateLocal);
        }
      }
    };
    //
    //
    //

    if (GameElementRef.current.ClickState) return; //--- если уже был активирован ранее елемент, то логику не выполняем

    const context = GameElementRef.current.context;

    //--- если пока еще не активировали никакую серию, то ставим активной выбранную, кроме 0
    if (context.GameState?.RegimOfSelectNumber == "@") {
      GameElementRef.current.ClickState = true;
      SetReRender((val) => {
        return !val;
      });

      if (!!context.SetGameState) {
        let GameStateLocal: GameState_Type = {
          LevelRestart: false,
          RegimOfSelectNumber: props.value,
          FinishedValues: [...context.GameState.FinishedValues, props.value],
          GameStep: context.GameState.GameStep,
        };
        context.SetGameState(GameStateLocal);
      }

      CheckParams(context, props.value);

      //SetClickState(true);
    } else {
      //--- если нажали на элемент с value таким же, которые сейчас выбираются, то
      if (
        context.GameState?.RegimOfSelectNumber != "@" &&
        context.GameState?.RegimOfSelectNumber == props.value
      ) {
        GameElementRef.current.ClickState = true;
        SetReRender((val) => {
          return !val;
        });

        CheckParams(context, props.value);

        //SetClickState(true);
      }
    }
  };
  //----------------------------------------------

  const GameElementLogicCallBack = useCallback(GameElementLogic, [
    GameElementRef.current.ClickState,
  ]);

  return (
    <GameElementRenderMemo
      value={props.value}
      ClickState={GameElementRef.current.ClickState}
      callBackFunction={GameElementLogicCallBack}
    />
  );
}

type GameElementRenderProps = {
  value: string;
  ClickState: boolean;
  callBackFunction: () => void;
};

const GameElementRenderMemo = react.memo(GameElementRender); //--- мемоизировали

function GameElementRender(props: GameElementRenderProps) {
  let Result = null;

  if (props.ClickState) {
    Result = (
      <div className="game-element-clicked" onClick={props.callBackFunction}>
        {props.value}
      </div>
    );
  } else {
    Result = (
      <div
        className="game-element-not-clicked"
        onClick={props.callBackFunction}
      >
        {props.value}
      </div>
    );
  }

  console.log("Перерисовка элемента:" + props.value);

  return Result;
}

export default GameElement;
