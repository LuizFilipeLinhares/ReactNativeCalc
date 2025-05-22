import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
} from 'react-native';

export default function App() {
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttons = [
    'C', 'DEL', '/', 
    7, 8, 9, '*', 
    4, 5, 6, '-', 
    1, 2, 3, '+', 
    0, '.', '='
  ];

  function calculator() {
    const lastChar = currentNumber[currentNumber.length - 1];
    if (['/', '*', '-', '+', '.'].includes(lastChar)) return;
    
    try {
      const result = eval(currentNumber).toString();
      setCurrentNumber(result);
    } catch {
      setCurrentNumber('Erro');
    }
  }

  function handleInput(button) {
  console.log('Botão clicado:', button); // <-- debug
  Vibration.vibrate(30);
}


    if (['+', '-', '*', '/'].includes(button)) {
      setCurrentNumber(prev => prev + button);
      return;
    }

    switch (button) {
      case 'DEL':
        setCurrentNumber(prev => prev.slice(0, -1));
        break;
      case 'C':
        setCurrentNumber('');
        setLastNumber('');
        break;
      case '=':
        setLastNumber(currentNumber + ' =');
        calculator();
        break;
      default:
        setCurrentNumber(prev => prev + button);
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((btn, index) => {
          const isOperator = ['/', '*', '-', '+', '='].includes(btn);
          const isSpecial = ['DEL', 'C'].includes(btn);
          const buttonStyle = isOperator || isSpecial
            ? [styles.button, styles.orangeButton]
            : [styles.button, styles.blueButton];

          return (
            <TouchableOpacity
              key={index}
              style={buttonStyle}
              onPress={() => handleInput(btn)}
            >
              <Text style={styles.buttonText}>{btn}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1FF',
    justifyContent: 'flex-end',
  },
  results: {
    padding: 20,
    minHeight: '35%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#D6E4FF',
  },
  historyText: {
    fontSize: 20,
    color: '#7C7C7C',
  },
  resultText: {
    fontSize: 40,
    color: '#2A74D1',
    marginTop: 10,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '25%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  blueButton: {
    backgroundColor: '#F2F7FF',
  },
  orangeButton: {
    backgroundColor: '#FF7A00',
  },
  buttonText: {
    fontSize: 26,
    color: 'white',
  },
});
