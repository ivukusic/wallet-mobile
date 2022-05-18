import { Button } from "~/components/Button";
import { CustomText } from "~/components/CustomText";
import { Screen } from "~/components/Screen";

import useHook from "./hook";

const LoginScreen = () => {
  const { handleLogin } = useHook();

  return (
    <Screen alignItems="center" justifyContent="center">
      <CustomText mb="100px">Login</CustomText>
      <Button label="Login" onPress={handleLogin} type="primary" />
    </Screen>
  );
};

export default LoginScreen;
