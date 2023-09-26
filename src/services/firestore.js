import firestore from '@react-native-firebase/firestore';

const getNews = async (setNews) => {
  firestore()
    .collection('notification')
    .onSnapshot((querySnapshot) => {
      const news = [];
      querySnapshot.forEach((doc) => {
        news.push({ id: doc.id, ...doc.data() });
      });
      setNews(news);
    });
};

const saveToken = async (data) => {
  try {
    const tokens = await firestore()
      .collection('tokens')
      .where('userId', '==', data.userId)
      .get();

    if (tokens.docs.length > 0) {
      await firestore()
        .collection('tokens')
        .doc(tokens.docs[0].id)
        .update(data);
      return tokens.docs[0].id;
    }

    const result = await firestore().collection('tokens').add(data);
    return result.id;
  } catch (error) {
    console.log(error, 'erro ao salvar o token');
  }
};

export { getNews, saveToken };
