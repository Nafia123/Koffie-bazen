import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Divider, Paragraph, Subtitle, Title} from '../atoms/components';
import {GapSize, VerticalGap} from '../atoms/blankGaps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {changeItemAmountOfCart} from '../../service/asyncStorageService';

const styles = StyleSheet.create({
  cartContainer: {
    paddingHorizontal: 10,
  },
  cartContainerContainer: {
    marginHorizontal: 2,
  },
  cartItemText: {
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  sellerNameText: {
    textAlign: 'left',
    textAlignVertical: 'center',
    fontFamily: 'OpenSans-Regular',
  },
  cartItemPriceTotalText: {
    textAlign: 'right',
    flex: 4,
    textAlignVertical: 'center',
  },
  amountEditButtonLeft: {
    marginHorizontal: 6,
    width: 35,
    borderRadius: 6,
    borderColor: 'black',
    borderWidth: 1,
    borderRightWidth: 0,
    padding: 6,
  },
  amountEditButtonRight: {
    marginHorizontal: 6,
    width: 35,
    borderRadius: 6,
    borderColor: 'black',
    borderWidth: 1,
    borderLeftWidth: 0,
    padding: 6,
  },
  deleteButton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
  amountEditText: {
    textAlign: 'center',
    height: 16,
  },
  amountEditContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountText: {
    textAlign: 'center',
    marginHorizontal: 6,
    width: 35,
    borderRadius: 6,
    borderColor: 'black',
    borderWidth: 1,
    padding: 6,
  },
  amountNumberContainer: {
    marginHorizontal: -10,
    width: 35,
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
  },
});

export default class CartContainer extends Component<any, ICartContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      cart: undefined,
    };
  }

  render() {
    let {cart, onUpdate} = this.props;
    let basketItems;

    if (Array.isArray(cart)) {
      basketItems = cart.map((cartItem) => (
        <CartItem
          key={
            cartItem.parent + cartItem.grind + cartItem.weight + cartItem.price
          }
          cart={cartItem}
          onUpdate={onUpdate}
        />
      ));
    }
    return (
      <>
        <View style={styles.cartContainer}>{basketItems}</View>
      </>
    );
  }
}

class CartItem extends Component<any, any> {
  handleAmountIncrement = async (item) => {
    const INCREMENT_AMOUNT = 1;
    await changeItemAmountOfCart(item, INCREMENT_AMOUNT);
    this.props.onUpdate();
  };
  handleAmountDecrement = async (item) => {
    const DECREMENT_AMOUNT = -1;
    await changeItemAmountOfCart(item, DECREMENT_AMOUNT);
    this.props.onUpdate();
  };

  handleDeleteCartItem = async (item) => {
    const DECREMENT_AMOUNT = item.amount * -1;
    await changeItemAmountOfCart(item, DECREMENT_AMOUNT);
    this.props.onUpdate();
  };

  render() {
    const {cart} = this.props;
    const {itemName, sellerName, amount, grind, weight} = this.props.cart;
    let {price} = this.props.cart;

    const totalPrice = ((price * amount) / 100).toFixed(2);
    // Get the price with decimals of selected item
    price = (price / 100).toFixed(2);

    return (
      <>
        <View style={styles.cartContainerContainer}>
          <Subtitle style={styles.cartItemText}>{itemName}</Subtitle>
          <Paragraph style={styles.sellerNameText}>{sellerName}</Paragraph>
          <View style={styles.infoContainer}>
            <Paragraph style={styles.cartItemText}>{grind}</Paragraph>
            <Paragraph style={styles.cartItemText}>{weight} gram</Paragraph>
            <Paragraph style={styles.cartItemText}>€{price}</Paragraph>
          </View>

          <VerticalGap size={GapSize.Small} />
          <View style={styles.amountEditContainer}>
            <Paragraph style={styles.cartItemText}>Aantal: </Paragraph>

            <TouchableOpacity
              style={styles.amountEditButtonLeft}
              onPress={() => this.handleAmountDecrement(cart)}>
              <Text style={styles.amountEditText}>-</Text>
            </TouchableOpacity>
            <View style={styles.amountNumberContainer}>
              <Text style={styles.amountEditText}>{amount}</Text>
            </View>
            <TouchableOpacity
              style={styles.amountEditButtonRight}
              onPress={() => this.handleAmountIncrement(cart)}>
              <Text style={styles.amountEditText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleDeleteCartItem(cart)}>
              <MaterialIcons
                style={styles.deleteButton}
                name={'delete'}
                size={20}
                color={'darkred'}
              />
            </TouchableOpacity>

            <Paragraph style={styles.cartItemPriceTotalText}>
              Totaal: €{totalPrice}
            </Paragraph>
          </View>
        </View>
        <Divider style={{width: '95%'}} />
      </>
    );
  }
}
