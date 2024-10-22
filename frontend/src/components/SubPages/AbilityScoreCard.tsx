import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Counter from '../Counter/Counter.tsx';

interface Skill {
  name: string;
}

interface AbilityScoreCardProps {
  name: string;
  description: string;
  skills: Skill[];
}

const AbilityScoreCard: React.FC<AbilityScoreCardProps> = ({ name, description, skills }) => {
  // Add state to keep track of the ability score value
  const [score, setScore] = useState<number>(0);

  // Handle value changes for the counter
  const handleCounterChange = (newValue: number) => {
    setScore(newValue); // Update the score state
  };

  return (
    <motion.section
      className="flex flex-row gap-10 h-60 w-full justify-between items-center p-12 rounded-lg bg-black bg-opacity-80"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: 'circInOut' }}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {/* Display the ability name */}
      <h2 className="text-3xl">{name}</h2>

      {/* Counter component */}
      <Counter value={score} onChange={handleCounterChange} />

      {/* Display the ability description */}
      <p className="text-lg">"{description}"</p>

      {/* Display the skills associated with the ability */}
      <ul className="text-white min-w-32">
        <li className="bold text-lg">Skills:</li>
        {skills.map((skill, index) => (
          <li key={index}>{skill.name}</li>
        ))}
      </ul>
    </motion.section>
  );
};

export default AbilityScoreCard;


