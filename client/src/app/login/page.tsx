import { signInWithGoogle } from "./actions";
import { Submit } from "./sumbit";

const Login = () => {
  return (
    <main className="flex items-center justify-center h-dvh flex-col gap-4 !w-full">
      <form action={signInWithGoogle} className="w-full max-w-[300px]">
        <Submit />
      </form>
    </main>
  );
};

export default Login;
