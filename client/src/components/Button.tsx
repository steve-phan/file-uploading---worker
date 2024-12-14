import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"; // Styling options for button
  size?: "small" | "medium" | "large"; // Size options
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
  children,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded transition ease-in-out duration-200";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
  };
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
