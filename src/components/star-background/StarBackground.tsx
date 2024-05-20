import React from "react";
import { range } from "lodash";
import classNames from "classnames";

import styles from "./StarBackground.module.scss";

/**
 * React wrapper for: https://codepen.io/alexitaylor/pen/RgxJwg
 */

const renderParticles = () =>
  range(1, 4).map((i: number) => (
    <div
      key={`particle-${i}`}
      className={classNames([styles.particle, styles[`particle-${i}`]])}
    ></div>
  ));

const StarBackground = () => (
  <>
    <div className={styles["page-bg"]}></div>
    <div className={styles["animation-wrapper"]}>{renderParticles()}</div>
  </>
);

export default React.memo(StarBackground);
