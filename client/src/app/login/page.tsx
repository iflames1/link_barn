import { signInWithGoogle } from "./actions";
import ConnectWallet from "./connect-wallet";
import { Submit } from "./sumbit";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-dvh flex-col gap-4 !w-full">
      <form action={signInWithGoogle} className="w-full max-w-[300px]">
        <Submit />
      </form>
      {/* <ConnectWallet /> */}
    </div>
  );
};

export default Login;
