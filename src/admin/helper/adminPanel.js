import API from "../../backend";
import { isAuthenticated } from "../../auth/helper";

export const createCategory = (category) => {
  let { token, user } = isAuthenticated();

  return fetch(`${API}/category/create/${user._id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
       
      return response.json();
    })
    .catch((err) => console.log(err));
};
