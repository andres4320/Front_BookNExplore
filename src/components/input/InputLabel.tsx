type Props = {
    label: string;
    name: string;
    placeholder: string;
    id?: string;
    error?: string;
    type?: "text" | "email" | "password" | "date";
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  };

const InputLabel: React.FC<Props> = ({ label, name, placeholder, id, error, type, onChange}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id || name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id || name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default InputLabel