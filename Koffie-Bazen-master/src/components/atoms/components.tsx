import React, {Component, CSSProperties} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  FONT_WEIGHTS,
  dividerColor,
  subtitleColor,
} from '../../styles/variables';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as globalStyles from '../../styles/variables';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    color: 'black',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Oswald-Bold',
    marginRight: 8,
    marginLeft: 8,
  },
  subtitleText: {
    fontSize: 24,
    color: subtitleColor,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Oswald-Bold',
    marginRight: 8,
    marginLeft: 8,
  },
  paragraphText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginRight: 8,
    marginLeft: 8,
    fontFamily: 'OpenSans-SemiBold',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginRight: 8,
    marginLeft: 8,
    fontFamily: 'OpenSans-SemiBold',
  },
  divider: {
    borderBottomColor: dividerColor,
    borderBottomWidth: 1,
    width: '60%',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  storeItemDescription: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'OpenSans-Regular',
  },
  itemPrice: {
    fontSize: 16,
    color: subtitleColor,
    textTransform: 'uppercase',
    fontFamily: 'Oswald-Bold',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12,
  },
  backButtonChevron: {
    color: subtitleColor,
    fontSize: 38,
    margin: -12,
  },
  backButtonText: {
    color: subtitleColor,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    marginHorizontal: 8,
  },
  itemImageWrapper: {
    aspectRatio: 1,
  },
  itemImage: {
    borderRadius: 6,
  },
  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: globalStyles.primaryButtonColor,
    padding: 8,
    borderRadius: 4,
    flexDirection: 'row',
  },
  primaryButtonText: {
    color: 'white',
  },
});

interface ITypographyProps {
  image?: Image;
  children?: React.ReactNode;
  style?: CSSProperties;
}

interface IDividerProps {
  color?: string;
  style?: CSSProperties;
}

interface IBackButtonChevronProps {
  color?: string;
  title?: string;
  style?: CSSProperties;
  navigation: any;
}

interface IItemPriceProps {
  children?: React.ReactNode;
  style?: CSSProperties;
  price?: Number;
}

interface IStoreItemDescriptionProps {
  fontWeight?: string;
  title: string;
  style?: CSSProperties;
}

interface IStoreItemImageProps {
  image?: Image;
  children?: React.ReactNode;
  style?: CSSProperties;
}

interface IPrimaryButtonProps {
  title?: string;
  icon?: string;
  onPress?: any;
  disabled?: boolean;
  style?: CSSProperties;
}

export class Title extends Component<ITypographyProps, any> {
  public render() {
    const {children, style} = this.props;

    return <Text style={[styles.titleText, style]}>{children}</Text>;
  }
}

export class Subtitle extends Component<ITypographyProps, any> {
  public render() {
    const {children, style} = this.props;

    return <Text style={[styles.subtitleText, style]}>{children}</Text>;
  }
}

export class Paragraph extends Component<ITypographyProps, any> {
  public render() {
    const {children, style} = this.props;

    return <Text style={[styles.paragraphText, style]}>{children}</Text>;
  }
}

/**
 * A horizontal line
 */
export class Divider extends Component<IDividerProps, any> {
  public render() {
    const {style, color} = this.props;

    return <View style={[styles.divider, {borderBottomColor: color}, style]} />;
  }
}

/**
 * A button used for navigating to the previous page
 */
export class BackButtonChevron extends Component<IBackButtonChevronProps, any> {
  public render() {
    const {style, color, navigation, title} = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButtonContainer, style]}>
        <MaterialIcons style={styles.backButtonChevron} name="chevron-left" />
        <Text style={styles.backButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

export class ItemPrice extends Component<IItemPriceProps, any> {
  public render() {
    const {style, price} = this.props;

    return price ? (
      <Text style={[styles.itemPrice, style]}>€{price}</Text>
    ) : (
      <></>
    );
  }
}

export class StoreItemDescription extends Component<
  IStoreItemDescriptionProps,
  any
> {
  public render() {
    const {fontWeight, title} = this.props;
    let {style} = this.props;
    let fontWeightStyle;

    // If a specified font weight is passed concat this to the style
    if (Object.values(FONT_WEIGHTS).includes(fontWeight)) {
      fontWeightStyle = {fontFamily: `OpenSans-${fontWeight}`};
    }

    return (
      <Text style={[styles.storeItemDescription, style, fontWeightStyle]}>
        {title}
      </Text>
    );
  }
}

export class StoreItemImage extends Component<IStoreItemImageProps, any> {
  public render() {
    const {image, children, style} = this.props;

    return (
      <ImageBackground
        source={{uri: image}}
        style={[styles.itemImageWrapper, style]}
        imageStyle={styles.itemImage}
        fadeDuration={0}>
        {children}
      </ImageBackground>
    );
  }
}

export class PrimaryButton extends Component<IPrimaryButtonProps, any> {
  render() {
    const {disabled, title, icon, onPress, style} = this.props;
    const activeOpacity = 0.8;
    const iconSize = 20;
    const iconColor = 'white';

    return (
      <TouchableOpacity
        style={[
          styles.primaryButton,
          style,
          // change the background color of button when disabled
          ...(disabled
            ? [{backgroundColor: globalStyles.disabledPrimaryButtonColor}]
            : []),
        ]}
        activeOpacity={activeOpacity}
        onPress={onPress}
        disabled={disabled}>
        <MaterialIcons name={icon} size={iconSize} color={iconColor} />
        <Paragraph style={styles.primaryButtonText}>{title}</Paragraph>
      </TouchableOpacity>
    );
  }
}
