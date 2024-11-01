/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '480px',
      'md': '640px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '1280px',
      '3xl': '1440px',
      '4xl': '1600px',
      '5xl': '1920px',
      '6xl': '2560px',
    },
    extend: {
      fontSize: {
        'xs': '0.75vw',   // Extra small text, smallest
        'sm': '0.875vw',  // Small text
        'md': '1vw',    // Base font size
        'lg': '1.25vw',   // Large text
        'xl': '1.5vw',    // Extra large text
        '2xl': '2vw',     // 2x Extra large text
        '3xl': '2.5vw',   // 3x Extra large text
        '4xl': '3.75vw',     // 4x Extra large text
        '5xl': '5vw',
        '6xl': '7vw', // 5x Extra large text, biggest
      },
      colors: {
        customRed: '#DB3232',
        customGray: '#1E1E1E',
      },
      backgroundImage: {
        login: 'url(\'/src/assets/images/background/login_bg.jpeg\')',
        dungeon: 'url(\'/src/assets/images/background/dungeon_bg.png\')',
        equipments: 'url(\'/src/assets/images/background/equipment_bg.jpeg\')',
        myCharacter: 'url(\'/src/assets/images/background/my_character_bg.jpg\')',
        monsters: 'url(\'/src/assets/images/background/monsters_bg.png\')',
        home: 'url(\'/src/assets/images/background/home_bg.jpeg\')',
        subPage: 'url(\'/src/assets/images/background/sub_page_bg3.png\')',
      },
      keyframes: {
        underlineExpand: {
          '0%': { width: '0', left: '50%' },
          '50%': { width: '100%', left: '0%' },
        },
        zoom: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        'underline-expand': 'underlineExpand 0.3s ease-out forwards',
        'background-zoom': 'zoom 120s linear infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      flexGrow: {
        '2': 2,
        '3': 3,
      },
    },
  },
  plugins: [],
};
