/*
Ayat Al-Azzawi
Assignment 2 for Dr.Surkhang

//PLEASE NOTE I DEVIATED FROM THE CLASS MATERIAL SLIGHTLY AND USED TYPING/ TYPE ANNOTATIONS BECAUSE OF PERSISTENT TYPE MISMATCH ERRORS. I WAS ALSO WORRIED THAT THE PROJECT REQUIRED TYPESCRIPT SINCE IT SPECIFICALLY ASKED FOR .TSX EXTENSION IN THE REQUIREMENTS.

Commands used for project creation and package addition:
npx create-expo-app@latest Assignment2 --template blank-typescript
npx expo install @react-navigation/native
npx expo install @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

References:
https://reactnative.dev/
https://reactnavigation.org/docs/getting-started
https://reactnavigation.org/docs/native-stack-navigator
https://reactnavigation.org/docs/use-focus-effect
https://react.dev/reference/react/createContext
https://react.dev/reference/react/useContext */


//first all my imports (majority of this wa a mixture of references from class examples and from assignment instructions)
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, } from '@react-navigation/native-stack';
//import React, { createContext, useCallback, useContext, useMemo, useRef, useState, } from 'react';
import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//refernce for context: https://medium.com/%40ademarsj/using-context-api-with-react-navigation-react-native-81db3df4761e
//https://reactnative.dev/docs/next/typescript this one had an example very very similar to our assignment which i used 
// I was lost about whether or not to use TypeScript or JavaScript, the original version of this project uses JavaScript but I swotched to type because the assignment asks for .tsx extension
//I defined a type (object) and called it StackList where I defined all my screens and the type of data they expect, i did this to mitigate a type mismatch error I kept getting before
//https://reactnavigation.org/docs/typescript/?config=static this is my reference for typechecking with typescript
type StackList = { 
  Home: undefined;
  Statistics: undefined;
};//"i have two routes, home and statistics, both of which take no specific types"
//here is the exact example I used: https://reactnative.dev/docs/navigation

//This was done for the same type mismatch issue 
type Counts = Record<number, number>; //created a typr called Record expecting a key value pair of number, number 


type SetCounts = React.Dispatch<React.SetStateAction<Counts>>;

type StatsContextType = {
  counts: Counts;
  setCounts: SetCounts
}
//same thing as before but now im tellin g it the shape of the data stored in my datacontext d
//setCounts: React.Dispatch<React.SetStateAction<Counts>>;  is a setter function returned by useState, 
//so basically here typescript will infer that the dispatch function can either take a new Counts object OR a callback which recieves the prvious Counts and returns the next counts

const Stack = createNativeStackNavigator<StackList>();

//I did it this way because the assignment was clear about wanting the list to be in a specific order and look
const initialCounts: Counts = {
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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //originally wanted to implement th elogic from  assignment 1 but this is the setup for Flatlist

const StatsContext = createContext<StatsContextType | null>(null); //second half introduced because there is a point where the value is null pre the existence of the provider 

function StatsProvider({ children }: { children: React.ReactNode }) {
  const [counts, setCounts] = useState<Counts>(initialCounts);

  //const value = useMemo(() => ({ counts, setCounts }), [counts]);
  const value = { counts, setCounts};

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  );
}

function useStats(): StatsContextType {
  const context = useContext(StatsContext);

  if (!context) {
    throw new Error('useStatistics must be used inside StatisticsProvider');
  }

  return context;
}

type HeaderProps = {
  title: string;
  showBackButton: boolean;
  onBackPress?: () => void;
};

function Header({ title, showBackButton, onBackPress }:
{
  title: string;
  showBackButton: boolean;
  onBackPress?: () => void;
}) {
  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity style={styles.headerBackButton} onPress={onBackPress}>
          <Text style={styles.headerBackText}>{'‹'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.headerSidePlaceholder} /> //make nonclickable 
      )}

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.headerSidePlaceholder} />
    </View>
  );
}

function HomeScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<StackList, 'Home'>;
}) {
  const [number, setNumber] = useState('...');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { setCounts } = useStats();

  useFocusEffect( //meets requirement from https://reactnavigation.org/docs/use-focus-effect/
    useCallback(() => {
      setNumber('...');

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }, [])
  );
  //example used: useFocusEffect(
  /*React.useCallback(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      // Expensive task
    });

    return () => task.cancel();
  }, [])
);*/

  const updateCounts = (generatedNumber: number) => {
    setCounts((prev) => ({
      ...prev,
      [generatedNumber]: prev[generatedNumber] + 1,
    }));
  };

  const spinToNumber = (finalNumber: number) => {
    let spinCount = 0;
    const totalSpins = 12; //I didn't know whether or not to use this animation or if its even the same as his but it does look similar

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const fakeNumber = Math.floor(Math.random() * 9) + 1; //from my last assignment 
      setNumber(String(fakeNumber));
      spinCount++; //iterate 

      if (spinCount >= totalSpins) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setNumber(String(finalNumber));
      }
    }, 50);
  };

  const generateRandomNumber = () => { //also from my last assignment 
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    spinToNumber(randomNumber);
    updateCounts(randomNumber);
  };

  return (
    <View style={styles.container}>
      <Header title="Random Number Generator" showBackButton={false} />

      <View style={styles.numberContainer}>
        <Text style={styles.number}>{number}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={generateRandomNumber}>
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

function StatisticsScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<StackList, 'Statistics'>;
}) {
  const { counts, setCounts } = useStats();

  const clearStatistics = () => {
    setCounts(initialCounts);
  };

  //https://reactnative.dev/docs/flatlist
  //taken almost verbatem from here https://www.geeksforgeeks.org/react-native/react-native-flatlist-component/
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
          renderItem={({ item }) => (
            <Text style={styles.statLine}>
              Number {item}: {counts[item]} times
            </Text>
          )}
          contentContainerStyle={styles.statsList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={clearStatistics}>
          <Text style={styles.buttonText}>Clear Statistics</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <StatsProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Statistics" component={StatisticsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StatsProvider>
  );
}

//done based on previoius class projects 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b08968',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#7f5539',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerBackButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerBackText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  headerSidePlaceholder: {
    width: 40,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  numberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 90,
  },
  number: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold',
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginHorizontal: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
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