/**
 * Royalty-free stock photography (Unsplash) used as real, licensed
 * placeholder imagery until the property's own photography is available.
 *
 * These are generic, atmospheric stock photos (a mountain valley, a hotel
 * bedroom, a spa treatment room, etc.) — NOT photos of JW Marriott
 * Mussoorie Walnut Grove itself. They must not be captioned or presented
 * as depicting a specific real place (see the "Nature" gallery category in
 * lib/gallery.ts, which names actual local landmarks and deliberately has
 * no stock photo assigned, for exactly that reason).
 *
 * Unsplash License (https://unsplash.com/license): free for commercial use,
 * no attribution required.
 */
function unsplash(photoId: string, width = 1600): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

export const STOCK_PHOTOS = {
  mountainValley: unsplash("1774182709860-41680e053dc1", 1920),
  mistyForestLodge: unsplash("1668854815845-005a6bfa3d08", 1920),
  blueHourPeak: unsplash("1785246336106-dc3c3a3494ad", 1920),

  roomDeluxe: unsplash("1778205015308-1ed324aea202"),
  roomPremier: unsplash("1782022536202-7adbb78756ff"),
  roomLuxurySuite: unsplash("1592229506151-845940174bb0"),
  roomPresidentialSuite: unsplash("1618773928121-c32242e63f39"),

  spaTreatmentRoom: unsplash("1787651343496-35b3666dd7d2"),
  spaCouplesSuite: unsplash("1707355274813-633939fbc8e0"),
  spaIndoorPool: unsplash("1771947550396-1fb9b5adb698"),

  diningJwCafe: unsplash("1596252890311-caa6a004a6ee"),
  diningTroutHouse: unsplash("1782367807681-2289f10c7309"),
  diningTeppan: unsplash("1681270496598-13c5365730c8"),
  diningWisteriaDeck: unsplash("1720673749084-0a51bdf07216"),
  diningPerch: unsplash("1657639753220-8d59b05958d1"),

  weddingBallroom: unsplash("1776671069226-24e6d422a61b"),
  weddingOutdoorLawn: unsplash("1785744530706-71fd26baac6a"),
  weddingBanquetHall: unsplash("1744891471118-f74c0453cd21"),

  facilityFitnessCentre: unsplash("1662386392805-573808794a21"),
  facilityKidsClub: unsplash("1630139026569-0cdfbd9cee4e"),
  facilityBowlingAlley: unsplash("1612244314937-c704fd3b2810"),
  facilityAmphitheatre: unsplash("1770877770609-90c0d3890644"),
  facilityPuttingGreen: unsplash("1592937238247-cd0090e02f65"),
  facilityTrekking: unsplash("1621531518034-94ecf4778186"),
} as const;
