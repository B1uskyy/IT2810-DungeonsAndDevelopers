import { useEffect, useState } from 'react';

interface CustomCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  scale?: number;
  disableUncheck?: boolean;
  disabled?: boolean;
}

const CustomCheckbox = ({
  checked = false,
  onChange,
  scale = 1,
  disableUncheck = false,
  disabled = false,
}: CustomCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheckboxChange = () => {
    if (disabled) return;
    setIsChecked((prevChecked) => {
      const newChecked = !prevChecked;

      if (!disableUncheck || !prevChecked) {
        if (onChange) {
          onChange(newChecked);
        }
        return newChecked;
      }

      return prevChecked;
    });
  };

  return (
    <label
      className="relative block cursor-pointer transform transition-transform"
      style={{ transform: `scale(${scale})` }}
    >
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} disabled={disabled} />
      <span
        className={`absolute top-0 left-0 h-6 w-6 rounded bg-gray-300 transition-all duration-300 ${
          isChecked ? 'bg-red-600' : ''
        }`}
      />
      {isChecked && (
        <span className="absolute left-[9px] top-[5px] w-[5px] h-[10px] border-white border-2 border-t-0 border-l-0 transform rotate-45" />
      )}
    </label>
  );
};

export default CustomCheckbox;
