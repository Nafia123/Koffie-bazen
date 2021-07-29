import React, {Component, CSSProperties} from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  verticalGap: {
    width: '100%',
  },
});

export const GapSize = {
  ExtraSmall: 8,
  Small: 18,
  Medium: 32,
  Large: 42,
  ExtraLarge: 64,
} as const;

type GapSize = typeof GapSize[keyof typeof GapSize];

interface IVerticalGapProps {
  size: GapSize;
  style?: CSSProperties;
}

/**
 * Used to create an invisible vertical gap/whitespace between components
 */
export class VerticalGap extends Component<IVerticalGapProps, any> {
  public render() {
    const {style, size} = this.props;

    return <View style={[styles.verticalGap, {height: size}, style]} />;
  }
}
