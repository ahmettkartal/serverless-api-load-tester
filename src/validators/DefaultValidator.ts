import { Types } from "mongoose";

const ObjectId = Types.ObjectId;
const VALID_BOOLEANS = [true, "true", false, "false"];
const VALID_STATUS = ['ACTIVE', 'PASSIVE'];
const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const isValidId = (id: any): boolean => {
    if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ID');
    }
    return true;
}

export const isValidBoolean = (value: any, is_optional: boolean = false): boolean => {
    if (is_optional && !value) {
        return true;
    } else if (VALID_BOOLEANS.includes(value)) {
        return true;
    } else {
        throw new Error('Invalid Boolean');
    }
}

export const isValidString = (value: any, is_optional: boolean = false): boolean => {
    if (is_optional && !value) {
        return true;
    } else if (typeof value === 'string' && value.length > 0) {
        return true;
    } else {
        throw new Error('Invalid String');
    }
}

export const isValidStringLength = (value: any, min: number, max: number, is_optional: boolean = false): boolean => {
    if (is_optional && !value) {
        return true;
    } else if (typeof value === 'string' && value.length >= min && value.length <= max) {
        return true;
    } else {
        throw new Error('Invalid String Length (Min: ' + min + ', Max: ' + max + ')');
    }
}

export const isValidStatus = (value: any, is_optional: boolean = false): boolean => {
    if (is_optional && !value) {
        return true;
    } else if (VALID_STATUS.includes(value)) {
        return true;
    } else {
        throw new Error('Invalid Status');
    }
}

export const isValidEmail = (value: any, is_optional: boolean = false): boolean => {
    if (is_optional && !value) {
        return true;
    } else if (typeof value === 'string' && value.length > 0 && VALID_EMAIL_REGEX.test(value)) {
        return true;
    } else {
        throw new Error('Invalid Email');
    }
}