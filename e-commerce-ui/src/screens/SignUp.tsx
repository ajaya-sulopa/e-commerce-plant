import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {showMessage} from 'react-native-flash-message';
import {text} from '../text';
import {alert} from '../alert';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {theme} from '../constants';
import {components} from '../components';
import {validation} from '../validation';
import {validateName} from '../validation/validateName';
import {validateEmail} from '../validation/validateEmail';
import {handleTextChange} from '../utils/handleTextChange';
import {useMutation} from '@apollo/client';
import {SIGNUP} from '../Api/signup_gql';
import {LOGIN_USER} from '../config';
import {Image} from 'react-native-svg';
import SignIn from './SignIn';
import SignUpAccountCreated from './SignUpAccountCreated';

const SignUp: React.FC = () => {
  const navigation = hooks.useAppNavigation();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassowrd] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] =
    useState<boolean>(true);

  const handleNameChange = handleTextChange(setName);
  const handleEmailChange = handleTextChange(setEmail);
  const handlePasswordChange = handleTextChange(setPassword);
  const handleConfirmPasswordChange = handleTextChange(setConfirmPassowrd);

  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const [signupAPI, {error}] = useMutation(SIGNUP);

  useEffect(() => {
    if (loading) {
      nameInputRef.current?.blur();
      emailInputRef.current?.blur();
      passwordInputRef.current?.blur();
      confirmPasswordInputRef.current?.blur();
    }
  }, [loading]);

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const {data} = await signupAPI({
        variables: {
          firstName: name,
          emailAddress: email,
          password: confirmPassword,
        },
      });
      showMessage({
        message: 'Signup Successful',
        description: 'You have successfully signed up!',
        type: 'success',
      });
      navigation.navigate('SignIn');
    } catch (error) {
      showMessage({
        message: 'Signup Error',
        description: 'An error occurred during signup. Please try again.',
        type: 'danger',
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header goBackIcon={true} />;
  };

  const renderTitle = (): JSX.Element => {
    return (
      <text.H1
        style={{
          textTransform: 'capitalize',
          marginBottom: utils.responsiveHeight(40),
        }}
      >
        Sign up
      </text.H1>
    );
  };

  const renderInputFields = (): JSX.Element => {
    return (
      <React.Fragment>
        <custom.InputField
          label='name'
          value={name}
          keyboardType='default'
          innerRef={nameInputRef}
          placeholder='enter name'
          onChangeText={handleNameChange}
          checkIcon={validateName(name, true)}
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
        <custom.InputField
          label='email'
          value={email}
          innerRef={emailInputRef}
          placeholder='enter email'
          keyboardType='email-address'
          onChangeText={handleEmailChange}
          checkIcon={validateEmail(email, true)}
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
        <custom.InputField
          label='password'
          value={password}
          eyeOffIcon={true}
          keyboardType='default'
          innerRef={passwordInputRef}
          placeholder='enter password'
          secureTextEntry={secureTextEntry}
          onChangeText={handlePasswordChange}
          setSecureTextEntry={setSecureTextEntry}
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
        <custom.InputField
          eyeOffIcon={true}
          keyboardType='default'
          value={confirmPassword}
          label='confirm password'
          innerRef={confirmPasswordInputRef}
          placeholder='enter confirm password'
          secureTextEntry={confirmSecureTextEntry}
          onChangeText={handleConfirmPasswordChange}
          setSecureTextEntry={setConfirmSecureTextEntry}
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
      </React.Fragment>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title={'sign up'}
        onPress={() => {
          validation({name, email, password, confirmPassword})
            ? handleCreateUser()
            : null;
        }}
        loading={loading}
      />
    );
  };

  const renderIfYouHaveAccount = (): JSX.Element => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
        <text.T16 numberOfLines={1}>Already have an account? </text.T16>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <text.T16 style={{color: theme.colors.mainColor}} numberOfLines={1}>
            Sign in.
          </text.T16>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeight = (): JSX.Element => {
    return <View style={{height: utils.responsiveHeight(70, true)}} />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          justifyContent: 'center',
        }}
      >
        {renderTitle()}
        {renderInputFields()}
        {renderButton()}
        {renderHeight()}
      </KeyboardAwareScrollView>
    );
  };

  return (
    <custom.SafeAreaView insets={['top', 'bottom']}>
      {renderHeader()}
      {renderContent()}
      {renderIfYouHaveAccount()}
    </custom.SafeAreaView>
  );
};

export default SignUp;
