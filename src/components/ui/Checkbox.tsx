import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = ({ label, className = '', checked, ...props }: CheckboxProps) => {
  return (
    <label className="flex items-center cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          className={`w-6 h-6 border-2 border-gray-300 rounded cursor-pointer appearance-none checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${className}`}
          {...props}
        />
        {checked && (
          <svg
            className="absolute top-0.5 left-0.5 w-5 h-5 text-white pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      {label && <span className="ml-2 text-gray-700 group-hover:text-gray-900">{label}</span>}
    </label>
  );
};
