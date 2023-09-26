import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const registerUser = async (email, password, confirmPassword) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const handleLogin = async (auth, email, password, login) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
    .then((dataUser) => {
      /* console.log(dataUser); */
      login();
      return 'sucesso';
    })
    .catch((error) => {
      console.log(error);
      return 'erro';
    });
  return result;
};
