import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { registerRootComponent } from 'expo';

export default function App() {
  const [dbValue, setDbValue] = useState('');
  const [voltageValue, setVoltageValue] = useState('');
  const [lastModified, setLastModified] = useState(null);
  const [mathExplanation, setMathExplanation] = useState('');

  const handleDbChange = (value) => {
    setDbValue(value);
    setLastModified('db');

    if (value === '' || isNaN(Number(value))) {
      setVoltageValue('');
      setMathExplanation('');
      return;
    }

    const db = Number(value);
    const ratio = Math.pow(10, db / 20);
    const voltageRatio = ratio.toFixed(6);
    setVoltageValue(voltageRatio);
    showMathExplanation(true, value, ratio);
  };

  const handleVoltageChange = (value) => {
    setVoltageValue(value);
    setLastModified('voltage');

    if (value === '' || isNaN(Number(value)) || Number(value) <= 0) {
      setDbValue('');
      setMathExplanation('');
      return;
    }

    const ratio = Number(value);
    const db = 20 * Math.log10(ratio);
    const dbResult = db.toFixed(6);
    setDbValue(dbResult);
    showMathExplanation(false, value, db);
  };

  const showMathExplanation = (fromDb, value, result) => {
    if (fromDb) {
      const db = Number(value);
      const ratio = result;
      const exponent = db / 20;
      
      const explanation = `Converting ${db} dB to Voltage Ratio:\n\nFormula: V₂/V₁ = 10^(dB/20)\nStep 1: Calculate exponent: ${db} ÷ 20 = ${exponent.toFixed(3)}\nStep 2: 10^${exponent.toFixed(3)} = ${ratio.toFixed(6)}\n\nResult: V₂/V₁ = ${ratio.toFixed(6)}`;
      setMathExplanation(explanation);
    } else {
      const ratio = Number(value);
      const db = result;
      const logValue = Math.log10(ratio);
      
      const explanation = `Converting ${ratio} V₂/V₁ to dB:\n\nFormula: dB = 20 × log₁₀(V₂/V₁)\nStep 1: Calculate log₁₀(${ratio}) = ${logValue.toFixed(6)}\nStep 2: 20 × ${logValue.toFixed(6)} = ${db.toFixed(6)}\n\nResult: dB = ${db.toFixed(6)}`;
      setMathExplanation(explanation);
    }
  };

  const clearAll = () => {
    setDbValue('');
    setVoltageValue('');
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
          <Text style={styles.title}>dB ⇄ Voltage Converter</Text>
        </View>
        
        {/* Main Converter Card */}
        <View style={styles.card}>
          {/* Decibels Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Decibels (dB)</Text>
            <TextInput
              style={styles.input}
              value={dbValue}
              onChangeText={handleDbChange}
              placeholder="Enter dB value..."
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={dismissKeyboard}
            />
          </View>

          {/* Conversion Indicator */}
          <View style={styles.conversionIndicator}>
            <Text style={styles.arrowIcon}>⇅</Text>
          </View>

          {/* Voltage Ratio Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Voltage Ratio (V₂/V₁)</Text>
            <TextInput
              style={styles.input}
              value={voltageValue}
              onChangeText={handleVoltageChange}
              placeholder="Enter voltage ratio..."
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={dismissKeyboard}
            />
          </View>

          {/* Clear Button */}
          {(dbValue || voltageValue) ? (
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
