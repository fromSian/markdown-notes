import AccountTypeConvert from "./account-type-convert";
import Info from "./info";
import PasswordChange from "./password-change";

const Account = () => {
  return (
    <>
      <Info />

      <PasswordChange />
      <AccountTypeConvert />
    </>
  );
};

export default Account;
