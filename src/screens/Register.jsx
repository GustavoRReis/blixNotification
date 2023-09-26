import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { registerUser } from '../services/firebaseRequests';
import { HelperText } from 'react-native-paper';

function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [messageError, setMessageError] = useState(false);

  const handleCadastro = async () => {
    if (!email || !password || !confirmPassword) {
      return setMessageError(true);
    }

    if (password !== confirmPassword) {
      return Alert.alert('As senhas não correspondem');
    }

    await registerUser(email, password, confirmPassword);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
     navigation.navigate('Home');
  };

  const backToLogin = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.voltarLink} onPress={backToLogin}>
        <Text>Já tem uma conta? Voltar para o Login</Text>
      </TouchableOpacity>

      <View>
        <HelperText type="error" visible={messageError}>
          Por favor, preencha todos os campos
        </HelperText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
  voltarLink: {
    marginTop: 16,
  },
});

export default Register;
