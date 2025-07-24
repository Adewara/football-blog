// components/Button.jsx
function Button({ children, onClick, variant = "primary", ...props }) {
  const styles = {
    primary: "bg-blue-600 text-white",
    danger: "bg-red-600 text-white",
    outline: "border border-gray-300 text-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${styles[variant]} hover:opacity-90`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
