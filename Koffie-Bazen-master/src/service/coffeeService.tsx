import axios from 'axios';

interface ICoffee {
  id: string;
  itemName: string;
  sellerName: string;
  sellerId: string;
  image: string;
  description: string;
  originLocation: string;
  farmer: string;
  height: string;
  washingProcess: string;
  options: object[];
}

const coffeeUrl = 'https://tomcat.jordanvanbeijnhem.nl/koffiechefs/coffees';
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': 'https://tomcat.jordanvanbeijnhem.nl',
};

export async function getCoffees() {
  return await axios.get<Array<ICoffee>>(coffeeUrl, {headers: headers});
}
