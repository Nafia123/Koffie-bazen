import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  BackButtonChevron,
  ItemPrice,
  PrimaryButton,
  StoreItemDescription,
  StoreItemImage,
} from '../atoms/components';
import {GapSize, VerticalGap} from '../atoms/blankGaps';
import {addItemToCart} from '../../service/asyncStorageService';
import {
  BeanTypeSelection,
  ItemPropertiesTable,
  WeightSelection,
} from '../molecules/storeItems';
import {SmallHeaderLogo} from '../molecules/headers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  itemDetailPageContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 2,
  },
  addToCartContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    maxHeight: 200,
  },
});

interface IStoreItemDetailPageState {
  selectedWeight?: number;
  selectedBeanGrind?: string;
  selectedItem?: {
    parent: string;
    grind: string;
    price: number;
    weight: number;
  };
  selectedItemPrice?: any;
}

export default class StoreItemDetailPage extends Component<
  any,
  IStoreItemDetailPageState
> {
  constructor(props) {
    super(props);
    this.state = {
      // Initial selected weight or bean grind option
      selectedWeight: undefined,
      selectedBeanGrind: undefined,
      selectedItem: undefined,
      selectedItemPrice: undefined,
    };
    // Need to determine "this" in the method calls
    this.handleWeightOptionChange = this.handleWeightOptionChange.bind(this);
    this.handleBeanGrindOptionChange = this.handleBeanGrindOptionChange.bind(
      this,
    );
  }

  // Return an array with only the kind of grinds that are available
  getAllGrindOptions = (options) => {
    let kindOfGrindOptions = options.map(function (item) {
      return item.grind;
    });

    // Filter out duplicates https://stackoverflow.com/a/9229821/11119707. It is an O(n^2) solution!!!
    return [...new Set(kindOfGrindOptions)];
  };

  // Return an array with only the kind of grinds that are available
  getAllBeanWeights = (options) => {
    const selectedBeanGrind = this.state.selectedBeanGrind;

    // Filter out the options that don't match the selected grind type
    const relevantBeanWeightOptions = options.filter(function (item) {
      return (
        selectedBeanGrind === item.grind || selectedBeanGrind === undefined
      );
    });

    // Make an array containing only the weights
    let filteredOptions = relevantBeanWeightOptions.map(function (item) {
      return item.weight;
    });

    // Filter out duplicates https://stackoverflow.com/a/9229821/11119707
    return [...new Set(filteredOptions)];
  };

  // Handle when a different type of bean type was selected
  handleBeanGrindOptionChange = (key) => {
    this.setState({selectedBeanGrind: key}, () => {
      this.verifySelection();
    });
  };

  // Handle when a different type of weight was selected
  handleWeightOptionChange = (key) => {
    this.setState({selectedWeight: key}, () => {
      this.updateSelectionPrice();
    });
  };

  // Checks if the combination between the bean grind type and the weight exists
  verifySelection = () => {
    const allOptions = this?.props?.route?.params?.options;
    const selectedBeanGrind = this.state.selectedBeanGrind;
    const selectedWeight = this.state.selectedWeight;

    const selectionCombination = allOptions.find((item) => {
      return item.grind === selectedBeanGrind && item.weight === selectedWeight;
    });

    if (selectionCombination === undefined) {
      this.setState({selectedWeight: undefined}, () => {
        this.updateSelectionPrice();
      });
    } else {
      this.updateSelectionPrice();
    }
  };

  // Get the current key of the selected item and fetch the matching price
  updateSelectionPrice = () => {
    const {itemName, sellerName, image, options} = this.props.route.params;

    const selectedBeanGrind = this.state.selectedBeanGrind;
    const selectedWeight = this.state.selectedWeight;

    // If both options are selected figure out the price and set state, otherwise reset price state
    if (selectedBeanGrind !== undefined && selectedWeight !== undefined) {
      // Find the selected object combination based on the selected grind type and weight
      const selectedOptionCombination = options.find((item) => {
        return (
          item.grind === selectedBeanGrind && item.weight === selectedWeight
        );
      });

      // Add the necessary properties that need to be displayed in the basket screen
      selectedOptionCombination.itemName = itemName;
      selectedOptionCombination.sellerName = sellerName;
      selectedOptionCombination.image = image;

      // Get the price with decimals of selected item
      const priceOfCombination = (
        selectedOptionCombination?.price / 100
      ).toFixed(2);

      this.setState({
        selectedItem: selectedOptionCombination,
        selectedItemPrice: priceOfCombination,
      });
    } else {
      this.setState({
        selectedItemPrice: undefined,
        selectedItem: undefined,
      });
    }
  };

  // Handle when a different type of weight was selected
  handleAddToCart = async (item) => {
    await addItemToCart(item);

    // Notify parent of cart update
    this.props.route.params.cartUpdate();
  };

  setCart = async (cartArray: []) => {
    try {
      const cart = JSON.stringify(cartArray);
      await AsyncStorage.setItem('cart', cart);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  public render() {
    const {
      itemName,
      sellerName,
      image,
      description,
      // "options": [
      //    {"parent":"gdEL8YHW1Xyzg0kLC7JL","grind":"Espresso Fijn","price":1495,"weight":500},
      //    {"parent":"gdEL8YHW1Xyzg0kLC7JL","grind":"Espresso Fijn","price":750,"weight":250}
      // ]}
      options,
    } = this.props.route.params;

    const kindOfGrinds = this.getAllGrindOptions(options);
    const beanWeights = this.getAllBeanWeights(options);

    return (
      <>
        <SmallHeaderLogo />
        <ScrollView style={styles.itemDetailPageContainer}>
          <BackButtonChevron title="Terug" navigation={this.props.navigation} />
          <StoreItemImage image={image} style={styles.itemImage} />
          <VerticalGap size={GapSize.ExtraSmall} />
          <StoreItemDescription fontWeight="Bold" title={itemName} />
          <VerticalGap size={GapSize.ExtraSmall} />
          <StoreItemDescription fontWeight="Light" title={sellerName} />
          <VerticalGap size={GapSize.ExtraSmall} />
          <StoreItemDescription title={description} />
          <VerticalGap size={GapSize.Small} />
          <StoreItemDescription fontWeight="Bold" title={'Eigenschappen'} />
          <ItemPropertiesTable {...this.props.route.params} />
          <VerticalGap size={GapSize.Medium} />
          <StoreItemDescription fontWeight="Bold" title={'Maling'} />
          <BeanTypeSelection
            options={kindOfGrinds}
            checked={this.state.selectedBeanGrind}
            onClick={this.handleBeanGrindOptionChange}
          />
          <VerticalGap size={GapSize.ExtraSmall} />
          <StoreItemDescription fontWeight="Bold" title={'Gewicht'} />
          <WeightSelection
            options={beanWeights}
            checked={this.state.selectedWeight}
            onClick={this.handleWeightOptionChange}
          />
          <View style={styles.addToCartContainer}>
            <PrimaryButton
              style={{marginVertical: 12, marginRight: 12}}
              title={'In Winkelwagen'}
              icon={'add'}
              onPress={() => this.handleAddToCart(this.state.selectedItem)}
              // Only enable button if all options are selected
              disabled={!this.state.selectedItem}
            />
            <ItemPrice
              style={{
                color: 'black',
                fontFamily: 'Oswald-Medium',
                fontSize: 18,
              }}
              price={this.state.selectedItemPrice}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}
