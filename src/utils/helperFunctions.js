// capitalize the first letter of each word
export const capitalize = (str) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export const transformTextField = (textfield) => textfield.toLowerCase().replace(" ", "");
