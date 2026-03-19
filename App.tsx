//import { Platform, StyleSheet } from 'react-native';
//Please keep in mind i used my assignmet 1 as a reference so a lot of the variables have the same name and 'equivilant' setup 


//Ayat notes:
/* */

/*
Commands used:
npx @react-native-community/cli@latest init Assignment2
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

References:
https://reactnative.dev/
https://reactnavigation.org/docs/getting-started
https://reactnavigation.org/docs/native-stack-navigator
https://reactnavigation.org/docs/use-focus-effect */


import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//import { useState } from 'react';
//import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const [counts, setCounts] = useState<{ [key: number]: number}>({});


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
            const randomNumber = Math.floor(Math.random() *9) + 1; // so basically i called math.random then floored it to remove the decimal, added +1 (borrowd from assignment 1, to make it generate from 1-9 instead of 0-9) then used toString to make it a string 
            setNumber(randomNumber.toString());
          }}
          
          //alternatiely i could have declared a max and a min above and done it verbatum but the logic from my previous assignment was easier by a landslide 
          
          // borrowed from assignment 1 logic + https://www.geeksforgeeks.org/react-native/how-to-generate-random-numbers-in-react-native/ 
          // I adapted these lines const generateRandomNumber = () => {
          //const min = 1; // Minimum value
          // const max = 100; // Maximum value
          // Generate random number in the range [min, max]
          //const number = Math.floor(Math.random() * (max - min + 1)) + min;
          //setRandomNumber(number); // Update state with the new random number
       // };
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


