import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';

export default function PushNotification() {
  const [message, setMessage] = useState('');


  const handleSendNotification = () => {
    if (message.trim() !== '') {
      Alert.alert('Notificação Enviada', message);
      setMessage('');
    } else {
      Alert.alert('Erro', 'Digite uma mensagem antes de enviar a notificação.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <TextInput
          label="Digite sua mensagem"
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.input}
          mode="outlined"
        />
        <Button
          mode="contained"
          onPress={handleSendNotification}
          style={styles.button}
        >
          Enviar Notificação
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  appBar: {
    backgroundColor: '#007AFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    width: '100%',
  },
});
