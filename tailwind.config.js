/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: [
      './hugo_stats.json',
      './layouts/**/*.html',
      './content/**/*.md',
    ],
    // Parse hugo_stats.json to extract class names from rendered HTML
    transform: {
      json: (content) => {
        const { classes, ids } = JSON.parse(content).htmlElements ?? {}
        return [...(classes || []), ...(ids || [])].join(' ')
      },
    },
  },
  // Disable Tailwind's preflight reset — the site already has its own reset
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#E63012',
          dark: '#B8240D',
          light: '#FF4A2C',
        },
        graphite: '#1A1A1A',
        steel: '#2C2C2C',
        slate: '#444444',
        mid: '#666666',
        silver: '#AAAAAA',
        mist: '#F4F4F2',
        border: '#E0E0DD',
      },
      fontFamily: {
        display: ['Barlow Condensed', 'Arial Narrow', 'sans-serif'],
        body: ['Barlow', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
