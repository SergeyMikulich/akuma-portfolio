export type WorkPlatform = 'tiktok' | 'youtube-shorts' | 'youtube';

export type WorkItem = {
  id: string;
  platform: WorkPlatform;
  url: string;
  posterUrl?: string;
  title: string;
  description: string;
  tag: string;
  accent: string;
  highlight: string;
};

export const works: WorkItem[] = [
  {
    id: 'work-1',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@betboomesports/video/7535409267453496583?_r=1&_t=ZS-98VJr5sJiMf',
    title: 'Boombl4 interview',
    description: 'Short-form interview created for an esports audience.',
    tag: 'Interview',
    accent: 'work-accent-red',
    highlight: 'Fast questions, personality-led answers and social-first pacing.',
    posterUrl: '/posters/poster-1.png',
  },
  {
    id: 'work-2',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@betboomesports/video/7252783591208357122?_r=1&_t=ZS-98VK47lauoe',
    title: 'BetBoom glasses on everyone',
    description: 'Cinematic vertical teaser designed for premiere day engagement.',
    tag: 'Launch teaser',
    accent: 'work-accent-gold',
    highlight: 'Built to feel premium, tense and instantly recognizable.',
    posterUrl: '/posters/poster-2.png',
  },
  {
    id: 'work-3',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@betboomesports/video/7452424982178712840?_r=1&_t=ZS-98VJvKXqYWS',
    title: 'Save- is building his perfect hero.',
    description: 'Community-first edit with punchy pacing and social proof overlays.',
    tag: 'Community content',
    accent: 'work-accent-violet',
    highlight: 'Optimized for watch time and rewatchable moments.',
    posterUrl: '/posters/poster-3.png',
  },
  {
    id: 'work-4',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@betboomesports/video/7345104298608545031',
    title: 'Two legends of Dota 2',
    description: 'Two legends of Dota 2 from China are in our TikTok!',
    tag: 'Community content',
    accent: 'work-accent-violet',
    highlight: 'Optimized for watch time and rewatchable moments.',
    posterUrl: '/posters/poster-4.png',
  },
];

export const interviewWorks: WorkItem[] = [
  {
    id: 'interview-1',
    platform: 'youtube',
    url: 'https://www.youtube-shorts.com/watch?v=OXT50t3ckrc&t;=70s',
    title: 'NS on Dota, Twitch View-Botting, the Esports Crisis, and Sasavot | OFFSTAGE Podcast',
    description: '',
    tag: 'Interview',
    accent: 'work-accent-red',
    highlight: '',
    posterUrl: '/posters/poster-interview-ns.png',
  },
  {
    id: 'interview-2',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=VNIJvX8ax_s',
    title: 'Malady on Watson: “When we get home — I hate him” | OFFSTAGE',
    description: '',
    tag: 'Interview',
    accent: 'work-accent-red',
    highlight: 'Fast questions, personality-led answers and social-first pacing.',
    posterUrl: '/posters/interview-2.png',
  },
  {
    id: 'interview-3',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=lyjtNnJ3jFU',
    title: 'Solo: “I don’t get any excitement from watching Dota 2” ┃ OFFSTAGE Podcast',
    description: '',
    tag: 'Interview',
    accent: 'work-accent-red',
    highlight: 'Fast questions, personality-led answers and social-first pacing.',
    posterUrl: '/posters/interview-3.png',
  },
  {
    id: 'interview-4',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=DwvjU9t8MDk',
    title: 'Stray228: “I Can’t Imagine Life Without Streaming” | OFFSTAGE — 40 Questions',
    description: '',
    tag: 'Interview',
    accent: 'work-accent-red',
    highlight: 'Fast questions, personality-led answers and social-first pacing.',
    posterUrl: '/posters/poster-interview-stray.png',
  },
];
