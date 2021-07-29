import React, {Component} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {backgroundColor} from '../../styles/variables';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationScreenProp} from 'react-navigation';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';

const DEVICE_WIDTH = Dimensions.get('window').width;
const BORDER_RADIUS = 5;
const WIDTH = DEVICE_WIDTH - 40;
const INPUT_FIELD_HEIGHT = 50;

const styles = StyleSheet.create({
  loginView: {
    backgroundColor: backgroundColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    width: WIDTH,
    borderRadius: BORDER_RADIUS,
    backgroundColor: 'red',
    padding: 8,
  },
  errorText: {
    color: 'white',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputWrapper: {
    width: '100%',
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    left: 28,
    top: 22,
  },
  inputField: {
    height: INPUT_FIELD_HEIGHT,
    backgroundColor: '#ffffff',
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    width: WIDTH,
    marginHorizontal: 20,
    marginTop: 10,
    paddingLeft: 40,
  },
  button: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcfafa',
    height: INPUT_FIELD_HEIGHT,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    zIndex: 100,
    marginTop: 10,
  },
  signupContainer: {
    width: WIDTH,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signupText: {
    color: 'black',
    marginTop: 10,
  },
  registerbutton: {
    color: 'black',
    height: 50,
  },
});

interface IProps {
  navigation: NavigationScreenProp<any>;
}

interface IState {
  email: string;
  password: string;
  loginError: string;
}

export default class LoginScreen extends Component<IProps, IState> {
  state = {
    email: '',
    password: '',
    loginError: null,
  };

  render = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.loginView}>
        {this.state.loginError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{this.state.loginError}</Text>
          </View>
        )}

        <View style={styles.inputWrapper}>
          <View style={styles.inlineImg}>
            <MaterialIcons name="account-circle" size={25} color={'black'} />
          </View>
          <TextInput
            autoCapitalize={'none'}
            style={styles.inputField}
            placeholder={'E-mailadres'}
            onChangeText={this.handleEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.inlineImg}>
            <MaterialIcons name="lock" size={25} color={'black'} />
          </View>
          <TextInput
            autoCapitalize={'none'}
            style={styles.inputField}
            placeholder={'Wachtwoord'}
            secureTextEntry={true}
            onChangeText={this.handlePassword}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.login()}
          activeOpacity={1}>
          <Text style={styles.signupText}>Inloggen</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <TouchableOpacity
            style={styles.registerbutton}
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}>
            <Text style={styles.signupText}>Account aanmaken</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>Wachtwoord vergeten?</Text>
        </View>
      </KeyboardAvoidingView>
    );
  };

  handleEmail = (text: string) => {
    this.setState({email: text});
  };

  handlePassword = (text: string) => {
    this.setState({password: text});
  };

  login = () => {
    const email = this.state.email;
    const password = this.state.password;

    if (
      email === null ||
      email.trim() === '' ||
      password === null ||
      password.trim() === ''
    ) {
      this.setState({
        loginError: 'Het e-mailadres en wachtwoord kunnen niet leeg zijn',
      });
      return;
    }

    this.setState({loginError: null});

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Snackbar.show({text: 'Ingelogd'});
        this.props.navigation.navigate('Overzicht');
      })
      .catch(() => {
        this.setState({
          loginError: 'Het e-mailadres en/of wachtwoord klopt niet',
        });
      });
  };
}
