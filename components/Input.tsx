import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        disabled={disabled}
        className={twMerge(
          "w-full rounded-md text-sm border bg-neutral-700  border-transparent file:placeholder:text-white file:bg-transparent file:border-0 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none placeholder:text-neutral-500 duration-200  py-3   placeholder:px-3 ",
          className
        )}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
