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

/**
  The pxToRem() function helps you to convert a px unit into a rem unit, 
 */

function pxToRem(number: number, baseNumber: number = 16): string {
  return `${number / baseNumber}rem`;
}

export default pxToRem;
