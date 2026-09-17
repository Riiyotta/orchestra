const CDN = 'https://framerusercontent.com/images/'

/* Titles and cover images are the site's own. Article bodies are NOT
   reproduced here — each post carries a short stub. Replace `body` with your
   own prose, or load it from an export. */
export const POSTS = [
  {
    slug: 'how-biotechs-can-manage-cros-with-agents',
    title: 'How biotechs can manage CROs with agents',
    excerpt:
      'For two decades, biopharma software organized what scientists already knew. Agents change what the software can do on its own.',
    image: `${CDN}aBVvXpB0r2rfq6xa8aVntZF33c.png?scale-down-to=1024`,
    featured: true,
    body: [],
  },
  {
    slug: 'agents-for-r-d-science',
    title: 'Agents for R&D: Science',
    excerpt: '',
    image: `${CDN}77xOndwSYi2QRMgwkkstALd0Jhw.png?scale-down-to=1024`,
    body: [],
  },
  {
    slug: 'agents-for-r-d-strategy',
    title: 'Agents for R&D: Strategy',
    excerpt: '',
    image: `${CDN}xNahpPLKElwjD4oOGFyjLTXIgcc.png?scale-down-to=1024`,
    body: [],
  },
  {
    slug: 'from-paper-to-cloud-to-agents',
    title: 'From paper to cloud to agents: the digital transformation of R&D',
    excerpt: '',
    image: `${CDN}xqSsX0CC45mgPMZl0wpS1baL1Io.png?scale-down-to=1024`,
    body: [],
  },
  {
    slug: 'ashoka-interview-biotechtv',
    title: "Orchestra's CEO interview with BiotechTV",
    excerpt: '',
    image: `${CDN}3Bedx9DqSty0ZnD3Yjnag6ylHPU.png?scale-down-to=1024`,
    body: [],
  },
  {
    slug: 'full-interview-janelle-muranaka',
    title:
      'How operations can unlock inflection points: a conversation with Janelle Muranaka',
    excerpt: '',
    image: `${CDN}thtWZQC4iPelRYAgPbauRlT5Wtk.png?scale-down-to=1024`,
    body: [],
  },
  {
    slug: 'operational-framework-janelle-muranaka',
    title: 'Even a two person biotech startup needs an operational framework',
    excerpt: '',
    image: `${CDN}thtWZQC4iPelRYAgPbauRlT5Wtk.png?scale-down-to=1024`,
    body: [],
  },
]

export const getPost = (slug) => POSTS.find((p) => p.slug === slug)
