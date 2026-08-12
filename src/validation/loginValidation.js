export const emailValidation = {
    required: "Email is required",
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
    },
};

export const passwordValidation = {
    required: "Password is required",
    minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
    },
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        message:
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    },
};

export const passwordConfirmationValidation = (watch) => ({
    required: "Password confirmation is required",
    validate: (value) =>
        value === watch("password") || "Passwords do not match",
});