import { Slider, Box, SxProps } from '@mui/material';
import { GiDaemonSkull, GiGoblinHead, GiRoundShield, GiSpikedDragonHead } from 'react-icons/gi';
import { LuSwords } from 'react-icons/lu';
import React from 'react';
import { Theme } from '@mui/system';

const marks = [
  { value: 10, label: <LuSwords size={20} /> },
  { value: 30, label: <GiRoundShield size={20} /> },
  { value: 50, label: <GiGoblinHead size={20} /> },
  { value: 70, label: <GiSpikedDragonHead size={20} /> },
  { value: 90, label: <GiDaemonSkull size={20} /> },
];

interface SliderProps {
  value: number;
  onChange?: (event: Event, newValue: number | number[]) => void;
  disabled?: boolean;
  marks?: typeof marks;
  min?: number;
  max?: number;
  step?: number;
  sx?: SxProps<Theme>;
}

const ReviewSlider: React.FC<SliderProps> = ({ value, onChange, disabled = false, sx }) => {
  const getStringValue = (value: number) => {
    return `${value}`;
  };

  return (
    <Box>
      <Slider
        value={value}
        onChange={onChange}
        getAriaValueText={getStringValue}
        marks={marks}
        disabled={disabled}
        min={0}
        max={100}
        step={10}
        valueLabelDisplay="auto"
        sx={{
          '& .MuiSlider-markLabel': {
            color: 'white',
            fontFamily: 'MedievalSharp',
            fontSize: '1.5rem',
          },
          '& .MuiSlider-mark': {
            color: 'white',
            width: 5,
            height: 5,
            borderRadius: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
          },
          '& .MuiSlider-thumb': {
            color: disabled ? 'transparent' : '#DB3232',
            width: 24,
            height: 24,
          },
          '& .MuiSlider-track': {
            color: '#DB3232',
            height: 10,
          },
          '& .MuiSlider-rail': {
            color: '#DB3232',
            height: 10,
          },
          ...sx,
        }}
      />
    </Box>
  );
};

export default ReviewSlider;