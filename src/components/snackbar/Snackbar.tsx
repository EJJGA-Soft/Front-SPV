import React, { useEffect } from "react";

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000); 
      return () => clearTimeout(timer);
    }, [onClose]);
  
    if (!visible) return null;
  
    return (
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {message}
      </div>
    );
  };
  
  export default Snackbar;