const CDN = 'https://framerusercontent.com/images/'

export const PRODUCTS = {
  'unified-planning': {
    eyebrow: 'Unified planning',
    title: 'Align your organization from bench to boardroom',
    subhead:
      'Connect scientific goals, financial models, and execution in one operating system.',
    features: [
      {
        heading: 'Prepare for board meetings in days, not weeks',
        copy: 'Create dashboards in minutes to dynamically track program milestones alongside spend.',
        image: `${CDN}nvJEWiKQAkx90VNVmqbVvazig.png?scale-down-to=1024`,
      },
      {
        heading: 'Forecast spend and runway confidently',
        copy: 'Analyze estimated vs. actual spend across R&D, G&A, Ops, and Personnel budgets.',
        image: `${CDN}d9Fzc8L7aK9s88DXb3jyAfOpCQ4.png?scale-down-to=1024`,
      },
      {
        heading: 'Translate strategy into concrete roadmaps',
        copy: 'Align your organization around a centralized plan of record with clear dependencies.',
        image: `${CDN}P6PXKONxk9frltPxCcwIcaJAwM.png?scale-down-to=1024`,
      },
    ],
  },

  'intelligent-operations': {
    eyebrow: 'Intelligent operations',
    title: 'Automatically track progress, risks, and outcomes',
    subhead:
      'Turn day-to-day execution into clear progress and early risk visibility.',
    features: [
      {
        heading: 'Get to ground truth with AI powered progress and risk tracking',
        copy: 'Interpret and analyze meetings, documents, and reports to understand the true state of your programs.',
        image: `${CDN}SJEMvLYZrEo8VWdAEIa92fmDNmw.png?scale-down-to=1024`,
      },
      {
        heading: 'Track execution against the plan',
        copy: 'Understand when, where, and why program timelines are delayed or at-risk.',
        image: `${CDN}6oPOLRrqLs4xjatFFnhm56QK3E.png?scale-down-to=1024`,
      },
      {
        heading: 'Spot delays early before deadlines slip',
        copy: 'Signals throughout the timeline assess progress and surface risk early, so any adjustments or corrections can be made in time.',
        image: `${CDN}pkUjfEhBeLV1xzrDyGD4O5yc3po.png?scale-down-to=1024`,
      },
    ],
  },

  'decision-support': {
    eyebrow: 'Decision support',
    title: 'Plans change. Plan for that too.',
    subhead:
      "Make decisions confidently with Orchestra's scenario builder and AI-powered knowledge base.",
    features: [
      {
        heading: 'Assess scenarios combinatorially across programs and budgets',
        copy: 'Fine-tune the optimal path by varying budgets and development approaches.',
        image: `${CDN}mBCwMoqb2R9Kqn6sHFKBkv00Q.png?scale-down-to=1024`,
      },
      {
        heading: 'Evaluate scenarios in minutes, not weeks',
        copy: 'Model program delays, budget cuts, or accelerated timelines with a few clicks.',
        image: `${CDN}UIUQExc4Exjr67NWKny2vM3psDs.png?scale-down-to=1024`,
      },
      {
        heading: 'Leverage institutional knowledge to drive decisions',
        copy: "Ask questions and get actionable summaries rooted in your organization's historical context.",
        image: `${CDN}ucXxjIlHacPG0pFKMlzTCC1fX3c.png?scale-down-to=1024`,
      },
    ],
  },
}

export const PRODUCT_SLUGS = Object.keys(PRODUCTS)
