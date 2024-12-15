import BottomTabBar from '@/components/BottomTabBar';
import { MenuItem } from '@/utils/menuReducer';

const TabNavigation = ({ menu, onPress }: { menu: MenuItem[], onPress: (path: string) => void }) => {
  return (
    <BottomTabBar
      options={menu}
      onPress={onPress}
    />
  );
}

export default TabNavigation
