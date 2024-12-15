import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from '@expo/vector-icons/FontAwesome6';
import { MenuItem } from "@/utils/menuReducer";

type BottomTabBarProps = {
  options: MenuItem[],
  onPress: (url: string) => void,
}

const BottomTabBar = ({ options, onPress }: BottomTabBarProps) => (
  !options ? null : <View style={styles.container}>
    {
      options.map(({ active, title, icon, url }, index) => (
        <View key={[title, url, index].join(',')} style={styles.option}>
          <TouchableOpacity onPress={() => onPress(url)} style={styles.touchable}>
            <Icon name={icon} size={30} style={active && styles.activeIcon} />
            <Text style={{ ...styles.text, ...(active ? styles.activeText : {}) }}>
              {title}
            </Text>
          </TouchableOpacity>
        </View>
      ))
    }
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  option: {
    flex: 1,
    paddingTop: 15,
  },
  touchable: {
    alignItems: 'center',
  },
  activeIcon: {
    color: 'blue',
  },
  text: {
    textAlign: 'center'
  },
  activeText: {
    color: 'blue',
  },
})

export default BottomTabBar
