import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { registerRootComponent } from 'expo';

export default function App() {
  const [dbmValue, setDbmValue] = useState('');
  const [powerValue, setPowerValue] = useState('');
  const [lastModified, setLastModified] = useState(null);
  const [mathExplanation, setMathExplanation] = useState('');

  const handleDbmChange = (value) => {
    setDbmValue(value);
    setLastModified('dbm');

    if (value === '' || isNaN(Number(value))) {
      setPowerValue('');
      setMathExplanation('');
      return;
    }

    const dbm = Number(value);
    const power = Math.pow(10, (dbm - 30) / 10);
    const powerResult = power.toFixed(6);
    setPowerValue(powerResult);
    showMathExplanation(true, value, power);
  };

  const handlePowerChange = (value) => {
    setPowerValue(value);
    setLastModified('power');

    if (value === '' || isNaN(Number(value)) || Number(value) <= 0) {
      setDbmValue('');
      setMathExplanation('');
      return;
    }

    const power = Number(value);
    const dbm = 10 * Math.log10(power) + 30;
    const dbmResult = dbm.toFixed(6);
    setDbmValue(dbmResult);
    showMathExplanation(false, value, dbm);
  };

  const showMathExplanation = (fromDbm, value, result) => {
    if (fromDbm) {
      const dbm = Number(value);
      const power = result;
      const exponent = (dbm - 30) / 10;
      
      const explanation = `Converting ${dbm} dBm to Watt:\n\nFormula: Power (W) = 10^((dBm - 30) / 10)\nStep 1: Calculate exponent: (${dbm} - 30) ÷ 10 = ${exponent.toFixed(3)}\nStep 2: 10^${exponent.toFixed(3)} = ${power.toFixed(6)} W\n\nResult: Power = ${power.toFixed(6)} W`;
      setMathExplanation(explanation);
    } else {
      const power = Number(value);
      const dbm = result;
      const logValue = Math.log10(power);
      
      const explanation = `Converting ${power} W to dBm:\n\nFormula: dBm = 10 × log₁₀(Power) + 30\nStep 1: Calculate log₁₀(${power}) = ${logValue.toFixed(6)}\nStep 2: 10 × ${logValue.toFixed(6)} + 30 = ${dbm.toFixed(6)}\n\nResult: dBm = ${dbm.toFixed(6)}`;
      setMathExplanation(explanation);
    }
  };

  const clearAll = () => {
    setDbmValue('');
    setPowerValue('');
    setLastModified(null);
    setMathExplanation('');
    Keyboard.dismiss();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>dBm ⇄ Watt Converter</Text>
        </View>
        
        {/* Main Converter Card */}
        <View style={styles.card}>
          {/* dBm Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>dBm</Text>
            <TextInput
              style={styles.input}
              value={dbmValue}
              onChangeText={handleDbmChange}
              placeholder="Enter dBm value..."
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={dismissKeyboard}
            />
          </View>

          {/* Conversion Indicator */}
          <View style={styles.conversionIndicator}>
            <Text style={styles.arrowIcon}>⇅</Text>
          </View>

          {/* Power Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Watt (W)</Text>
            <TextInput
              style={styles.input}
              value={powerValue}
              onChangeText={handlePowerChange}
              placeholder="Enter watt value..."
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={dismissKeyboard}
            />
          </View>

          {/* Clear Button */}
          {(dbmValue || powerValue) ? (
            <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Math Explanation Box */}
        {mathExplanation ? (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>📊 Calculation Steps</Text>
            <Text style={styles.explanation}>{mathExplanation}</Text>
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 24,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    fontSize: 18,
    backgroundColor: '#f9fafb',
    fontFamily: 'monospace',
  },
  conversionIndicator: {
    alignItems: 'center',
    marginVertical: 16,
  },
  arrowIcon: {
    fontSize: 24,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    width: 48,
    height: 48,
    borderRadius: 24,
    textAlign: 'center',
    lineHeight: 48,
  },
  explanationContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 24,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  explanation: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  clearButton: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  clearButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
});

registerRootComponent(App);
