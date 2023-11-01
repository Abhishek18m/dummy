import {StyleSheet} from 'react-native';
import color from '../Assets/Color/color';

export default StyleSheet.create({
  splashView: {alignItems: 'center', justifyContent: 'center', flex: 1},
  splashText: {fontWeight: 'bold', fontSize: 60, color: 'black'},
  splashImg: {height: 50, width: 50},
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
  },
  signUpCreateText: {fontSize: 30, textAlign: 'center', marginBottom: 10},

  // -- CHAT SCREEN --
  chatBox: {
    marginTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  chatTopView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  chatBackBtn: {
    height: 25,
    width: 25,
    tintColor: 'white',
  },
  chatReceiverImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginHorizontal: '3%',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  chatUserName: {
    fontSize: 20,
    flex: 1,
    // textAlign: 'center',
    paddingRight: 50,
    color: 'white',
  },

  // -- HOME SCREEN --
  homeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  // -- Search Bar --
  searchView: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
  },

  // -- Search Image --
  searchImg: {
    height: 15,
    width: 15,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  searchCross: {
    height: 15,
    width: 15,
    marginHorizontal: 10,
    alignSelf: 'center',
  },

  // -- Profile --
  profileBtn: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  profileMenu: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: 'white',
    marginTop: 10,
    paddingTop: 20,
    paddingHorizontal: 10,
    flex: 1,
  },

  profileBtnView: {
    backgroundColor: '#d6e9ff',
    padding: 5,
    borderRadius: 5,
    marginRight: 20,
  },
  profileBtnImg: {
    height: 25,
    width: 25,
    tintColor: '#5579f1',
  },
  profileView: {
    flex: 1,
    // backgroundColor: '#eeeee4',
    backgroundColor: '#d6e9ff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  profileImgView: {
    margin: 10,
    backgroundColor: color.primary,
    alignSelf: 'center',
    padding: 5,
    borderRadius: 120,
  },
  profileImg: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 75,
    alignSelf: 'center',
  },
  profileName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  profileData: {
    marginTop: 5,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  profileDataView: {
    backgroundColor: '#acd4ff',
    flex: 0.3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.42,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
