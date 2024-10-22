import { useRef } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

interface CounterProps {
  value: number;
  onChange: (newValue: number) => void;
}

export default function Counter({ value, onChange }: CounterProps) {
  const changeTimer = useRef<NodeJS.Timeout | null>(null);
  const rate = 100;

  const clearTimer = () => {
    if (changeTimer.current) {
      clearInterval(changeTimer.current);
      changeTimer.current = null;
    }
  };

  const startIncrement = () => {
    clearTimer();
    const startTime = Date.now();

    changeTimer.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const incrementValue = Math.floor(elapsedTime / rate);
      let newValue = value + incrementValue;

      if (newValue > 100) {
        newValue = newValue % 101;
      }

      onChange(newValue);
    }, 100);
  };

  const startDecrement = () => {
    clearTimer();
    const startTime = Date.now();

    changeTimer.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const decrementValue = Math.floor(elapsedTime / rate);
      let newValue = value - decrementValue;

      if (newValue < 0) {
        newValue = 100 - (Math.abs(newValue) % 101);
      }

      onChange(newValue);
    }, 100);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="text-white hover:text-gray-400"
        onMouseDown={startIncrement}
        onMouseUp={clearTimer}
        onMouseLeave={clearTimer}
        onTouchStart={startIncrement}
        onTouchEnd={clearTimer}
      >
        <FaChevronUp size={24} />
      </button>

      <div className="text-2xl text-white py-2 w-12 text-center">{value}</div>

      <button
        className="text-white hover:text-gray-400"
        onMouseDown={startDecrement}
        onMouseUp={clearTimer}
        onMouseLeave={clearTimer}
        onTouchStart={startDecrement}
        onTouchEnd={clearTimer}
      >
        <FaChevronDown size={24} />
      </button>
    </div>
  );
}