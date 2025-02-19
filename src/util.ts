import generatePasswordBrowser from 'generate-password';

export const randomName = (prefix = '') => `xapiUnitTest${prefix}${Buffer.from(Math.random().toString())
    .toString('base64')
    .substr(10, 5)}`;

const { generate } = generatePasswordBrowser;

export function alphanumericPassword(length: number, lowercaseOnly = false) {
    return generate({
        length,
        numbers: true,
        symbols: false,
        uppercase: !lowercaseOnly,
        lowercase: true,
        strict: true,
    });
}
