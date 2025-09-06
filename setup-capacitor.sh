#!/bin/bash

echo "Setting up Capacitor for dB Voltage Converter..."

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Initialize Capacitor
echo "Initializing Capacitor..."
npx cap init "dB Voltage Converter" "com.yourname.dbvoltageconverter"

# Add platforms
echo "Adding iOS platform..."
npx cap add ios

echo "Adding Android platform..."
npx cap add android

# Sync the project
echo "Syncing project..."
npx cap sync

echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Generate proper app icons and place them in the icons/ directory"
echo "2. Update the app ID in capacitor.config.ts if needed"
echo "3. Run 'npx cap open ios' to open in Xcode"
echo "4. Run 'npx cap open android' to open in Android Studio"
echo ""
echo "For PWA testing, run 'npm run serve' and visit http://localhost:8000"
