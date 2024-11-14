
export const evaluatePassword = (password: string): string => {
    if(password.length < 6){
        return "Muy simple";
    } else if (password.length < 10 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        return "Media";
    } else {
        return "Difícil";
    }
};