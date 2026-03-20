/*
Ayat Al-Azzawi
PROG20261 - Assignment 2

Commands used for project creation and package addition:
npx @react-native-community/cli@latest init Assignment2
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

References:
https://reactnative.dev/
https://reactnavigation.org/docs/getting-started
https://reactnavigation.org/docs/native-stack-navigator
https://reactnavigation.org/docs/use-focus-effect
https://react.dev/reference/react/createContext
https://react.dev/reference/react/useContext


//import { Platform, StyleSheet } from 'react-native';
//Please keep in mind i used my assignmet 1 as a reference so a lot of the variables have the same name and 'equivilant' setup

//Ayat notes:
/* */

/*
C

References:
https://reactnative.dev/
https://reactnavigation.org/docs/getting-started
https://reactnavigation.org/docs/native-stack-navigator
https://reactnavigation.org/docs/use-focus-effect
*/

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//stack basically lets me move between screens
const Stack = createNativeStackNavigator();

const initialCounts = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
};

const StatisticsContext = createContext(null);

function StatisticsProvider({ children }) {
  const [counts, setCounts] = useState(initialCounts);

  const value = useMemo(() => {
    return { counts, setCounts };
  }, [counts]);

  return (
    <StatisticsContext.Provider value={value}>
      {children}
    </StatisticsContext.Provider>
  );
}

function useStatistics() {
  const context = useContext(StatisticsContext);

  if (!context) {
    throw new Error('useStatistics must be used inside StatisticsProvider');
  }

  return context;
}

function Header({ title, showBackButton, onBackPress }) {
  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={onBackPress}
        >
          <Text style={styles.headerBackText}>{'‹'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.headerBackPlaceholder} />
      )}

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.headerRightPlaceholder} />
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [number, setNumber] = useState('...'); //number here is referrng to my current number that is visible, i named the function that will generate the random number setNumber and then '..' is my placeholder value for now.
  const spinningRef = useRef(null); //used to hold the interval for the spinning random number effect
  const { setCounts } = useStatistics();

  useFocusEffect(
    useCallback(() => {
      setNumber('...');
      return () => {
        if (spinningRef.current) {
          clearInterval(spinningRef.current);
          spinningRef.current = null;
        }
      };
    }, [])
  );

  /*from the react native documentation I adapted the following :
  onClick={() => {
        setText('');
        setTodos([{
          id: todos.length,
          text: text
        }, ...todos]); */

  const updateCounts = (num) => {
    setCounts(prev => {
      const newCounts = { ...prev }; //copy old counts
      newCounts[num] = newCounts[num] + 1; //increase only the number we got
      return newCounts; //return updated object
    });
  };

  const spinToNumber = (finalNumber) => {
    let spinCount = 0;
    const totalSpins = 12; //how many quick fake numbers show before landing

    if (spinningRef.current) {
      clearInterval(spinningRef.current);
    }

    spinningRef.current = setInterval(() => {
      const fakeNumber = Math.floor(Math.random() * 9) + 1;
      setNumber(fakeNumber.toString());
      spinCount++;

      if (spinCount >= totalSpins) {
        clearInterval(spinningRef.current);
        spinningRef.current = null;
        setNumber(finalNumber.toString()); //finally land on the actual generated number
      }
    }, 50); //smaller number = faster flicker
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Header title="Random Number Generator" showBackButton={false} />

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
            const randomNumber = Math.floor(Math.random() * 9) + 1; // so basically i called math.random then floored it to remove the decimal, added +1 (borrowd from assignment 1, to make it generate from 1-9 instead of 0-9) then used toString to make it a string
            spinToNumber(randomNumber); //show quick spinning fake numbers before landing
            updateCounts(randomNumber); //update stats when number is generated
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
          onPress={() => navigation.navigate('Statistics')}
        >
          <Text style={styles.buttonText}>View Statistics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StatisticsScreen({ navigation }) {
  //thought process: I decided for the count to actually store the counts in an object and then display the list in an array as best practice
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { counts, setCounts } = useStatistics();

  const clearStatistics = () => {
    setCounts(initialCounts);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Statistics"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.statsContainer}>
        <FlatList
          data={numbers}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.statsList}
          renderItem={({ item }) => (
            <Text style={styles.statLine}>
              Number {item}: {counts[item]} times
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={clearStatistics}
        >
          <Text style={styles.buttonText}>Clear Statistics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <StatisticsProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Statistics" component={StatisticsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StatisticsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b08968',
    paddingTop: 0,
    marginTop: 0,
  },

  header: {
    width: '100%',
    backgroundColor: '#7f5539',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 10,
  },

  headerBackButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerBackText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 32,
  },

  headerBackPlaceholder: {
    width: 40,
  },

  headerRightPlaceholder: {
    width: 40,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },

  numberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 90,
  },

  number: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'white',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 18,
  },

  button: {
    width: 170,
    backgroundColor: '#7f5539',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginHorizontal: 6,
  },

  buttonText: {
    color: 'white',
    fontSize: 14,
  },

  // Stats screen styles
  statsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },

  statsList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  statLine: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 22,
  },
});