const url = "/api/users";
const getUsers = () => {
  return fetch(url).then((response) => response.json());
};
export default { getUsers };
