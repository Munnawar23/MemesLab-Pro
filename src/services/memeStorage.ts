import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meme } from '@interfaces/index';

const MEMES_STORAGE_KEY = '@MemeApp:memes';

// type for creating a new meme
type NewMemeData = {
  imageUri: string;
};

/**
 * Get all saved memes from AsyncStorage
 * sorted by newest first
 */
export const getMemes = async (): Promise<Meme[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(MEMES_STORAGE_KEY);
    const memes = jsonValue ? JSON.parse(jsonValue) : [];
    return memes
      .filter((meme: any) => meme.createdAt) // remove invalid memes
      .sort((a: Meme, b: Meme) => b.createdAt - a.createdAt); // newest first
  } catch {
    return []; // if any error, return empty
  }
};

/**
 * Save an array of memes into AsyncStorage
 */
const setMemes = async (memes: Meme[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(MEMES_STORAGE_KEY, JSON.stringify(memes));
  } catch {
    // silently fail
  }
};

/**
 * Add a new meme to storage
 */
export const saveMeme = async (data: NewMemeData): Promise<void> => {
  const existingMemes = await getMemes();

  const newMeme: Meme = {
    imageUri: data.imageUri,
    id: Date.now().toString(),       // unique id
    createdAt: Date.now(),          // timestamp
    isFavorite: false,             // default favorite status
  };

  await setMemes([newMeme, ...existingMemes]);
};

/**
 * Delete a meme by its id
 */
export const deleteMeme = async (id: string): Promise<void> => {
  const existingMemes = await getMemes();
  await setMemes(existingMemes.filter(meme => meme.id !== id));
};

/**
 * Toggle the 'isFavorite' flag for a meme
 */
export const toggleFavoriteStatus = async (id: string): Promise<void> => {
  const existingMemes = await getMemes();

  const updatedMemes = existingMemes.map(meme =>
    meme.id === id
      ? { ...meme, isFavorite: !meme.isFavorite }
      : meme
  );

  await setMemes(updatedMemes);
};
