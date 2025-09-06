# dB ⇄ Voltage Converter

A clean, modern web app for converting between decibels (dB) and voltage ratios. Perfect for audio engineers, electronics enthusiasts, and anyone working with signal processing.

## Features

- **Bidirectional Conversion**: Convert from decibels to voltage ratio and vice versa
- **Mobile-First Design**: Optimized for phone screens with responsive layout
- **Modern UI**: Clean, minimalist design with smooth animations
- **Real-time Results**: Instant conversion with proper number formatting
- **Step-by-Step Math**: Shows calculation steps and formulas used
- **PWA Support**: Can be installed on phones like a native app
- **Offline Functionality**: Works without internet connection
- **Mathematical Accuracy**: Uses the correct formulas from professional audio engineering

## Usage

1. **Convert dB to Voltage Ratio**:
   - Enter a decibel value in the top input field
   - See the corresponding voltage ratio (V₂/V₁) appear automatically
   - View step-by-step calculation in the math explanation box

2. **Convert Voltage Ratio to dB**:
   - Enter a voltage ratio in the bottom input field
   - See the corresponding decibel value appear automatically
   - View step-by-step calculation in the math explanation box

3. **Copy Results**: Click the copy button next to any value to copy it to clipboard

4. **Clear All**: Use the clear button to reset both fields

## Formulas Used

- **dB to Ratio**: V₂/V₁ = 10^(dB/20)
- **Ratio to dB**: dB = 20 × log₁₀(V₂/V₁)

## Common Values

- 0 dB = 1.000 V₂/V₁
- 6 dB = 1.995 V₂/V₁
- 12 dB = 3.981 V₂/V₁
- 20 dB = 10.000 V₂/V₁
- -6 dB = 0.501 V₂/V₁
- -12 dB = 0.251 V₂/V₁
- -20 dB = 0.100 V₂/V₁

## How to Run

### Web Version
Simply open `index.html` in any modern web browser. No server or installation required!

### PWA (Progressive Web App)
1. Open `index.html` in a web browser
2. Look for "Add to Home Screen" or "Install App" option
3. The app will be installed and work like a native app

### Local Development Server
```bash
npm run serve
# or
python3 -m http.server 8000
```

## Mobile App Development

### PWA Setup (Already Done)
- ✅ Web app manifest (`manifest.json`)
- ✅ Service worker for offline functionality (`sw.js`)
- ✅ App icons (generate with `generate-icons.html`)

### QR Code Testing (Working Solution)
1. **Get your local IP address**:
```bash
./get-ip.sh
```

2. **Start your local server**:
```bash
python3 -m http.server 8000
```

3. **Generate QR code**:
   - Open `qr-generator.html` in your browser
   - Enter your IP address (e.g., `http://192.168.68.103:8000`)
   - Click "Generate QR Code"

4. **Scan with your phone**:
   - Use your phone's camera to scan the QR code
   - Your dB converter app will open in the browser!
   - You can then "Add to Home Screen" for PWA installation

### Expo Setup (Alternative - May need additional configuration)
1. **Install dependencies**:
```bash
npm install --legacy-peer-deps
```

2. **Start Expo development server**:
```bash
./start-expo.sh
# or
npx @expo/cli@latest start --tunnel
```

3. **Scan QR code**:
   - Install "Expo Go" app on your phone
   - Scan the QR code that appears in terminal
   - Your app will load on your phone!

### Native App Setup with Capacitor

1. **Install dependencies**:
```bash
npm install
```

2. **Run setup script**:
```bash
./setup-capacitor.sh
```

3. **Generate app icons**:
   - Open `generate-icons.html` in a browser
   - Click "Generate Icons" and download all sizes
   - Place them in the `icons/` directory

4. **Build for iOS**:
```bash
npx cap open ios
# Opens Xcode - build and run from there
```

5. **Build for Android**:
```bash
npx cap open android
# Opens Android Studio - build and run from there
```

## Publishing to App Stores

### App Store (iOS)
1. Apple Developer Account ($99/year)
2. Build in Xcode
3. Upload to App Store Connect
4. Submit for review

### Google Play Store
1. Google Play Console ($25 one-time)
2. Build in Android Studio
3. Upload to Play Console
4. Submit for review

## Browser Compatibility

Works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Technical Details

- Pure HTML, CSS, and JavaScript
- Tailwind CSS for styling
- Lucide icons
- PWA with service worker
- Capacitor for native app conversion
- Responsive design optimized for mobile
- Input validation and error handling

