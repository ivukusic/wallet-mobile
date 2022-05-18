import { Button } from "~/components/Button";
import { CustomText } from "~/components/CustomText";
import { Screen } from "~/components/Screen";

import useHook from "./hook";

const CurrencyScreen = () => {
  const { handleSave } = useHook();

  return (
    <Screen alignItems="center" justifyContent="center">
      <CustomText mb="100px">Currency</CustomText>
      <Button label="Dashboard" onPress={handleSave} type="primary" />
    </Screen>
  );
};

export default CurrencyScreen;
