import axios from 'axios';

interface IUser {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const userUrl = 'https://tomcat.jordanvanbeijnhem.nl/koffiechefs/users';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': 'https://tomcat.jordanvanbeijnhem.nl',
};

export function createUser(user: IUser): Promise<number> {
  return axios
    .post(userUrl, user, {headers: headers})
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.log(error.response.status);
      return error.response.status;
    });
}
