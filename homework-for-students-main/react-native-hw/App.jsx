/*
Динамічне отримання та відображення списку завдань:
Напишіть код прямо у Expo Snack (https://snack.expo.dev/) 
та після перевірки вставте результат у ваш поточний файл.

Вимоги:
- Використати React Native компоненти:
    - TextInput для введення числа — кількості завдань для запиту;
    - Button для виконання запиту;
    - FlatList для відображення списку завдань.
- Керувати станом за допомогою useState та useEffect:
    - tasks — масив отриманих завдань;
    - error — для обробки помилок.
    - loading — для індикації завантаження;
- При натисканні кнопки робити запит на API https://jsonplaceholder.typicode.com/todos?_limit=<число з TextInput> та оновлювати список tasks.
  Приклад запиту: якщо у TextInput введено 5, URL буде https://jsonplaceholder.typicode.com/todos?_limit=5
- Відобразити:
    - повідомлення про завантаження, коли loading === true;
    - повідомлення про помилку, якщо error не порожній;
    - список завдань через FlatList, показуючи title кожного елемента.
*/

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [limit, setLimit] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTasks = () => {
    setLoading(true);
    setError('');
    setTasks([]);

    fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Помилка запиту');
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список завдань</Text>

      <TextInput
        style={styles.input}
        placeholder="Введіть кількість завдань"
        keyboardType="numeric"
        value={limit}
        onChangeText={setLimit}
      />

      <Button title="Отримати завдання" onPress={fetchTasks} />

      {loading && <Text style={styles.info}>Завантаження...</Text>}

      {error !== '' && <Text style={styles.error}>Помилка: {error}</Text>}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.task}>{item.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  info: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
  task: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});