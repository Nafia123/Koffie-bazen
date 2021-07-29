import React, {Component} from 'react';
import {Divider, Title} from '../atoms/components';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as paymentService from '../../service/paymentService';
import {NavigationScreenProp} from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartContainer from '../screens/cartContainer';
import {clearCart} from '../../service/asyncStorageService';

const DEVICE_WIDTH = Dimensions.get('window').width;
const BORDER_RADIUS = 5;
const WIDTH = DEVICE_WIDTH - 40;
const INPUT_FIELD_HEIGHT = 50;

const styles = StyleSheet.create({
  inputField: {
    height: INPUT_FIELD_HEIGHT,
    backgroundColor: '#ffffff',
    borderColor: '#dbdbdb',
    borderBottomWidth: 1,
    borderRadius: BORDER_RADIUS,
    width: WIDTH,
    marginHorizontal: 20,
    marginTop: 10,
    paddingLeft: 40,
  },
  basketWrapper: {
    marginHorizontal: -4,
  },
  image: {
    width: 150,
    height: 38,
  },

  button: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3B53C',
    color: '#FFFFFF',
    height: INPUT_FIELD_HEIGHT,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    zIndex: 100,
    marginLeft: '5%',
    marginTop: 10,
  },
  disabledButton: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9b7829',
    color: '#FFFFFF',
    height: INPUT_FIELD_HEIGHT,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    zIndex: 100,
    marginLeft: '5%',
    marginTop: 10,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  totalPriceText: {
    textAlignVertical: 'center',
    fontFamily: 'OpenSans-Regular',
  },
});

interface IProps {
  navigation: NavigationScreenProp<any>;
}

export default class Basket extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      disabledButton: true,
      totalAmount: undefined,
    };
    this.handlePayment = this.handlePayment.bind(this);
  }

  amount = '10458';

  componentDidMount() {
    this.reloadCart();
    // https://reactnavigation.org/docs/function-after-focusing-screen/#triggering-an-action-with-a-focus-event-listener
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.reloadCart();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }

  // Used to (re)calculate the total price of all items combined in the cart
  calculateTotalPrice() {
    const cart = this.state.cart;

    if (!Array.isArray(cart)) {
      this.setState({totalAmount: 0});
      return;
    }

    let newTotalPrice = 0;

    for (const cartItem of cart) {
      const itemPrice = cartItem.price;
      const itemAmount = cartItem.amount;

      newTotalPrice += itemPrice * itemAmount;
    }

    this.amount = toString(newTotalPrice);
    this.setState({
      totalAmount: newTotalPrice,
    });

    this.setState({totalAmount: newTotalPrice});
  }

  // Gets cart from device's localstorage
  getCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      return cart !== null ? JSON.parse(cart) : null;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  // Gets the cart from localstorage and calculates the total amount of the price
  reloadCart = () => {
    this.getCart().then((cart) =>
      this.setState({cart: cart}, () => {
        this.calculateTotalPrice();
      }),
    );
  };

  render() {
    const priceFormat = (this.state.totalAmount / 100).toFixed(2);
    return (
      <ScrollView style={styles.basketWrapper}>
        <Title>Winkelmand</Title>
        <Divider />
        <CartContainer
          cart={this.state.cart}
          cart2={this.props.params}
          onUpdate={() => this.reloadCart()}
        />
        <View style={styles.totalPriceContainer}>
          <Title style={styles.totalPriceText}>Totale Prijs:</Title>
          <Title>€{priceFormat}</Title>
        </View>
        <TouchableOpacity
          style={this.state.totalAmount ? styles.button : styles.disabledButton}
          disabled={!this.state.totalAmount}
          onPress={async () => {
            this.setState(() => (this.state.loading = true));
            this.handlePayment();
          }}>
          {this.state.loading ? (
            <ActivityIndicator
              animating={this.state.loading}
              size="large"
              color="#0000ff"
            />
          ) : (
            <Image
              source={{
                uri:
                  'https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_200x51.png',
              }}
              style={styles.image}
            />
          )}
        </TouchableOpacity>
      </ScrollView>
    );
  }

  handlePayment = () => {
    this.setState(() => (this.state.disabledButton = true));

    paymentService
      .paypalPayment(String(parseFloat(this.state.totalAmount / 100)))
      .then((paymentSuccessful) => {
        this.setState(() => (this.state.loading = false));
        this.setState(() => (this.state.disabledButton = false));
        if (paymentSuccessful) {
          this.setState(() => clearCart());
          this.setState(() => (this.state.totalAmount = 0));
          this.setState(() => (this.state.cart = []));
        }
      })
      .catch((error) => {
        console.log('Payment went wrong ' + error.message);
        this.setState(() => (this.state.loading = false));
        this.setState(() => (this.state.disabledButton = false));
      });
  };
}
