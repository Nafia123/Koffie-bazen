import React, {Component, CSSProperties} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

import styled from 'styled-components';
import * as globalStyles from '../../../src/styles/variables';

import {
  ItemPrice,
  StoreItemDescription,
  StoreItemImage,
} from '../atoms/components';

const dummyProduct5 = require('../../assets/images/dummy_items/dummy-product-5.jpg');

const styles = StyleSheet.create({
  storeItemContainer: {
    flexGrow: 1,
    padding: 12,
    minWidth: 120,
    width: 180,
    borderRadius: 6,
  },
  tableColumnsWrapper: {
    flexDirection: 'row',
    marginTop: 8,
  },
  leftTableContainer: {
    flexDirection: 'column',
    paddingRight: 16,
  },
  rightTableContainer: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  columnItemText: {
    marginVertical: 2,
  },
});

const UnselectedItemSelectionOptionButton = styled(TouchableHighlight)`
  padding: 8px;
  margin-horizontal: 12px;
  margin-vertical: 6px;
  margin-left: 0px;

  border: 1px solid ${globalStyles.primaryAppColor};
  border-radius: 6px;
  border-radius: 6px;
  align-self: flex-start;
`;

const SelectedItemSelectionOptionButton = styled(
  UnselectedItemSelectionOptionButton,
)`
  border-color: ${globalStyles.selectedItemColor};
  background-color: ${globalStyles.selectedItemColorBackground};
`;

const ItemSelectionOptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

interface IStoreItemProps {
  itemName: string;
  sellerName: string;
  image?: Image;
  style?: CSSProperties;
  navigation: any;
}

interface IQuizAnswerProps {
  itemName: string;
  sellerName: string;
  answer: string;
  image?: Image;
  style?: CSSProperties;
  // TODO: change to suitable type
  navigation: any;
}

// TODO: Fix Array type
function getPriceAnnotation(options: Array) {
  // Get the lowest price. https://stackoverflow.com/a/31844649
  let lowestPrice = options.reduce((prev, curr) =>
    prev.price > curr.price ? curr.price : prev.price,
  );

  // Get the highest price. https://stackoverflow.com/a/31844649
  let highestPrice = options.reduce((prev, curr) =>
    prev.price > curr.price ? prev.price : curr.price,
  );

  // Convert price in cents price to euro's
  lowestPrice = lowestPrice / 100;
  highestPrice = highestPrice / 100;

  return lowestPrice !== highestPrice
    ? `€${lowestPrice} - €${highestPrice}`
    : `€${lowestPrice}`;
}

export class StoreItem extends Component<IStoreItemProps, any> {
  public render() {
    const {
      itemName,
      sellerName,
      image,
      options,
      style,
      navigation,
    } = this.props;

    let priceAnnotation = getPriceAnnotation(options);

    const itemImage = image || dummyProduct5;

    return (
      <TouchableHighlight
        style={[styles.storeItemContainer, style]}
        underlayColor="rgba(0, 0, 0, 0.05)"
        onPress={() => {
          navigation.navigate('StoreItemDetailPage', {
            ...this.props,
          });
        }}>
        <View>
          <StoreItemImage image={itemImage} style={styles.itemImage} />
          <StoreItemDescription fontWeight="Bold" title={itemName} />
          <StoreItemDescription title={sellerName} />
          <ItemPrice>{priceAnnotation}</ItemPrice>
        </View>
      </TouchableHighlight>
    );
  }
}

export class QuizButton extends Component<IQuizAnswerProps, any> {
  public render() {
    const {
      id,
      itemName,
      sellerName,
      image,
      options,
      style,
      answer,
      navigation,
    } = this.props;

    return (
        <Button title={answer} onPress={() => {
          navigation.navigate('StoreItemDetailPage', {
            ...this.props,
          })
        }}/>
    );
  }
}

export class ItemPropertiesTable extends Component<any, any> {
  public render() {
    const {originLocation, farmer, height, washingProcess} = this.props;

    return (
      <View style={styles.tableColumnsWrapper}>
        <View style={styles.leftTableContainer}>
          {farmer && <LeftColumnItem title={'Boer'} />}
          {originLocation && <LeftColumnItem title={'Afkomst'} />}
          {height && <LeftColumnItem title={'Hoogte'} />}
          {washingProcess && <LeftColumnItem title={'Wasproces'} />}
        </View>
        <View style={styles.rightTableContainer}>
          {farmer && <RightColumnItem title={farmer} />}
          {originLocation && <RightColumnItem title={originLocation} />}
          {height && <RightColumnItem title={height} />}
          {washingProcess && <RightColumnItem title={washingProcess} />}
        </View>
      </View>
    );
  }
}

export class LeftColumnItem extends Component<any, any> {
  public render() {
    const {title} = this.props;

    return (
      <StoreItemDescription
        style={styles.columnItemText}
        fontWeight="Light"
        title={title}
      />
    );
  }
}

export class RightColumnItem extends Component<any, any> {
  public render() {
    const {title} = this.props;

    return (
      <StoreItemDescription
        style={styles.columnItemText}
        fontWeight="SemiBold"
        title={title}
      />
    );
  }
}

export class BeanTypeSelection extends Component<any, any> {
  render() {
    return (
      <ItemSelectionOptionsContainer>
        {this.props.options.map((data, key) => {
          return (
            <ItemSelectionOption
              title={data}
              onClick={this.props.onClick.bind(this, data)}
              itemKey={key}
              // Check if current object matches checked key value
              checked={data === this.props.checked}
            />
          );
        })}
      </ItemSelectionOptionsContainer>
    );
  }
}

export class WeightSelection extends Component<any, any> {
  render() {
    return (
      <ItemSelectionOptionsContainer>
        {this.props.options.map((data, key) => {
          return (
            <ItemSelectionOption
              title={data + ' gram'}
              onClick={this.props.onClick.bind(this, data)}
              itemKey={key}
              // Check if current object matches checked key value
              checked={data === this.props.checked}
            />
          );
        })}
      </ItemSelectionOptionsContainer>
    );
  }
}

export class ItemSelectionOption extends Component<any, any> {
  public render() {
    return this.props.checked ? (
      <SelectedItemSelectionOptionButton>
        <StoreItemDescription title={this.props.title} />
      </SelectedItemSelectionOptionButton>
    ) : (
      <UnselectedItemSelectionOptionButton
        onPress={() => {
          this.props.onClick(this.props.itemKey);
        }}
        underlayColor={globalStyles.itemPressColorBackground}>
        <StoreItemDescription title={this.props.title} />
      </UnselectedItemSelectionOptionButton>
    );
  }
}
