import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export function encryptData(data: any): string {
  if (typeof SECRET_KEY === 'undefined') {
    throw new Error('SECRET_KEY is not defined');
  }
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decryptData(encryptedData: string): any {
  if (typeof SECRET_KEY === 'undefined') {
    throw new Error('SECRET_KEY is not defined');
  }
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
