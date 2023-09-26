import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import PushNotification from '../components/PushNotification';
import News from '../components/News';
import { auth } from '../config/firebase';

export default function Home() {
  const [userEmail, setUserEmail] = useState(false);

  const user = auth.currentUser.email;

  useEffect(() => {
    if (user === 'admin@admin.com') {
      setUserEmail(true);
    }
  }, []);

  return (
    <View>
      {/* {userEmail ? <PushNotification /> : <News />} */}
      <News />
    </View>
  );
}
