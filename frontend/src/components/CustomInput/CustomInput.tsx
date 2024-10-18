import React, { useEffect, useRef, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

type InputProps = {
  placeholder: string;
  inputName: string;
  value: string;
  onSave: (newValue: string) => void;
};
/**
 * CustomInput component allows editing and saving a text value in place with a toggle between view and edit modes.
 * It displays a value, and when clicked, switches to an input field for editing.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.placeholder - Placeholder text shown when the input field is empty.
 * @param {string} props.inputName - The label/name for the input field (used for accessibility and alerts).
 * @param {string} props.value - The initial value to display.
 * @param {Function} props.onSave - Callback function triggered when the input value is saved.
 *                                   It receives the new value as an argument.
 *
 * @example
 * // Usage example:
 * <CustomInput
 *   placeholder="Enter your name"
 *   inputName="Name"
 *   value="John Doe"
 *   onSave={(newValue) => console.log(newValue)}
 * />
 */

const CustomInput = ({ placeholder, inputName, value, onSave }: InputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  /**
   * Handles logic when entering editMode
   */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /**
   * When user clicks saveIcon while in editing-mode, this verifies that value is not empty or equal to placeholder
   * If true, then alerts user, if not then triggers onSave callback function
   */

  const handleSaveClick = () => {
    const currentValue = inputValue.trim();

    if (currentValue === '' || currentValue === placeholder) {
      alert(`${inputName} cannot be empty!`);
      setInputValue(placeholder);
    } else {
      onSave(currentValue);
    }
    setIsEditing(false);
  };

  /**
   * Saves value when input loses focus, i.e. user clicks outside input field (onBlur event)
   */
  const handleBlur = () => {
    handleSaveClick();
  };

  /**
   * Handles the change event when user are writing inside input, limits value to 20 characters
   * @param{React.ChangeEvent<HTMLInputElement>} e - The change event
   */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newName = e.target.value;

    if (newName.length > 20) {
      newName = newName.substring(0, 20);
    }
    setInputValue(newName);
  };

  return (
    <>
      <section className="flex flex-row items-center justify-center gap-4 mb-8">
        {isEditing ? (
          <>
            <label htmlFor={inputName} className="sr-only">
              {inputName}
            </label>
            <input
              ref={inputRef}
              id={inputName}
              type="text"
              defaultValue={inputValue === placeholder ? '' : inputValue}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
              className="focus:outline-customRed p-y-5 focus:ring-customRed text-black text-3xl font-bold text-center"
            />
          </>
        ) : (
          <h2
            className="text-3xl md:text-4xl text-white font-semibold"
            aria-label={isEditing ? `Save ${inputName}` : `Edit ${inputName}`}
          >
            {inputValue}
          </h2>
        )}

        <button
          className="p-2 rounded-lg hover:bg-white transition-colors duration-300 group"
          aria-label={`Edit ${inputName}`}
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? (
            <SaveIcon fontSize="large" className="text-white group-hover:text-black duration-100" />
          ) : (
            <ModeEditOutlineIcon fontSize="large" className="text-white group-hover:text-black duration-100" />
          )}
        </button>
      </section>
    </>
  );
};

export default CustomInput;
