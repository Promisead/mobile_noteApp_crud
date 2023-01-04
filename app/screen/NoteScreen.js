import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import NoteInputModal from '../components/NoteInputModal';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import colors from '../misc/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';

const NoteScreen = ({ user }) => {
  const [greet, setGreet] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  const findGreet = () => {
    const hrs = new Date().getHours();
    // console.log(hrs);
    if (hrs === 0 || hrs < 12) return setGreet('Morning');
    if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
    setGreet('Evening');
  };

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) setNotes(JSON.parse(result));
  };

  useEffect(() => {
    findNotes();
    findGreet();
  }, []);

  const handleOnSubmit = async (title, desc) => {
    console.log(title, desc);
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
          {notes.length ? (
            <SearchBar containerStyle={{ marginVertical: 15 }} />
          ) : null}
          <FlatList
            data={notes}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 15,
            }}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Note item={item} />}
          />

          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeadercontainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        onPress={() => {
          setModalVisible(true);
        }}
        antIconName="plus"
        style={styles.addBtn}
      />
      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeadercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    right: 20,
    bottom: 50,
  },
});

export default NoteScreen;
