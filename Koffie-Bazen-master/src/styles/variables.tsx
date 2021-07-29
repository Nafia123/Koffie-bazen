// Default colors of the app
const primaryColor = '#3d3f43';
const primaryColorTransparent = 'rgba(61,63,67, 0.06)';
const primaryVariantColor = '#271300';

const primaryColorOld = 'rgb(155,102,60)';
const primaryVariantColorOld = '#C7A17A';
const primaryVariantColorOldTransparent = 'rgba(155,102,60, 0.15)';

const secondaryColor = '#EFD87C';

const background = '#FFFDF5';
const error = '#B00020';
const textBlack = '#30271C';
const textBlackAlt = '#271300';
const textGrey = '#666';

const disabledButtonColor = 'rgba(61,63,67, 0.3)';

const inactiveNavigationTab = 'rgba(255,255,255,0.4)';
const activeNavigationTab = 'rgba(255,255,255,1)';

// Random color pallet https://www.color-hex.com/color-palette/30023
const creamCoffeeLighter = '#ece0d1';
const creamCoffeeLight = '#dbc1ac';
const creamCoffee = '#967259';
const creamCoffeeDark = 'rgb(99,72,50)';
const creamCoffeeDarker = '#38220f';

// Fonts of the app
const oswaldFont = 'Oswald, sans-serif';
const merriweatherFont = 'Merriweather, serif';
const openSansFont = 'Open Sans, sans-serif';

// This is an enum type. Source: https://stackoverflow.com/a/5040502
export enum FONT_WEIGHTS {
  Bold = 'Bold',
  BoldItalic = 'BoldItalic',
  ExtraBold = 'ExtraBold',
  ExtraBoldItalic = 'ExtraBoldItalic',
  Italic = 'Italic',
  Light = 'Light',
  LightItalic = 'LightItalic',
  Regular = 'Regular',
  SemiBold = 'SemiBold',
  SemiBoldItalic = 'SemiBoldItalic',
}

// Variables that can be used throughout the environment
export const primaryAppColor = primaryColor;
export const backgroundColor = background;
export const titleFont = oswaldFont;
export const subtitleColor = primaryVariantColorOld;

export const primaryButtonColor = creamCoffee;
export const disabledPrimaryButtonColor = disabledButtonColor;

export const defaultFont = openSansFont;

export const inactiveNavigationTabColor = inactiveNavigationTab;
export const activeNavigationTabColor = activeNavigationTab;

export const dividerColor = primaryVariantColor;

export const selectedItemColor = creamCoffeeDark;
export const selectedItemColorBackground = primaryVariantColorOldTransparent;

export const itemPressColorBackground = primaryColorTransparent;
