#!/bin/bash

echo "Getting your local IP address for QR code..."

# Get the local IP address
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)

if [ -z "$LOCAL_IP" ]; then
    echo "Could not determine local IP address"
    echo "Using localhost instead"
    LOCAL_IP="localhost"
fi

echo "Your local IP address is: $LOCAL_IP"
echo "QR Code URL: http://$LOCAL_IP:8000"
echo ""
echo "To generate QR code:"
echo "1. Open qr-generator.html in your browser"
echo "2. Enter: http://$LOCAL_IP:8000"
echo "3. Click 'Generate QR Code'"
echo "4. Scan with your phone!"
echo ""
echo "Make sure your Python server is running:"
echo "python3 -m http.server 8000"
