// Importing FileSystem API from Expo for file operations
import * as FileSystem from 'expo-file-system';

// Define the permanent directory path inside the app's document storage
const permanentImageDir = `${FileSystem.documentDirectory}images/`;

/**
 * Ensures that the permanent image directory exists.
 * If it doesn't, it creates the directory.
 */
const ensureDirExists = async () => {
  // Get info about the directory (whether it exists or not)
  const dirInfo = await FileSystem.getInfoAsync(permanentImageDir);

  // If directory doesn't exist, create it (with intermediate folders if needed)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(permanentImageDir, { intermediates: true });
  }
};

/**
 * Copies a temporary image file (e.g., from ImagePicker or Manipulator)
 * to the app's internal permanent image directory.
 *
 * @param tempUri The temporary URI of the image file
 * @returns The new URI of the copied image in app storage
 */
export const copyImageToAppDir = async (tempUri: string): Promise<string> => {
  // Step 1: Make sure the 'images/' directory exists
  await ensureDirExists();

  // Step 2: Extract the filename from the URI (e.g., 'abc.png' from 'file:///.../abc.png')
  const filename = tempUri.split('/').pop();

  // Step 3: Define the new permanent path for the image
  const permanentUri = permanentImageDir + filename;

  // Step 4: Copy the file from the temporary location to the new permanent path
  await FileSystem.copyAsync({ from: tempUri, to: permanentUri });

  // Step 5: Return the new URI so it can be used in the app
  return permanentUri;
};
