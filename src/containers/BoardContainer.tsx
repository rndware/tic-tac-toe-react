import React from "react";
import { Mode } from "../types/game";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Board from "../components/board";
import { getGameMode, playMove } from "../reducers/GameSlice";
import {
  getGridData,
  getHighlighted,
  getBoardHighlightColor,
} from "../reducers/BoardSlice";

const BoardContainer = () => {
  const dispatch = useAppDispatch();

  return (
    <Board
      disabled={useAppSelector(getGameMode) === Mode.Ended}
      gridData={useAppSelector(getGridData)}
      highlightColor={useAppSelector(getBoardHighlightColor)}
      highlighted={useAppSelector(getHighlighted)}
      onClick={(_, index) => dispatch(playMove(index))}
    />
  );
};

export default BoardContainer;
