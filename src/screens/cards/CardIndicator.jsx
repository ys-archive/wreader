import React from "react";
import {
  renderIndicatorCategory,
  renderIndicatorChapter,
} from "./CardIndicator.render";

const CardIndicator = props => (
  <>
    {/* {!isSwiping && IndicatorJSX} */}
    {props.depth === 0
      ? renderIndicatorCategory(props)
      : renderIndicatorChapter(props)}
    {props.children}
  </>
);

export default CardIndicator;
