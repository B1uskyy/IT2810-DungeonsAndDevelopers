import { useState, useEffect, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomButton from '../../components/CustomButton/CustomButton.tsx';
import MainPageLayout from '../../components/Layouts/MainPageLayout.tsx';
import { useMutation, useLazyQuery } from '@apollo/client';
import { AuthContext } from '../../context/AuthContext.tsx';
import { CREATE_USER, LOGIN_USER, CHECK_USERNAME } from '../../../../backend/src/graphql/queries';
import { useToast } from '../../hooks/useToast.ts';

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
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [direction, setDirection] = useState(1);
  const [registerUsername, setRegisterUsername] = useState('');
  const [logInUsername, setLogInUsername] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [shakeInput, setShakeInput] = useState(false);
  const { showToast } = useToast();

  // Change quote every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex === quotes.length - 1 ? 0 : prevIndex + 1));
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // GraphQL mutations
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      const { token, user } = data.createUser;
      login({ token, userId: user.id, userName: user.userName });
      window.location.href = '/project2/home';
    },
    onError: () => {
      setShakeInput(true);
    },
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const { token, user } = data.loginUser;
      login({ token, userId: user.id, userName: user.userName });
      window.location.href = '/project2/home';
    },
    onError: () => {
      setShakeInput(true);
      showToast({
        message: `No user found with username: ${logInUsername}`,
        type: 'error',
        duration: 3000,
      });
    },
  });

  const [checkUsername] = useLazyQuery(CHECK_USERNAME, {
    onCompleted: (data) => setIsUsernameAvailable(data.checkUsername),
  });

  // Toggle between login and register form
  const toggleForm = () => {
    setDirection(isLogin ? 1 : -1);
    setIsLogin(!isLogin);
    setShakeInput(false);
    setIsUsernameAvailable(null);
  };

  // Check if username is available
  const handleRegisterUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRegisterUsername(value);
    setShakeInput(false);
    if (value) {
      await checkUsername({ variables: { userName: value } });
    }
  };

  // Register user if username is available
  const handleRegister = async () => {
    if (!registerUsername) {
      setShakeInput(true);
      return;
    }
    if (isUsernameAvailable) {
      try {
        await createUser({ variables: { userName: registerUsername } });
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      setShakeInput(true);
      showToast({
        message: `Username ${registerUsername} is already taken`,
        type: 'error',
        duration: 3000,
      });
    }
  };

  // Reset username availability when user starts typing
  useEffect(() => {
    if (!registerUsername) {
      setIsUsernameAvailable(null);
    }
  }, [registerUsername]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogInUsername(e.target.value);
    setShakeInput(false);
  };

  // Log in user
  const handleLogin = async () => {
    if (!logInUsername) {
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      return;
    }

    try {
      await loginUser({ variables: { userName: logInUsername } });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <MainPageLayout isLoginTransition={true}>
      <main className="relative flex items-center justify-center h-screen overflow-hidden z-0 before:absolute before:inset-0 before:bg-login before:bg-cover before:bg-center before:animate-background-zoom before:z-0">
        <div className="black-overlay"></div>
        <section className="w-[90%] h-3/4 relative z-10 flex flex-col items-center justify-center">
          <header className="absolute top-0 w-full">
            <h1
              className={`sub-header xl:text-2xl text-center transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
            >
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
                    <h2 className="sub-header mb-5">Log in to continue your adventure</h2>
                    <div className="flex flex-col items-center gap-5">
                      <input
                        id="log-in-input"
                        className={`text w-60 xs:w-72 p-2 border-2 border-gray-500 rounded bg-transparent text-center focus:outline-none 
                          ${shakeInput ? 'animate-shake border-red-500' : 'focus:border-white'}`}
                        placeholder="Username"
                        value={logInUsername}
                        onChange={handleLoginChange}
                        onAnimationEnd={() => setShakeInput(false)}
                        maxLength={40}
                      />
                      <CustomButton text="Log in" onClick={handleLogin} />
                    </div>
                    <div className="text">
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
                    <h2 className="sub-header mb-10">Or register to start a new adventure</h2>
                    <input
                      id="register-input"
                      value={registerUsername}
                      onChange={handleRegisterUsernameChange}
                      onFocus={() => setShakeInput(false)}
                      maxLength={40}
                      className={`text w-60 xs:w-72 p-2 border-2 rounded bg-transparent text-center focus:outline-none ${
                        shakeInput
                          ? 'animate-shake border-red-500'
                          : isUsernameAvailable === false
                            ? 'border-red-500'
                            : isUsernameAvailable === true
                              ? 'border-green-500'
                              : 'border-gray-500 focus:border-white'
                      }`}
                      placeholder="Username"
                    />
                    <p
                      className={`absolute left-1/2 transform -translate-x-1/2 translate-y-12 text px-2 rounded inline-flex whitespace-nowrap
                        ${
                          isUsernameAvailable === false
                            ? 'bg-red-500'
                            : isUsernameAvailable === true
                              ? 'bg-green-500'
                              : 'bg-transparent'
                        }`}
                    >
                      {isUsernameAvailable === false
                        ? 'Username is taken'
                        : isUsernameAvailable === true
                          ? 'Username is available'
                          : ''}
                    </p>
                    <CustomButton text="Register" onClick={handleRegister} />
                    <div className="text">
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
