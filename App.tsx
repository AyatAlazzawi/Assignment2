//import { Platform, StyleSheet } from 'react-native';
//Please keep in mind i used my assignmet 1 as a reference so a lot of the variables have the same name and 'equivilant' setup 


import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function HomeScreen() {
  const [number, setNumber] = useState<string>('...'); //number here is referrng to my current number that is visible, i named the function that will generate the random number setNumber and then '..' is my placeholder value for now.

  return (
    <View style={styles.container}>
      
      {/* Title */}
      <View style = {styles.header}>
      <Text style={styles.headerTitle}>Random Number Generator</Text>
      </View>
        
  
      {/* Number, line 23 grabs number from the state */}
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{number}</Text> 
      </View>
  
      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          //onPress={() => alert('Button Pressed')}
          onPress={() => {
            const randomNumber = Math.floor(Math.random() *9) + 1;
            setNumber(randomNumber.toString());
          }}
        >
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('Button Pressed')}
        >
          <Text style={styles.buttonText}>View Statistics</Text>
        </TouchableOpacity>
      </View>
  
    </View>
  );
 
}

/*const styles = StyleSheet.create({
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
});*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B7926A',
    //paddingTop: 60,
    //paddingBottom: 40,
    //paddingHorizontal: 20,
    paddingTop: 0,
    marginTop: 0,
  },
  header: {
    width: '100%',
    backgroundColor: '#8B5E3C',
    justifyContent: 'center',
    //alignItems: 'center',
    height: 60,
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  numberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#8B5E3C',
    paddingVertical: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});


