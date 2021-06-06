import CryptoJS from "crypto-js";

export const AESDecrypt = (message) => {
  if (message) {
    const decrypted = CryptoJS.AES.decrypt(
      message,
      process.env.NEXT_PUBLIC_API_SECRET,
    );
    const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
  }
  return message;
};
