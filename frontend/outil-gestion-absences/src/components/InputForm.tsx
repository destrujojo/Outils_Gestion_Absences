import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface InputFormProps {
  id: string;
  label: string;
  type: string;
  required: boolean;
  autoComplete: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showEye?: boolean;
  toggleEye?: () => void;
}

const InputForm: React.FC<InputFormProps> = ({
  id,
  label,
  type,
  required,
  autoComplete,
  value,
  onChange,
  showEye,
  toggleEye,
}) => {
  return (
    <div className="mt-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          required={required}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-0 p-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-darkPurple sm:text-sm sm:leading-6"
        />
        {showEye && (
          <button
            type="button"
            onClick={toggleEye}
            className="absolute inset-y-0 right-0 flex items-center p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Toggle password visibility"
          >
            {type === "text" ? (
              <EyeIcon className="h-4 w-5" aria-hidden="true" />
            ) : (
              <EyeSlashIcon className="h-4 w-5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputForm;
