import md5 from 'md5';
import crypto from 'crypto';
import moment from 'moment';
import { node } from 'fluture';
import { pbkdf2 } from './consts';

const { iterations, keylen, digestAlgorithm, encoding, salten } = pbkdf2;

export const hashBySalt = (plain, salt) =>
  node(done => crypto.pbkdf2(plain, salt, iterations, keylen, digestAlgorithm, done))
    .map(raw => new Buffer(raw, 'binary').toString(encoding));

export const generateSaltenHash = plain =>
  generateSalt(plain)
    .chain(salt =>
      hashBySalt(plain, salt)
        .map(hash => ({ hash, salt })));

export const generateSalt = () =>
  node(done => crypto.randomBytes(salten, done))
    .map(raw => raw.toString(encoding));

export const generateHash = originalName => {
  const [start, end] = process.hrtime();
  const microTime = start * 1000000 + end / 1000;

  return md5(moment.utc() + originalName + microTime);
};
