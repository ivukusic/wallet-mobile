import { Feather } from "@expo/vector-icons";

import { Screen } from "~/components/Screen";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { Colors } from "~/themes";

import AccountHeader from "./components/AccountHeader";
import TransactionList from "./components/TransactionList";
import useHook from "./hook";
import { SendButton } from "./styles";

const DashboardScreen = () => {
  const { handleLogout, handleSend } = useHook();

  const renderRightButton = () => (
    <TouchableOpacity onPress={handleLogout}>
      <Feather name="power" color={Colors.red} size={20} />
    </TouchableOpacity>
  );

  return (
    <Screen
      header={{ headerTitle: "Wallet", headerRightButton: renderRightButton() }}
      p="0px"
    >
      <AccountHeader />
      <TransactionList />

      <SendButton onPress={handleSend}>
        <Feather name="send" color={Colors.white} size={30} />
      </SendButton>
    </Screen>
  );
};

export default DashboardScreen;
