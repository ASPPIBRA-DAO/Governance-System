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
  The rgba() function helps you to create a rgba color code, it uses the hexToRgb() function
  to convert the hex code into rgb for using it inside the rgba color format.
 */

// Material Dashboard 2 PRO React TS Helper Functions
import hexToRgb from "assets/theme/functions/hexToRgb";

function rgba(color: string, opacity: number): string {
  return `rgba(${hexToRgb(color)}, ${opacity})`;
}

export default rgba;
