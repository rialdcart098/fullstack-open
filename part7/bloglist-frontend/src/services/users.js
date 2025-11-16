const url = import.meta.env.VITE_BACKEND_URL + "/api/users";
const getUsers = () => {
  return fetch(url).then((response) => response.json());
};
export default { getUsers };
