//import { Platform, StyleSheet } from 'react-native';


   
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/*Title*/}
      <Text style={styles.title}>Welcome to My App</Text>

      {/*Randomly Generated Number*/}
      <View style={styles.numberContainer}></View>
        <Text style={styles.numberContainer}>9</Text>
      </View>






    <View style={styles.buttonRow}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('Button Pressed')}
      >
        <Text style={styles.buttonText}>Clear Statistics</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('Button Pressed')}
      >
        <Text style={styles.buttonText}>Back to Home </Text>
      </TouchableOpacity>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  numberContainer: {
    flex: 1,
    justifyContent: 'center', // vertical center
    alignItems: 'center',
  },

  number: {
    fontSize: 80,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'brown',
    padding: 15,
    borderRadius: 0,
    //justifyContent: 'center',
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    width: '80%'
  },
});


