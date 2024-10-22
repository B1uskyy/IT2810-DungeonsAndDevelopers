import React from 'react';
import { motion } from 'framer-motion';
import classImages from '../../utils/classImageMapping.ts';

interface ClassCardProps {
  name: string;
  hit_die: number;
  index: string;
  skills: string[];
}

const ClassCard: React.FC<ClassCardProps> = ({ name, hit_die, index, skills }) => {
  const classImage = classImages[index];

  return (
    <motion.section
      className="flex flex-row h-60 w-full justify-between items-center p-12 rounded-lg bg-black bg-opacity-80"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: 'circInOut' }}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="flex items-center gap-5">
        <img src={classImage} alt={name} className="max-w-44 shadow-none" />
        <div>
          <h2 className="text-3xl">{name}</h2>
          <p className="text-lg">HP: {hit_die}</p>
          <p className="text-lg">Skills: {skills.join(', ')}</p>
        </div>
      </div>
      <div>
        <input type="checkbox" className="cursor-pointer w-32 h-12 accent-customRed " />
      </div>
    </motion.section>
  );
};

export default ClassCard;