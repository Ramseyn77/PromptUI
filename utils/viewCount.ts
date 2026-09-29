const slugScore = (slug: string) => slug.split('').reduce((total, char) => total + char.charCodeAt(0), 0);

/** Placeholder view count derived from the slug, stable across renders until real analytics exist. */
export function viewCount(slug: string) {
  const score = slugScore(slug);
  return `${(score % 8) + 2}.${score % 9}k vues`;
}

/** Stable hue per slug, used for the card avatar gradient. */
export function slugHue(slug: string) {
  return slugScore(slug) % 360;
}
