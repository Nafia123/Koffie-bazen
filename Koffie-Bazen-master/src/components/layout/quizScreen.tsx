import React, {Component} from 'react';
import {BackButtonChevron, Subtitle, Title} from '../atoms/components';
import {HeaderLogo, SmallHeaderLogo} from '../molecules/headers';
import * as quizService from '../../service/quizService';
import {ActivityIndicator, Button, Image, ScrollView, StyleSheet, View} from "react-native";
import * as coffeeService from "../../service/coffeeService";
import {QuizButton, StoreItem} from "../molecules/storeItems";

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1
    },
    space: {
        width: 20,
        height: 8,
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default class Quiz extends Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoaded: false,
            currentQuestion: null,
            coffees: []
        }
    }

    componentDidMount() {
        quizService.getQuizQuestions()
            .then(response => {
                this.setState({
                    data: response.data,
                    currentQuestion: response.data[Math.floor(Math.random() * response.data.length)],
                    isLoaded: true
                })
            });

        coffeeService.getCoffees()
            .then(response => {
                const cleaned = response.data.filter((value) => value.image !== "")
                this.setState({
                    coffees: cleaned,
                });
            });
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="rgb(155,102,60)" />
                </View>
            );
        } else {
            const answers = this.state.currentQuestion.answers.map(answer => (
                <View>
                    <View style={styles.space} />
                    <QuizButton key={this.state.coffees.filter(coffee => coffee.id == answer.coffeeId)[0].id} answer={answer.answer} {...this.props} {...this.state.coffees.filter(coffee => coffee.id == answer.coffeeId)[0]} />
                    <View style={styles.space} />
                </View>
            ));
            return (
                <>
                    <SmallHeaderLogo/>
                    <BackButtonChevron title="Terug" navigation={this.props.navigation} />
                    <Title>Vraag:</Title>
                    <Subtitle>{this.state.currentQuestion.question}</Subtitle>
                    <ScrollView>
                        <Image source={{uri: this.state.currentQuestion.image}} style={styles.image}/>
                        {answers}
                    </ScrollView>
                </>
            );
        }
    }
}
