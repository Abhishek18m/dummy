import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  splashView: {alignItems: 'center', justifyContent: 'center', flex: 1},
  splashText: {fontWeight: 'bold', fontSize: 30, color: 'black'},

  loginSafeView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loginMainView: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },
  loginHeaderView: {
    height: '20%',
    alignItems: 'center',
  },
  loginHeadText: {fontSize: 100, fontWeight: 'bold', color: 'blue'},
  loginHeadText2: {fontSize: 22},
  loginInputView: {
    height: 170,
    // backgroundColor: 'blue',
    justifyContent: 'space-evenly',
  },
  loginCreateView: {flexDirection: 'row', justifyContent: 'center'},
  signUpView: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginHorizontal: 15,
  },
  signUpIcon: {height: 30, width: 30},
  signUpInputView: {
    height: 450,
    justifyContent: 'space-evenly',
    //   backgroundColor: 'red',
  },
  signUpCreateText: {fontSize: 30, textAlign: 'center', marginBottom: 10},
});
