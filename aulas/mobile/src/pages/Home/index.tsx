import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { ImageBackground, View, Text, Image, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const Home = () => {

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const navigation = useNavigation();

  function handleNavigateToPoints() {
    navigation.navigate('Points', { uf: selectedUf, city: selectedCity });
  }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    })
  }, []);

  useEffect(() => {
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cityNames = response.data.map(city => city.nome);

      setCities(cityNames);
    })
  }, [selectedUf])

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      imageStyle={{ width: 274, height: 368 }}
      style={styles.container}>
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          onValueChange={value => setSelectedUf(value)}
          value={selectedUf}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: "Selecione uma UF", value: null }}
          style={pickerSelectStyles}
          items={ufs.map(uf => ({
            label: uf, value: uf
          }))}
        />
        <RNPickerSelect
          onValueChange={value => setSelectedCity(value)}
          value={selectedCity}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: "Selecione uma cidade", value: null }}
          style={pickerSelectStyles}
          items={cities.map(city => ({
            label: city, value: city
          }))}
        />
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  picker: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8
  },
});

export default Home;