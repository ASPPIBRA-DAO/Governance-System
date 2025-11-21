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
  The linearGradient() function helps you to create a linear gradient color background
 */

function linearGradient(color: string, colorState: string, angle: number = 195): string {
  return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
}

export default linearGradient;
