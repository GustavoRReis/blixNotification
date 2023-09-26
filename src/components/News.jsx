import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { getNews, saveToken } from '../services/firestore';
import messaging from '@react-native-firebase/messaging';
import { auth } from '../config/firebase';

export default function News() {
  const [newsData, setNews] = useState([]);
  const [tokenMessage, setTokenMessage] = useState('');

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    setTokenMessage(token);
    console.log(token);
    const userId = auth.currentUser.uid;
    console.log(userId);
    await saveToken({
      userId,
      token,
    });
  };

  useEffect(() => {
    getNews(setNews);
    requestUserPermission();
    getToken();
  }, []);

  useEffect(() => {
    messaging().onMessage(async (message) => console.log(message));

    messaging().setBackgroundMessageHandler(async (message) =>
      console.log(message)
    );
  }, [newsData]);

  return (
    <View style={styles.container}>
      <Text style={styles.newsHeader}>Notificações</Text>
      {newsData.map((newsItem) => (
        <TouchableOpacity
          key={newsItem.id}
          style={styles.newsCard}
          onPress={() => {
            if (newsItem.content.includes('http')) {
              Linking.openURL(newsItem.content);
            }
          }}
        >
          <Text style={styles.newsTitle}>{newsItem.title}</Text>
          <Text style={styles.newsDescription}>{newsItem.content}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(52, 12, 127)',
  },
  newsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: 'white',
    textAlign: 'center',
  },
  newsCard: {
    margin: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3, 
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 16,
  },
});
