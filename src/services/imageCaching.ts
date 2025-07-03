import * as FileSystem from 'expo-file-system'; // To access device storage
import CryptoJS from 'crypto-js'; // To create unique filename from image URL

// Define a subfolder in the cache directory for storing images
const cacheDirectory = `${FileSystem.cacheDirectory}imageCache/`;

/**
 * Ensure the image cache directory exists.
 * Creates the folder if it doesn't exist already.
 */
const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(cacheDirectory);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(cacheDirectory, { intermediates: true });
  }
};

/**
 * downloadAndCacheImage
 * ---------------------
 * Downloads an image from a remote URL, stores it in cache, and returns the local URI.
 * If the image already exists in cache, it directly returns the cached URI.
 *
 * @param uri - The remote image URL
 * @returns The local cached URI or null if download fails
 */
export const downloadAndCacheImage = async (uri: string): Promise<string | null> => {
  // Generate a unique filename based on the URL using SHA256 hash
  const filename = CryptoJS.SHA256(uri).toString();
  const localUri = `${cacheDirectory}${filename}`;

  await ensureDirExists(); // Ensure folder exists

  const fileInfo = await FileSystem.getInfoAsync(localUri);
  if (fileInfo.exists) return localUri; // Return cached image if already present

  try {
    // Download the image and save it to local cache
    await FileSystem.downloadAsync(uri, localUri);
    return localUri;
  } catch {
    return null; // If download fails, return null
  }
};
