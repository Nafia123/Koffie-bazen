import {requestOneTimePayment} from 'react-native-paypal';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {getCart} from './asyncStorageService';
import {REACT_APP_GATEWAY_TOKEN} from '@env';

const userUrl = 'https://tomcat.jordanvanbeijnhem.nl/payment';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': 'https://tomcat.jordanvanbeijnhem.nl',
};

const sandbox_token = `${REACT_APP_GATEWAY_TOKEN}`;

export async function paypalPayment(amount: string): Promise<boolean> {
  const {nonce, email} = await requestOneTimePayment(sandbox_token, {
    amount: amount, // required
    // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
    currency: 'EUR',
    // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
    localeCode: 'nl_NL',
    shippingAddressRequired: true,
    userAction: 'commit', // display 'Pay Now' on the PayPal review page
    // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
  }).catch((error) => {
    console.log('Request On time payment error  ' + error);
    Snackbar.show({
      text: 'Something went wrong : ' + error,
      duration: Snackbar.LENGTH_LONG,
    });
    return false;
  });

  return await postNonceToBackend(nonce, amount, email);
}

async function postNonceToBackend(
    nonce: string,
    amount: string,
    email: string,
): Promise<boolean> {
  var paymentSuccessful = false;
  await axios
      .post(userUrl, {nonce, amount}, {headers: headers})
      .then(async () => {
        Snackbar.show({
          text: 'Payment Successful',
          duration: Snackbar.LENGTH_LONG,
        });
        await saveTransaction(email, parseFloat(amount) * 100);
        paymentSuccessful = true;
      })
      .catch((error) => {
        paymentSuccessful = false;
        Snackbar.show({
          text: 'Something went wrong : ' + error,
          duration: Snackbar.LENGTH_LONG,
        });
      });

  return paymentSuccessful;
}

export async function saveTransaction(email: string, amount: number) {
  let cart = [];
  await getCart().then((value) => {
    cart = value;
  });
  await axios
      .post(userUrl + '/transaction', {cart, email, amount}, {headers: headers})
      .then(() => {
        console.log('Correctly Saved Transaction');
      })
      .catch((e) => {
        console.log("Couldn't save Transaction " + e.message);
      });
}
