const ObjectId = require("mongoose").Types.ObjectId;
const VALID_BOOLEANS = [true, "true", false, "false"];
const VALID_STATUS = ['ACTIVE', 'PASSIVE'];
const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

exports.isValidId = (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ID');
    }
    return true;
}

exports.isValidBoolean = (value, is_optional) => {
    if (is_optional && !value) {
        return true;
    } else if (VALID_BOOLEANS.includes(value)) {
        return true;
    } else {
        throw new Error('Invalid Boolean');
    }
}

exports.isValidString = (value, is_optional) => {
    if (is_optional && !value) {
        return true;
    } else if (typeof value === 'string' && value.length > 0) {
        return true;
    } else {
        throw new Error('Invalid String');
    }
}

exports.isValidStringLength = (value, min, max, is_optional) => {
    if (is_optional && !value) {
        return true;
    } else if (typeof value === 'string' && value.length >= min && value.length <= max) {
        return true;
    } else {
        throw new Error('Invalid String Length (Min: ' + min + ', Max: ' + max + ')');
    }
}

exports.isValidStatus = (value, is_optional) => {
    if (is_optional && !value) {
        return true;
    } else if (VALID_STATUS.includes(value)) {
        return true;
    } else {
        throw new Error('Invalid Status');
    }
}

exports.isValidEmail = (value, is_optional) => {
    if (is_optional && !value) {
        return true;
    } else if (typeof value === 'string' && value.length > 0 && VALID_EMAIL_REGEX.test(value)) {
        return true;
    } else {
        throw new Error('Invalid Email');
    }
}