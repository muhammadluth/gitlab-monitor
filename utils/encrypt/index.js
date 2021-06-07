import CryptoJS from "crypto-js";

export const AESEncrypt = (message) => {
  if (message) {
    const encrypted = CryptoJS.AES.encrypt(
      message,
      process.env.NEXT_PUBLIC_API_SECRET,
    );
    const encryptedString = encrypted.toString();
    return encryptedString;
  }
  return message;
};
