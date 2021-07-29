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
import DropDownPicker from 'react-native-dropdown-picker';
import {backgroundColor} from '../../styles/variables';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationScreenProp} from 'react-navigation';
import * as userService from '../../service/userService';
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
  dropdownpicker: {
    width: WIDTH,
    borderRadius: BORDER_RADIUS,
    height: INPUT_FIELD_HEIGHT,
    marginLeft: '5%',
  },
  pickerContainer: {
    borderBottomWidth: 1,
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
    borderBottomWidth: 1,
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
    marginLeft: '5%',
    marginBottom: '2%',
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signupText: {
    color: 'black',
  },
});

interface IProps {
  navigation: NavigationScreenProp<any>;
}
interface IUser {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
  phoneNumber: string;
}
interface IState {
  registerError: string;
  repeatPassword: string;
}

export default class RegisterScreen extends Component<IProps, IState, IUser> {
  user = {
    firstName: '',
    lastName: '',
    // Roles: 0 = Admin, 1 = Roaster, 2 = Customer
    role: '2',
    email: '',
    password: '',
    phoneNumber: '',
  };
  state = {
    registerError: null,
    repeatPassword: '',
  };

  render = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.loginView}>
        {this.state.registerError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{this.state.registerError}</Text>
          </View>
        )}

        <View style={styles.inputWrapper}>
          <View style={styles.inlineImg}>
            <MaterialIcons name="account-circle" size={25} color={'black'} />
          </View>
          <TextInput
            autoCapitalize={'none'}
            style={styles.inputField}
            placeholder={'Voornaam'}
            onChangeText={this.handleFirstName}
          />
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.inlineImg}>
            <MaterialIcons name="account-circle" size={25} color={'black'} />
          </View>
          <TextInput
            autoCapitalize={'none'}
            style={styles.inputField}
            placeholder={'Achternaam'}
            onChangeText={this.handleLastName}
          />
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.inlineImg}>
            <MaterialIcons name="email" size={25} color={'black'} />
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
            <MaterialIcons name="phone" size={25} color={'black'} />
          </View>
          <TextInput
            autoCapitalize={'none'}
            keyboardType={'number-pad'}
            style={styles.inputField}
            placeholder={'Telefoon nummer'}
            onChangeText={this.handleNumber}
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
        <View style={styles.inputWrapper}>
          <View style={styles.inlineImg}>
            <MaterialIcons name="lock" size={25} color={'black'} />
          </View>
          <TextInput
            autoCapitalize={'none'}
            style={styles.inputField}
            placeholder={'Herhaal Wachtwoord'}
            secureTextEntry={true}
            onChangeText={this.handleRepeatPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={1}
          onPress={() => {
            this.register();
          }}>
          <Text style={styles.signupText}>Registreer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };

  handleEmail = (text: string) => {
    this.user.email = text;
  };

  handleFirstName = (text: string) => {
    this.user.firstName = text;
  };
  handleLastName = (text: string) => {
    this.user.lastName = text;
  };

  handlePassword = (text: string) => {
    this.user.password = text;
  };
  handleRepeatPassword = (text: string) => {
    this.state.repeatPassword = text;
  };
  handleNumber = (text: string) => {
    this.user.phoneNumber = text;
  };

  register = async () => {
    const email = this.user.email;
    const password = this.user.password;
    const repeatPassword = this.state.repeatPassword;
    const firstName = this.user.firstName;
    const lastName = this.user.lastName;
    const phoneNumber = this.user.phoneNumber;

    if (
      email === null ||
      email.trim() === '' ||
      password === null ||
      password.trim() === '' ||
      repeatPassword === null ||
      repeatPassword.trim() === '' ||
      firstName === null ||
      firstName.trim() === '' ||
      lastName === null ||
      lastName.trim() === '' ||
      phoneNumber === null ||
      phoneNumber.trim() === ''
    ) {
      this.setState({
        registerError: 'Alle velden invullen',
      });
      return;
    }
    if (!this.validateEmail(email)) {
      this.setState({registerError: 'Vul een geldig email in.'});
      return false;
    }
    if (password !== repeatPassword) {
      this.setState({
        registerError: 'Wachtwoorden zijn niet hetzelfde',
      });
      return;
    }
    if (password.length < 8) {
      this.setState({
        registerError: 'Wachtwoord moet minimaal 8 tekens bevatten',
      });
      return;
    }
    this.setState({registerError: null});

    // Await until account Creation is done.
    if ((await userService.createUser(this.user)) === 201) {
      Snackbar.show({
        text: 'Gebruiker ' + this.user.email + ' is aangemaakt',
        duration: Snackbar.LENGTH_LONG,
      });
      // this.props.navigation.navigate('Login');
      this.props.navigation.goBack('Login');
    } else {
      Snackbar.show({
        text: 'Er ging iets fout met het aanmaken van een gebruiker',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  validateEmail = (email): Boolean => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  };
}
