#!/bin/bash

echo "Setting up Expo for dB Voltage Converter..."

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Install Expo CLI globally if not already installed
echo "Installing Expo CLI..."
npm install -g @expo/cli

# Create a simple placeholder icon if none exists
if [ ! -f "icons/icon-512x512.png" ]; then
    echo "Creating placeholder icon..."
    mkdir -p icons
    
    # Create a simple SVG icon and convert to PNG (requires ImageMagick)
    cat > icons/icon.svg << 'EOF'
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#3b82f6"/>
  <rect x="64" y="64" width="384" height="384" fill="white" rx="32"/>
  <rect x="96" y="96" width="320" height="64" fill="#3b82f6" rx="16"/>
  <text x="256" y="350" font-family="Arial, sans-serif" font-size="80" font-weight="bold" text-anchor="middle" fill="#3b82f6">dB</text>
</svg>
EOF

    # Try to convert SVG to PNG (requires ImageMagick or similar)
    if command -v convert &> /dev/null; then
        convert icons/icon.svg icons/icon-512x512.png
        convert icons/icon.svg -resize 192x192 icons/icon-192x192.png
        echo "Icons created successfully!"
    else
        echo "ImageMagick not found. Please install it or use generate-icons.html to create icons."
        echo "You can install ImageMagick with: brew install imagemagick"
    fi
fi

echo "Expo setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure you have app icons in the icons/ directory"
echo "2. Run 'npm run expo:start' to start the Expo development server"
echo "3. Scan the QR code with Expo Go app on your phone"
echo "4. Or run 'npm run expo:web' to test in browser"
echo ""
echo "To generate QR code:"
echo "npm run expo:start"
