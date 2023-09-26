import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import { auth } from '../config/firebase';
import { handleLogin } from '../services/firebaseRequests';


function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const register = () => {
    navigation.navigate('cadastrar');
  };

  const login = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={require('../../assets/Logoborboleta.png')}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={() => handleLogin(auth, email, password, login)}
      >
        Entrar
      </Button>

      <TouchableOpacity style={styles.registerLink} onPress={register}>
        <Text style={styles.registerLink}>
          Não tem uma conta? Cadastre-se aqui
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgb(52, 12, 127)',
  },
  img: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: 'white',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  registerLink: {
    marginTop: 16,
    color: 'white',
  },
});

export default Login;
