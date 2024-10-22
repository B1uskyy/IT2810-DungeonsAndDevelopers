import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomButton from '../../components/CustomButton/CustomButton.tsx';
import MainPageLayout from '../../components/Layouts/MainPageLayout.tsx';

const quotes = [
  'In the heart of every adventure, lies the soul of a hero.',
  'Roll the dice and forge your destiny.',
  'Fate may guide us, but courage decides our path.',
  'Imagination is the only limit to the worlds we create.',
  'A dungeon is not just a place of danger, but a crucible of heroes.',
  'It’s not the sword that makes the hero, but the heart behind it.',
  'In the darkest moments, even a flicker of light can lead to victory.',
  'Every choice is a roll of the dice, every consequence, a new chapter.',
  'The adventure never ends, as long as there’s a story to tell.',
  'Cunning, bravery, and the right spell can turn the tide of any battle.',
];

const formVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300, // Slide from left if next (positive direction), right if previous
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300, // Exit to the left if switching forward
    opacity: 0,
  }),
};

export default function LoginPage() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex === quotes.length - 1 ? 0 : prevIndex + 1));
        setFade(true);
      }, 500);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleForm = () => {
    setDirection(isLogin ? 1 : -1);
    setIsLogin(!isLogin);
  };

  return (
    <MainPageLayout isLoginTransition={true}>
      <main
        className="relative flex items-center justify-center h-screen overflow-hidden z-0 before:absolute before:inset-0 before:bg-login before:bg-cover before:bg-center before:animate-background-zoom  before:z-0">
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        <section className="w-full h-3/4 relative z-10 flex flex-col items-center justify-center">
          <header className="absolute top-0">
            <h1 className={`text-4xl text-white transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
              {quotes[currentQuoteIndex]}
            </h1>
          </header>

          <section className="flex flex-col items-center">
            <AnimatePresence mode={'wait'} custom={direction}>
              <motion.div
                key={isLogin ? 'login' : 'register'}
                custom={direction}
                variants={formVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.15 }}
                className="flex flex-col items-center gap-10"
              >
                {isLogin ? (
                  <>
                    <h2 className="text-3xl text-white mb-5">Log in to continue your adventure</h2>
                    <div className="flex flex-col items-center gap-5">
                      <input
                        id="log-in-input"
                        className="text-2xl w-96 p-2 border-2 rounded bg-transparent text-center"
                        placeholder="Username"
                      ></input>
                      <CustomButton text="Log in" linkTo="/project2/home" />
                    </div>
                    <div className="text-white text-2xl">
                      Don't have an account?{' '}
                      <button
                        className="underline transition-all hover:text-gray-300 outline-none"
                        onClick={toggleForm}
                      >
                        Register
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl text-white mb-5">Or register to start a new adventure</h2>
                    <input
                      id="register-input"
                      className="text-2xl w-96 p-2 border-2 rounded bg-transparent text-center"
                      placeholder="Username"
                    ></input>
                    <button className="relative group text-3xl pb-1">
                      Register
                      <span
                        className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    </button>
                    <div className="text-white text-2xl">
                      Already have an account?{' '}
                      <button
                        className="underline transition-all hover:text-gray-300 outline-none"
                        onClick={toggleForm}
                      >
                        Log in
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </section>
        </section>
      </main>
    </MainPageLayout>
  );
}