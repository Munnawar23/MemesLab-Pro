# 🎨 MEMESLAB PRO — MOBILE APP  
Built using React Native (Expo) + TypeScript

Branch: 👉 All development happens in the `dev` branch.

## 📱 CORE FEATURES

- Pick an image (gallery or camera)
- Add meme text or stickers
- Edit & manipulate image (crop, rotate, scale)
- Share memes with friends (native share)
- View saved memes
- Mark memes as favorite ❤️
- Delete memes 🗑️
- Works offline — detects connection (NetInfo)
- Smooth animations with Lottie
- Fun 90s retro look & feel
- Fast & optimized

## 🏗️ TECH STACK & TOOLS

- Framework: React Native (Expo)
- Navigation: @react-navigation/native
- Image Picker: expo-image-picker
- Image Manipulation: expo-image-manipulator
- View Capture: react-native-view-shot
- Offline Detection: @react-native-community/netinfo
- Sharing: expo-sharing
- Storage: @react-native-async-storage/async-storage
- File Access: expo-file-system
- Animations: lottie-react-native

## 🧠 HOW THE APP WORKS

### 1️⃣ Home Screen  
- User selects an image:
  - 📁 From device gallery (ImagePicker)
  - 📷 Take a new photo (camera)
- Navigates to editor with selected image  

### 2️⃣ Editor Screen  
- Add meme text, stickers, or drawings
- Manipulate the image (crop, rotate, etc.)
- On save: captures the edited image & stores it locally  

### 3️⃣ My Memes Screen  
- Displays saved memes in a gallery  
- Tapping a meme lets you:
  - Toggle favorite ❤️
  - Share 📤
  - Delete 🗑️

### 4️⃣ Favorites Screen  
- Shows only favorite memes
- You can un-favorite from here

### 5️⃣ Offline Banner  
- Shows at the top when there’s no internet connection (via NetInfo)

## 📁 STORAGE STRUCTURE
Each meme is saved as an object:
{
  "id": "string",
  "imageUri": "string",
  "isFavorite": true
}

### Storage Helpers:
- saveMeme()
- getMemes()
- deleteMeme()
- toggleFavorite()

## 🌈 THEMES & LOOK
- 90s retro inspired design  
- Smooth Lottie animations  
- Optimized for fast performance

## 🖼️ REQUIRED ASSETS (in `src/assets`)
- icon.png — App icon
- splash.png — Splash screen
- adaptive-icon.png — Android adaptive icon
- favicon.png — Web favicon

## 📦 HOW TO RUN LOCALLY

git clone https://github.com/yourusername/memeslab-pro.git
cd memeslab-pro
git checkout dev
npm install
npx expo start

## 👤 DEVELOPER INFO  
Munnawar Hussain  
GitHub: https://github.com/Munnawar23  
LinkedIn: https://linkedin.com/in/munnawar-hussain-aa544b227  
Email: munawwarh48@gmail.com
