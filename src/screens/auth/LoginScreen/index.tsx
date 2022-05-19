import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { CustomText } from "~/components/CustomText";
import { Input } from "~/components/Input";
import { Screen } from "~/components/Screen";

import useHook from "./hook";

const LoginScreen = () => {
  const { top } = useSafeAreaInsets();
  const { error, fieldProps, formik, loading } = useHook();

  return (
    <Screen mode="scroll" alignItems="center" mt={`${top + 20}px`}>
      <CustomText mb="10px" type="h4">
        Welcome back!
      </CustomText>
      <CustomText mb="40px">Log in into your account</CustomText>

      <Input
        label="First name"
        placeholder="Enter first name"
        required
        {...fieldProps("firstName")}
      />
      <Input
        label="Last name"
        placeholder="Enter last name"
        required
        {...fieldProps("lastName")}
      />

      <Input
        label="Email"
        placeholder="Enter email address"
        required
        {...fieldProps("email")}
      />

      <Container mt="30px" width="100%">
        <Button
          label="Login"
          loading={loading}
          onPress={formik.submitForm}
          type="primary"
        />
      </Container>

      {!!error && <CustomText mb="100px">{error}</CustomText>}
    </Screen>
  );
};

export default LoginScreen;
