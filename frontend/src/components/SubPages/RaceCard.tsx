import React from 'react';
import { motion } from 'framer-motion';

interface RaceCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

const RaceCard: React.FC<RaceCardProps> = ({ name, description, imageUrl }) => {
  return (
    <motion.section
      className="flex flex-row h-60 w-full justify-between items-center p-12 rounded-lg bg-black bg-opacity-80"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, ease: 'circInOut' }}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="flex items-center gap-5">
        <img src={imageUrl} alt={name} className="max-w-28 shadow-none" />
        <div>
          <h2 className="text-3xl">{name}</h2>
          <p className="text-lg">{description}</p>
        </div>
      </div>
      <div>
        <input type="checkbox" className="cursor-pointer w-32 h-12 accent-customRed " />
      </div>
    </motion.section>
  );
};

export default RaceCard;