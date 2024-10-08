import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

import {hooks} from '../hooks';
import {custom} from '../custom';
import {theme} from '../constants';
import {ProductType} from '../types';
import {handleTextChange} from '../utils/handleTextChange';
import {useQuery} from '@apollo/client';
import {GET_PRODUCTS} from '../Api/search_gql';

const Search: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef<TextInput>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const {loading, error, data} = useQuery(GET_PRODUCTS, {
    variables: {
      options: {
        filter: {
          name: {
            contains: searchQuery,
          },
        },
      },
    },
  });

  const handleSearch = handleTextChange(setSearchQuery);

  const renderSearchBar = () => {
    return (
      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: `${theme.colors.antiFlashWhite}80`,
        }}
      >
        <View style={{flex: 1, height: 40, marginRight: 20}}>
          <TextInput
            ref={ref}
            placeholder='Enter product name'
            clearButtonMode='always'
            placeholderTextColor={`${theme.colors.textColor}80`}
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus={true}
            value={searchQuery}
            onChangeText={text => handleSearch(text)}
            style={{
              height: 40,
              padding: 0,
              borderRadius: 4,
              paddingHorizontal: 20,
              backgroundColor: `${theme.colors.antiFlashWhite}50`,
              color: theme.colors.textColor,
              ...theme.fonts.DM_Sans_400Regular,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            height: 40,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              color: theme.colors.textColor,
              ...theme.fonts.DM_Sans_400Regular,
              fontSize: Platform.OS === 'ios' ? 14 : 12,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: `${theme.colors.antiFlashWhite}80`,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('Product', {item: item});
        }}
      >
        {item?.assets[0]?.preview && (
          <Image
            source={{uri: item?.assets[0]?.preview}}
            style={{width: 50, height: 50, marginRight: 10}}
          />
        )}
        <View style={{flex: 1}}>
          <Text
            style={{
              color: theme.colors.textColor,
              ...theme.fonts.DM_Sans_400Regular,
              fontSize: Platform.OS === 'ios' ? 14 : 12,
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              color: theme.colors.textColor,
              ...theme.fonts.DM_Sans_400Regular,
              fontSize: Platform.OS === 'ios' ? 12 : 10,
            }}
          ></Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            ...theme.fonts.DM_Sans_400Regular,
            fontSize: Platform.OS === 'ios' ? 16 : 14,
            color: theme.colors.textColor,
          }}
        >
          No results found
        </Text>
      </View>
    );
  };

  const renderSearchResults = () => {
    if (loading) {
      return <ActivityIndicator />;
    }
    if (error) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Error: {error.message}</Text>
        </View>
      );
    }

    const filteredProducts = data?.products?.items?.filter(item => {
      return item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    });

    return (
      <FlatList
        data={filteredProducts}
        keyExtractor={(item: ProductType) => item?.id?.toString()}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='handled' // when user taps on the screen, the keyboard will be hidden
        keyboardDismissMode='on-drag' // when user drags the screen, the keyboard will be hidden
        ListEmptyComponent={() => renderEmptyComponent()}
        renderItem={({item}) => renderItem({item})}
      />
    );
  };

  const renderContent = () => {
    return (
      <React.Fragment>
        {renderSearchBar()}
        {renderSearchResults()}
      </React.Fragment>
    );
  };

  return (
    <custom.SafeAreaView insets={['top', 'bottom']}>
      {renderContent()}
    </custom.SafeAreaView>
  );
};

export default Search;
