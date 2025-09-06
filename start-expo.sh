#!/bin/bash

echo "Starting Expo development server..."
echo "This will generate a QR code for testing your app on mobile devices."
echo ""
echo "Make sure you have:"
echo "1. Expo Go app installed on your phone"
echo "2. Your phone and computer on the same network"
echo ""

# Start Expo with tunnel for QR code
npx @expo/cli@latest start --tunnel
