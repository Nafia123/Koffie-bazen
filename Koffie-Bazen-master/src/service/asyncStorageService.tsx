import AsyncStorage from '@react-native-async-storage/async-storage';

export async function addItemToCart(item) {
  try {
    const cart = await getCart();
    const newCart = processItemToCartArray(cart, item, 1);
    await setCart(newCart);
    return true;
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
    return error;
  }
}

export async function changeItemAmountOfCart(item, amount: number) {
  try {
    const cart = await getCart();
    const newCart = processItemToCartArray(cart, item, amount);
    await setCart(newCart);
    return true;
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
    return error;
  }
}

export async function getCart() {
  try {
    const cart = await AsyncStorage.getItem('cart');
    let parsedCart = JSON.parse(cart);

    if (!Array.isArray(parsedCart)) {
      parsedCart = [];
    }

    return parsedCart;
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
}

async function setCart(cartArray: []) {
  try {
    const cart = JSON.stringify(cartArray);
    await AsyncStorage.setItem('cart', cart);
    return true;
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
}

export function clearCart() {
  try {
    AsyncStorage.removeItem('cart');
  } catch (e) {
    console.log(e.message);
  }
}

function processItemToCartArray(cart, item, changeValueBy) {
  if (typeof item === 'object' && item !== null) {
    // Check if item already is in cart. index = -1 if not in cart yet.
    const existingItemIndex = cart.findIndex((cartItem) => {
      return (
        item.parent === cartItem.parent &&
        item.grind === cartItem.grind &&
        item.price === cartItem.price &&
        item.weight === cartItem.weight
      );
    });

    // increment amount by one or create amount property and set amount to 1
    if (existingItemIndex > -1) {
      cart[existingItemIndex].amount =
        cart[existingItemIndex].amount + changeValueBy;
      if (cart[existingItemIndex].amount === 0) {
        cart.splice(existingItemIndex, 1);
      }
    } else {
      item.amount = 1;
      cart.push(item);
    }
  }

  return cart;
}
