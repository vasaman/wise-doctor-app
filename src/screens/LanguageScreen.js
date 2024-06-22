import { useTranslation } from 'react-i18next';

function LanguageScreen() {
 const { _  , i18n } = useTranslation(); //i18n instance
  return (
    <View>
      <TouchableOpacity onPress={() => i18n.changeLanguage("en")}>
        <Text>English</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => i18n.changeLanguage("fr")}>
        <Text>French</Text>
      </TouchableOpacity>
    </View>
  ) 
}