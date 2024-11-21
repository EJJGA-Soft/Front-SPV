export const validatePassword = (password: string): { isValid: boolean; message: string | null } => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  
    if (!passwordRegex.test(password)) {
      return {
        isValid: false,
        message: "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un carácter especial.",
      };
    }
  
    return { isValid: true, message: null };
  };