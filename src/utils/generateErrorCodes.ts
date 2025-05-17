const generateMissingCode = (field: string) => {
    if (field) return `${field.toUpperCase()}_MISSING`;
    else return '';
}

const generateNotFoundCode = (field: string) => {
    if (field) return `${field.toUpperCase()}_NOT_FOUND`;
    else return '';
}

const generateInvalidCode = (field: string) => {
    if (field) return `INVALID_${field.toUpperCase()}`;
    else return '';
}


export {generateMissingCode, generateNotFoundCode, generateInvalidCode};
