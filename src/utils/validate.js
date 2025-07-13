export const validateSignIn = (email, password) => {
    if(!email || !password) {
        return "Email and password are required";
    }
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/.test(password);

    if (!isEmailValid) {
        return "Invalid email";
    }
    if (!isPasswordValid) {
        return "Invalid password";
    }
    return null;
}

export const validateSignUp = (email, password, username) => {
    if(!email || !password || !username) {
        return "Email, password and username are required";
    }
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/.test(password);
    const isUsernameValid = /^[a-zA-Z0-9]+$/.test(username);

    if (!isEmailValid) {
        return "Invalid email";
    }
    if (!isPasswordValid) {
        return "Invalid password";
    }
    if (!isUsernameValid) {
        return "Invalid username";
    }
    return null;
}

