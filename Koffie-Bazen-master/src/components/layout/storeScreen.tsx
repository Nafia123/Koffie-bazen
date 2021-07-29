import React, {Component} from 'react';
import axios from "axios";
import {ActivityIndicator, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, Subtitle, Title} from '../atoms/components';
import {HeaderLogo, QuizCard} from '../molecules/headers';
import {subtitleColor} from '../../styles/variables';
import {StoreItem} from '../molecules/storeItems';
import * as coffeeService from '../../service/coffeeService';
import LinearGradient from "react-native-linear-gradient";

const coffeeQuizImage = require('../../assets/images/stock/stock-2.jpg');
const styles = StyleSheet.create({
    storeItemsWrapper: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'flex-start',
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
    overviewCardContainer: {
        height: 175,
        marginVertical: 12,
    },
});

export default class Store extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoaded: false,
    };
  }

    componentDidMount() {
        coffeeService.getCoffees()
            .then(response => {
                const cleaned = response.data.filter((value) => value.image !== "")
                this.setState({
                    data: cleaned,
                    isLoaded: true
                });
            })
    }

  render() {
    const storeItems = this.state.data.map((item) => (
      <StoreItem key={item.id} {...this.props} {...item} />
    ));

        return (
            <>
                <HeaderLogo/>
                <ScrollView>
                    <Title>VERS GEBRANDE SPECIALTY COFFEE</Title>
                    <Subtitle>Direct bezorgd</Subtitle>
                    <Divider color={subtitleColor}/>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Quiz")}>
                        <View style={styles.overviewCardContainer}>
                            <ImageBackground
                                style={styles.overviewCardImage}
                                source={coffeeQuizImage}
                                fadeDuration={0}>
                                <LinearGradient
                                    colors={['rgba(0, 0, 0, 0)', '#000']}
                                    style={styles.linearGradient}
                                    start={{x: 0.5, y: 0.4}}>
                                    <Title style={styles.overviewCardText}>
                                        Doe de koffiequiz!
                                    </Title>
                                </LinearGradient>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    {/* TODO: Use FlatList instead of a View */}
                    <View style={styles.storeItemsWrapper}>{storeItems}</View>
                </ScrollView>
            </>
        );
    }
}
