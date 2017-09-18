import R from 'ramda';

const checkPattern = (pattern) => (source) => {
    return pattern.test(source);
}

const checkLenth = (min, max) => (source) => {
    const len = source.length;
    return len <= max && len >= min;
}

export const validateUsername = R.both(checkLenth(6, 30), checkPattern(/^[\w.-]+$/));
export const validatePassword = checkLenth(8, 100);