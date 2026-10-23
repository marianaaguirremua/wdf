// Geometry for the 3PL border-region map: Southern California, Arizona, Baja California and
// Sonora around the Mexicali–Yuma crossing. Points are [longitude, latitude] traced from public
// geographic references and simplified for an illustrative map; it is not to survey accuracy.

export type LonLat = readonly [number, number];

// Frame: 117.4°W–111.3°W, 30.9°N–34.1°N (San Diego to Phoenix), equirectangular with
// longitude scaled by cos(32.5°).
const WEST = -117.4;
const NORTH = 34.1;
const SCALE = 233.4; // px per degree of latitude
const LON_SCALE = SCALE * 0.843;

export const MAP_W = 1200;
export const MAP_H = 747;

export function project([lon, lat]: LonLat): [number, number] {
  return [
    Math.round((lon - WEST) * LON_SCALE * 10) / 10,
    Math.round((NORTH - lat) * SCALE * 10) / 10,
  ];
}

export function pathOf(points: readonly LonLat[], close = false): string {
  return (
    points.map((p, i) => `${i ? "L" : "M"}${project(p).join(" ")}`).join("") + (close ? "Z" : "")
  );
}

/** Pacific Ocean, west of the California and Baja California coast. */
export const PACIFIC: readonly LonLat[] = [
  [-120, 35],
  [-119.7, 34.42],
  [-119.23, 34.27],
  [-118.8, 34.03],
  [-118.5, 34.0],
  [-118.42, 33.85],
  [-118.4, 33.74],
  [-118.2, 33.74],
  [-118.0, 33.66],
  [-117.9, 33.6],
  [-117.7, 33.46],
  [-117.38, 33.2],
  [-117.25, 32.95],
  [-117.25, 32.8],
  [-117.17, 32.68],
  [-117.12, 32.53],
  [-117.06, 32.35],
  [-116.85, 32.0],
  [-116.62, 31.86],
  [-116.75, 31.75],
  [-116.65, 31.5],
  [-116.3, 30.95],
  [-116.0, 30.45],
  [-115.8, 30.0],
  [-115.5, 29.5],
  [-120, 29.5],
];

/** Gulf of California, between Baja California's east coast and Sonora. */
export const GULF: readonly LonLat[] = [
  [-114.8, 31.82],
  [-114.95, 31.55],
  [-114.88, 31.25],
  [-114.84, 31.02],
  [-114.7, 30.65],
  [-114.64, 30.35],
  [-114.55, 30.0],
  [-114.4, 29.5],
  [-112.3, 29.5],
  [-112.6, 29.9],
  [-112.85, 30.27],
  [-113.1, 30.7],
  [-113.55, 31.3],
  [-114.0, 31.5],
  [-114.5, 31.68],
];

/** Salton Sea: center, semi-axes in map px, tilt in degrees. */
export const SALTON_SEA = { center: [-115.83, 33.3] as LonLat, rx: 44, ry: 17, tilt: 38 };

/** U.S.–Mexico border: land boundary to the Colorado River, the river, then the Sonora line. */
export const BORDER: readonly LonLat[] = [
  [-117.12, 32.53],
  [-114.72, 32.72],
  [-114.78, 32.6],
  [-114.81, 32.49],
  [-111.07, 31.33],
  [-110.5, 31.33],
];

/** California–Arizona line (Colorado River) and the Baja California–Sonora line (delta). */
export const STATE_LINES: readonly (readonly LonLat[])[] = [
  [
    [-114.72, 32.72],
    [-114.6, 33.0],
    [-114.52, 33.4],
    [-114.4, 33.9],
    [-114.15, 34.3],
    [-114.4, 34.6],
  ],
  [
    [-114.81, 32.49],
    [-114.85, 32.2],
    [-114.8, 31.82],
  ],
];

export const PLACES = {
  mexicali: [-115.45, 32.63],
  yuma: [-114.62, 32.69],
  sanLuis: [-114.77, 32.46],
  sanDiego: [-117.08, 32.76],
  tijuana: [-116.98, 32.5],
  ensenada: [-116.6, 31.87],
  phoenix: [-112.07, 33.45],
  longBeach: [-118.2, 33.77],
  sonoyta: [-112.85, 31.86],
  gilaBend: [-112.72, 32.95],
} as const satisfies Record<string, LonLat>;
