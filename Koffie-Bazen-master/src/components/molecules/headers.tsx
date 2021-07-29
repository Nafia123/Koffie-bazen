import React from 'react';
import {Image, ImageBackground, StyleSheet, TouchableHighlight, View,} from 'react-native';
import {backgroundColor, primaryAppColor} from '../../styles/variables';
import {Title} from '../atoms/components';
import LinearGradient from 'react-native-linear-gradient';
import navigation from '../../navigation/navigation'

// import styled from 'styled-components';

const logoWhite = require('../../assets/images/logos/logo-white.png');
const logoBlack = require('../../assets/images/logos/logo-black.jpg');
const logoHeaderImage = require('../../assets/images/stock/app-header-1.jpg');
const discoverCoffeeImage = require('../../assets/images/stock/stock-4.jpg');
const coffeeQuizImage = require('../../assets/images/stock/stock-2.jpg');

const styles = StyleSheet.create({
  headerLogoContainer: {
    height: 100,
    backgroundColor: primaryAppColor,
    borderBottomColor: backgroundColor,
    borderBottomWidth: 2,
  },
  headerLogoContainerSmall: {
    height: 50,
  },
  headerLogoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  headerImage: {
    opacity: 0.5,
  },
  headerLogo: {
    height: '80%',
    resizeMode: 'contain',
  },
  overviewCardContainer: {
    height: 175,
    marginVertical: 12,
  },
  overviewCardImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  overviewCardText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
  },
  linearGradient: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: '100%',
    width: '100%',
    padding: 8,
  },
});

export const HeaderLogo = () => (
  <View style={styles.headerLogoContainer}>
    <ImageBackground
      style={styles.headerLogoWrapper}
      imageStyle={styles.headerImage}
      source={logoHeaderImage}
      fadeDuration={0}>
      <Image style={styles.headerLogo} source={logoWhite} fadeDuration={0} />
      {/*<LogoWhite />*/}
    </ImageBackground>
  </View>
);

export const SmallHeaderLogo = () => (
  <View style={[styles.headerLogoContainer, styles.headerLogoContainerSmall]}>
    <ImageBackground
      style={styles.headerLogoWrapper}
      imageStyle={styles.headerImage}
      source={logoHeaderImage}
      fadeDuration={0}>
      <Image style={styles.headerLogo} source={logoWhite} fadeDuration={0} />
      {/*<LogoWhite />*/}
    </ImageBackground>
  </View>
);

export const OverviewCard = () => (
  <View style={styles.overviewCardContainer}>
    <ImageBackground
      style={styles.overviewCardImage}
      source={discoverCoffeeImage}
      fadeDuration={0}>
      {/*</LinearGradient>*/}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', '#000']}
        style={styles.linearGradient}
        start={{x: 0.5, y: 0.4}}>
        <Title style={styles.overviewCardText}>
          Ontdek fantastische koffie
        </Title>
        {/*<Chevron />*/}
      </LinearGradient>
    </ImageBackground>
  </View>
);
