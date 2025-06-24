import ExpoPortFinder from 'expo-port-finder';
import { useEffect, useState, useCallback } from 'react';
import { Button, Text, View, SafeAreaView } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [port, setPort] = useState(0);
  const [err, setErr] = useState('');

  const getFreePort = useCallback(() => {
    setLoading(true);
    sleep(1000)
      .then(() => {
        return ExpoPortFinder.getPort(9564, 10000)
      })
      .then(port => {
        setPort(port);
      })
      .catch(err => {
        setErr(err.message);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    getFreePort();
  }, [getFreePort]);

  return (
    <SafeAreaView>
      <View style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#fff',
      }}>
        {
          loading? (
            <Text style={{color: '#000'}}>Loading...</Text>
          ): (
            <Text style={{color: '#000'}}>{err? `Error: ${err}`: `Free Port: ${port}`}</Text> 
          )
        }
        <Button title='GET PORT' onPress={getFreePort} />
      </View>
    </SafeAreaView>
  );
}

async function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}