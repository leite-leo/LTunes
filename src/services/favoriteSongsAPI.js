import { getUser } from './userAPI';

const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

const readFavoriteSongs = async () => {
  const userData = await getUser();
  console.log('userData:: ', userData.favoriteSongs);
  return userData.favoriteSongs;
};

const saveFavoriteSongs = async (favoriteSongs) => {
  const userData = await getUser();
  const newUserData = {
    name: userData.name,
    email: userData.email,
    image: userData.image,
    description: userData.description,
    favoriteSongs,
  };
  localStorage.setItem(userData.name, JSON.stringify(newUserData));
};

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso futuramente.
// --------------------------------------------------------------------

export const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getFavoriteSongs = () => new Promise(async (resolve) => {
  const favoriteSongs = await readFavoriteSongs();
  simulateRequest(favoriteSongs)(resolve);
});

export const addSong = (song) => new Promise((resolve) => {
  if (song) {
    const favoriteSongs = readFavoriteSongs();
    saveFavoriteSongs(favoriteSongs);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeSong = (song) => new Promise(async (resolve) => {
  const favoriteSongs = await readFavoriteSongs();
  saveFavoriteSongs(favoriteSongs.filter((s) => s.trackId !== song.trackId));
  simulateRequest(SUCCESS_STATUS)(resolve);
});
