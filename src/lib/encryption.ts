import { JSEncrypt } from "jsencrypt";

export class RSAEncrypt extends JSEncrypt {
  constructor() {
    super();
    this.setPublicKey(import.meta.env.VITE_PUBLIC_KEY); // Replace with your public key
    this.setPrivateKey(import.meta.env.VITE_PRIVATE_KEY); // Replace with your private key
  }
}

export const handleRSAEncrypt = (text: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(import.meta.env.VITE_PUBLIC_KEY);
  return encrypt.encrypt(encodeURI(text));
};

export const handleRSADecrypt = (text: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPrivateKey(import.meta.env.VITE_PRIVATE_KEY);
  return encrypt.decrypt(text);
};
