import React, { useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  Alert,
  Platform,
  ViewStyle,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import Loader from './Loader';
import { utils } from '../utils';
import { items } from '../items';
import { hooks } from '../hooks';
import { svg } from '../assets/svg';
import { theme } from '../constants';
import { HeaderType } from '../types';
import { actions } from '../store/actions';
import { queryHooks } from '../store/slices/apiSlice';
import { useAppSelector, useAppDispatch } from '../store';
import { useQuery } from '@apollo/client';
import { GET_ACTIVE_ORDERS } from '../Api/order_gql';

const Header: React.FC<HeaderType> = ({
  title,
  style,
  search,
  onGoBack,
  basketIcon,
  burgerIcon,
  goBackIcon,
  bottomLine,
}) => {
  const dispatch = useAppDispatch();
  const navigation = hooks.useAppNavigation();

  const user = useAppSelector(state => state.userSlice.user);
  const cart = useAppSelector(state => state.cartSlice.list);
  const subtotal = useAppSelector(state => state.cartSlice.subtotal);
  const { data: activeOrderData, loading: activeOrderLoading, error: activeOrderError, refetch: refetchOrders } = useQuery(GET_ACTIVE_ORDERS);

  useFocusEffect(
    useCallback(() => {
      refetchOrders();
    }, [])
  );
  const totalQuantity = activeOrderData?.activeOrder?.totalQuantity || 0;
  const [showModal, setShowModal] = useState(false);

  const {
    data: plantsData,
    error: plantsError,
    isLoading: plantsLoading,
  } = queryHooks.useGetPlantsQuery();

  const newQuantity = plantsData?.plants.filter(item => item.isNew).length;
  const featuredQuantity = plantsData?.plants.filter(item => item.isFeatured).length;
  const saleQuantity = plantsData?.plants.filter(item => item.oldPrice).length;
  const bestQuantity = plantsData?.plants.filter(item => item.isBestSeller).length;

  const route = useRoute();

  const isLoading = plantsLoading;

  console.log("length of cart:", activeOrderData?.activeOrder?.lines?.length)
  const handleOnPress = () => {
    if (activeOrderData?.activeOrder?.lines?.length > 0) {
      dispatch(actions.setScreen('Order'));
      route.name === 'Shop' && navigation.navigate('TabNavigator');
      route.name === 'Order' && navigation.navigate('TabNavigator');
      route.name === 'Product' && navigation.navigate('TabNavigator');
    }
    if (activeOrderData?.activeOrder?.lines?.length === undefined) {
      Alert.alert('Your cart is empty', 'Please add some items to your cart', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const renderGoBack = (): JSX.Element | null => {
    if (goBackIcon && navigation.canGoBack()) {
      return (
        <View style={{ position: 'absolute', left: 0 }}>
          <TouchableOpacity
            style={{ paddingVertical: 12, paddingHorizontal: 20 }}
            onPress={() => navigation.goBack()}
          >
            <svg.GoBackSvg />
          </TouchableOpacity>
        </View>
      );
    }

    if (onGoBack && navigation.canGoBack()) {
      return (
        <View style={{ position: 'absolute', left: 0 }}>
          <TouchableOpacity
            style={{ paddingVertical: 12, paddingHorizontal: 20 }}
            onPress={onGoBack}
          >
            <svg.GoBackSvg />
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  const renderBurgerMenu = (): JSX.Element => {
    return (
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        style={{ margin: 0, padding: 0 }}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        animationInTiming={500}
        animationOutTiming={500}
        deviceWidth={theme.sizes.deviceWidth}
        deviceHeight={theme.sizes.deviceHeight}
      >
        <View
          style={{
            height: theme.sizes.deviceHeight,
            width: utils.responsiveWidth(270, true),
            backgroundColor: theme.colors.white,
            paddingTop: utils.statusBarHeight(),
            paddingBottom: utils.homeIndicatorHeight(),
          }}
        >
          {/* CLOSE BUTTON */}
          <TouchableOpacity
            style={{ alignSelf: 'flex-end', paddingHorizontal: 10, paddingTop: 10 }}
            onPress={() => setShowModal(false)}
          >
            <svg.CloseSvg />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: utils.responsiveHeight(40),
              paddingBottom: utils.responsiveHeight(20),
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* USER INFO */}
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.antiFlashWhite,
                paddingBottom: utils.responsiveHeight(32),
                marginBottom: utils.responsiveHeight(20),
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                setShowModal(false);
                navigation.navigate('EditProfile');
              }}
            >
              <View>
                <Text
                  style={{
                    color: theme.colors.mainColor,
                    ...theme.fonts.Inter_600SemiBold,
                    fontSize: Platform.OS === 'ios' ? 14 : 12,
                    textTransform: 'capitalize',
                    marginBottom: 4,
                  }}
                  numberOfLines={1}
                >
                  {user?.name || ''}
                </Text>
                <Text
                  style={{
                    ...theme.fonts.DM_Sans_400Regular,
                    color: theme.colors.textColor,
                    fontSize: Platform.OS === 'ios' ? 14 : 12,
                  }}
                  numberOfLines={1}
                >
                  {user?.email || ''}
                </Text>
              </View>
            </TouchableOpacity>
            {/* MENU */}
            <items.BurgerMenuItem
              title=">  Categories"
              onPress={() => {
                setShowModal(false);
                dispatch(actions.setScreen('Category'));
              }}
            />
            {/* <items.BurgerMenuItem
              // qty={`${saleQuantity}`}
              title=">  Sale"
              onPress={() => {
                setShowModal(false);
                navigation.navigate('Shop', {
                  title: 'Sale',
                  // products: plantsData?.plants.filter(item => item.oldPrice) ?? [],
                });
              }}
            />
            <items.BurgerMenuItem
              // qty={`${newQuantity}`}
              title=">  New arrivals"
              onPress={() => {
                setShowModal(false);
                navigation.navigate('Shop', {
                  title: 'New arrivals',
                  // products: plantsData?.plants.filter(item => item.isNew) ?? [],
                });
              }}
            /> */}
            <items.BurgerMenuItem
              // qty={`${bestQuantity}`}
              title=">  Best sellers"
              onPress={() => {
                setShowModal(false);
                navigation.navigate('Shop', {
                  title: 'best-selling',
                  // products: plantsData?.plants.filter(item => item.isBestSeller) ?? [],
                });
              }}
            />
            <items.BurgerMenuItem
              // qty={`${featuredQuantity}`}
              title=">  Featured products"
              onPress={() => {
                setShowModal(false);
                navigation.navigate('Shop', {
                  title: 'featured-product',
                  // products: plantsData?.plants.filter(item => item.isFeatured) ?? [],
                });
              }}
            />
            <items.BurgerMenuItem
              title=">  Support"
              onPress={() => {
                Alert.alert(
                  'Contact us',
                  'Please contact us via email at support@everbloom.com',
                  [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                );
              }}
            />
          </ScrollView>
        </View>
      </Modal>
    );
  };

  const renderBurgerIcon = (): JSX.Element | null => {
    if (burgerIcon) {
      return (
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 0,
            paddingHorizontal: 20,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => setShowModal(true)}
        >
          <svg.BurgerSvg />
          {!search && !title && (
            <Image
              source={require('../assets/images/sulopa.png')}
              style={{ width: 100, height: 30, marginLeft: 110 }}
            />
          )}
        </TouchableOpacity>
      );
    }

    return null;
  };

  const renderSearch = (): JSX.Element | null => {
    if (search) {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: theme.sizes.deviceWidth - 210,
            marginRight: 60,
          }}
          onPress={() => navigation.navigate('Search')}
        >
          <View style={{ marginRight: 7 }}>
            <svg.SearchSvg />
          </View>
          <Text
            style={{
              ...theme.fonts.DM_Sans_400Regular,
              fontSize: Platform.OS === 'ios' ? 14 : 16,
              color: theme.colors.textColor,
              textTransform: 'capitalize',
            }}
          >
            search
          </Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  const renderTitle = (): JSX.Element | null => {
    if (title) {
      return (
        <Text
          style={{
            color: theme.colors.mainColor,
            textTransform: title === 'FAQ' ? 'uppercase' : 'none',
            ...theme.fonts.DM_Sans_400Regular,
            fontSize: Platform.OS === 'ios' ? 16 : 14,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      );
    }

    return null;
  };

  const renderBasket = (): JSX.Element | null => {
    if (basketIcon) {
      return (
        <TouchableOpacity
          onPress={handleOnPress}
          style={{
            right: 0,
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              height: 22,
              borderRadius: 11,
              paddingHorizontal: 7,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.mainColor,
            }}
          >
            <Text
              style={{
                color: theme.colors.white,
                ...theme.fonts.DM_Sans_700Bold,
                fontSize: Platform.OS === 'ios' ? 10 : 8,
              }}
              numberOfLines={1}
            >
              {totalQuantity}
            </Text>
          </View>
          <svg.BasketSvg />
        </TouchableOpacity>
      );
    }
  
    return null;
  };
  

  const renderContent = (): JSX.Element => {
    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 52,
      borderBottomWidth: bottomLine ? 1 : 0,
      borderBottomColor: theme.colors.antiFlashWhite,
      ...style,
    };

    if (isLoading) {
      <Loader />;
    }

    return (
      <View style={{ ...containerStyle }}>
        {renderGoBack()}
        {renderBurgerIcon()}
        {renderTitle()}
        {renderSearch()}
        {renderBasket()}
        {renderBurgerMenu()}
      </View>
    );
  };

  return renderContent();
};

export default Header;