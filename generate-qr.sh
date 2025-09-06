#!/bin/bash

echo "Generating QR codes for dB Converter app..."

# Get local IP
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
LOCAL_URL="http://$LOCAL_IP:8000"

echo "Local URL: $LOCAL_URL"

# Generate QR code for local network
qrencode -o qr-local.png "$LOCAL_URL"
echo "✅ Generated qr-local.png for local network"

# Generate QR code for localhost
qrencode -o qr-localhost.png "http://localhost:8000"
echo "✅ Generated qr-localhost.png for localhost"

# Generate QR code for any network (if you have ngrok or similar)
# qrencode -o qr-public.png "https://your-public-url.ngrok.io"
# echo "✅ Generated qr-public.png for public access"

echo ""
echo "QR codes generated! You can now:"
echo "1. Scan qr-local.png with your phone (if on same WiFi)"
echo "2. Use qr-localhost.png for local testing"
echo "3. Open simple-qr.html in browser for interactive QR generation"
echo ""
echo "Your dB Converter app URL: $LOCAL_URL"
