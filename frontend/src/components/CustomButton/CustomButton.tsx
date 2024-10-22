import { Link } from 'react-router-dom';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  textSize?: string;
  linkTo?: string;
  noUnderline?: boolean;
  isActive?: boolean;
  children?: React.ReactNode;
}

export default function CustomButton({
                                       text,
                                       onClick,
                                       className = '',
                                       textSize = 'text-3xl',
                                       linkTo,
                                       noUnderline = false,
                                       isActive = false,
                                       children,
                                     }: ButtonProps) {
  const underlineClass = noUnderline
    ? ''
    : `absolute bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0 ${
      isActive ? 'w-full left-0' : 'left-1/2' // Underline for active page on desktop
    }`;

  const activeClass = isActive
    ? 'bold xl:font-[MedievalSharp]' // Bold text for active page on mobile
    : '';

  const buttonContent = (
    <>
      {text}
      <span className={underlineClass}></span>
      {children}
    </>
  );

  // If linkTo is provided, use Link component for navigation
  if (linkTo) {
    return (
      <Link to={linkTo} className={`w-fit relative group flex ${textSize} ${activeClass} ${className}`}>
        {buttonContent}
      </Link>
    );
  }

  // Otherwise, render a regular button
  return (
    <button className={`relative group flex ${textSize} ${activeClass} ${className}`} onClick={onClick}>
      {buttonContent}
    </button>
  );
}