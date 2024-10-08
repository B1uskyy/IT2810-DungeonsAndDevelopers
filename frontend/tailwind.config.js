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
      colors: {
        customRed: '#DB3232',
        customGray: '#1E1E1E',
      },
      backgroundImage: {
        login: 'url(\'/src/assets/images/background/login_bg.jpeg\')',
        dungeon: 'url(\'/src/assets/images/background/dungeon_bg.jpeg\')',
        equipments: 'url(\'/src/assets/images/background/equipment_bg.jpeg\')',
        myCharacter: 'url(\'/src/assets/images/background/my_character_bg.jpg\')',
        monsters: 'url(\'/src/assets/images/background/monsters_bg.jpeg\')',
        home: 'url(\'/src/assets/images/background/home_bg.jpeg\')',
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
      },
      animation: {
        'underline-expand': 'underlineExpand 0.3s ease-out forwards',
        'background-zoom': 'zoom 120s linear infinite',
      },
    },
  },
  plugins: [],
};
