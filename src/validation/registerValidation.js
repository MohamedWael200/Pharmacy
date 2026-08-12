export const nameValidation = {
    required: "Name is required",
    minLength: {
        value: 3,
        message: "Name must be at least 3 characters",
    },
};

export const phoneValidation = {
    required: "Phone is required",
    pattern: {
        value: /^01[0125][0-9]{8}$/,
        message: "Please enter a valid Egyptian phone number",
    },
};

export const addressValidation = {
    required: "Address is required",
    minLength: {
        value: 5,
        message: "Address must be at least 5 characters",
    },
};

export const latitudeValidation = {
    required: "Latitude is required",
    pattern: {
        value: /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
        message: "Invalid latitude",
    },
};

export const longitudeValidation = {
    required: "Longitude is required",
    pattern: {
        value: /^-?((1[0-7]\d)|([1-9]?\d))(\.\d+)?|180(\.0+)?$/,
        message: "Invalid longitude",
    },
};




export const pharmacyNameValidation = {
    required: "Pharmacy name is required",
    minLength: {
        value: 3,
        message: "Pharmacy name must be at least 3 characters",
    },
};

export const openingHoursValidation = {
    required: "Opening hours are required",
    pattern: {
        value: /^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$/,
        message: "Use format HH:MM-HH:MM",
    },
};