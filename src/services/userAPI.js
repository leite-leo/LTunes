const TIMEOUT = 1500;
const SUCCESS_STATUS = 'OK';

export const readLoggedUser = () => JSON.parse(localStorage.getItem('loggedUser'));
export const readUser = (user) => JSON.parse(localStorage.getItem(user));
const saveUser = (user) => localStorage.setItem(user.name, JSON.stringify(user));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso mais futuramente
// --------------------------------------------------------------------

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getUser = () => new Promise((resolve) => {
  const loggedUser = readLoggedUser();
  let user = readUser(loggedUser);
  if (user === null) {
    user = {};
  }
  simulateRequest(user)(resolve);
});

export const createUser = (user) => new Promise((resolve) => {
  const emptyUser = {
    name: user,
    email: '',
    image: 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png',
    description: '',
    favoriteSongs: [],
  };
  saveUser({ ...emptyUser });
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const updateUser = (updatedUser) => new Promise((resolve) => {
  saveUser({ ...updatedUser });
  simulateRequest(SUCCESS_STATUS)(resolve);
});
