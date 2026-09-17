// Measured from https://orchestra.bio/about.
//
// The original's "Our team" block is NOT four people. It is two members, each
// rendered as a 2-cell pair inside a 4-column / 10px-gap grid:
//
//   [ photo 302x340 ][ details panel 302x340 ]
//
// The details panel is a flat ink (#032126) card, not a photo. The image that
// appears twice in the DOM (61oTzZ...) is that panel's background texture, which
// is why two of the four image URLs are identical.
export const PANEL_TEXTURE =
  'https://framerusercontent.com/images/61oTzZyLXM0RSPyWrWo4jH27jd8.png?width=596&height=672'

export const TEAM = [
  {
    name: 'Ashoka Rajendra',
    role: 'CEO, Orchestra',
    photo:
      'https://framerusercontent.com/images/m7RkQVfp5BYrXXqVq469gc4GcKA.png?width=512&height=512',
    linkedin: 'https://www.linkedin.com/in/ashoka-rajendra-4b1aa41b/',
  },
  {
    name: 'Andy Xu',
    role: 'CTO, Orchestra',
    photo:
      'https://framerusercontent.com/images/lwofzPsVhHqtttqOyM3EGYqG5vA.png?scale-down-to=1024&width=1024&height=1034',
    linkedin: 'https://www.linkedin.com/in/andyxu1/',
  },
]

export const TEAM_GROUP_PHOTO =
  'https://framerusercontent.com/images/ngBk4wEboHKvYomWAvpbpe2kdoc.jpeg?scale-down-to=2048'

// Both the About CTA and the footer "Careers" link go to this external Ashby
// board. orchestra.bio has no /careers, /jobs or /company/careers route — all
// three return 404. The original marks both links target="_blank".
export const JOBS_URL = 'https://jobs.ashbyhq.com/orchestra-bio'
