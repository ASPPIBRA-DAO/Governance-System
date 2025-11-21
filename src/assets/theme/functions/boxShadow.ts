/**
 * =========================================================
 * Dashboard 2 PRO React TS - v1.0.1
 * =========================================================
 *
 * Updated in 2025 by ASPPIBRA-DAO
 * Original Copyright 2022 Creative Tim
 *
 * =========================================================
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */

// Material Dashboard 2 PRO React TS Helper Functions
import rgba from "assets/theme/functions/rgba";
import pxToRem from "assets/theme/functions/pxToRem";

function boxShadow(
  offset: [number, number] = [0, 0],
  radius: [number, number] = [0, 0],
  color: string,
  opacity: number,
  inset = ""
): string {
  const [x, y] = offset;
  const [blur, spread] = radius;

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(
    color,
    opacity
  )}`;
}

export default boxShadow;
