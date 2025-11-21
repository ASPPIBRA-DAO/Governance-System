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
  The hexToRgb() function helps you to change the hex color code to rgb
  using chroma-js library.
 */

// chroma-js is a library for all kinds of color conversions and color scales.
import chroma from "chroma-js";

function hexToRgb(color: string): string {
  return chroma(color).rgb().join(", ");
}

export default hexToRgb;
