import { Feather } from "@expo/vector-icons";

import { CustomText } from "~/components/CustomText";
import { Screen } from "~/components/Screen";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { Colors } from "~/themes";

import useHook from "./hook";

const DashboardScreen = () => {
  const { handleLogout } = useHook();

  const renderRightButton = () => (
    <TouchableOpacity onPress={handleLogout}>
      <Feather name="power" color={Colors.red} size={20} />
    </TouchableOpacity>
  );

  return (
    <Screen
      alignItems="center"
      justifyContent="center"
      header={{ headerTitle: "Wallet", headerRightButton: renderRightButton() }}
    >
      <CustomText mb="40px">Dashboard</CustomText>
    </Screen>
  );
};

export default DashboardScreen;
