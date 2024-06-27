import { useState } from "react";
import usePassword from "../hooks/usePassword";
import { TopBar } from "../components/common/TopBar";
import { Keypad } from "../components/common/Keypad";
import { Loading } from "../components/common/Loading";
import Check from "../components/common/Check";
import cn from "../utils/cn";
import StatusBar from "../components/common/StatusBar";

export const Login = () => {
  const { password, append, remove, clear } = usePassword();
  const [autoLogin, toggleAutoLogin] = useState<boolean>(true);

  //비밀번호 6글자 되면 로그인 트리거
  // useEffect(() => {
  //   if (password.length == 6) {
  //     const loginReqtDto: LoginReqDto = {
  //       memberIdx: member.memberIdx,
  //       memberLoginPw: password,
  //       fcmToken: localStorage.getItem("fcmToken"),
  //     };
  //     trigger(loginReqtDto);
  //   }
  // }, [password]);

  return (
    <>
      <div className="flex flex-col justify-between h-full bg-dark">
        <StatusBar className="absolute top-0 z-20 !bg-dark font-medium" white />
        <TopBar white bgdark />
        <div className="flex flex-col items-center w-full pt-4">
          <span className="mb-8 text-xl text-white"> 간편비밀번호 입력 </span>
          <div className="flex flex-row gap-4 mb-8">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={cn(
                  "w-4 h-4 rounded-full border border-gray-400",
                  password.length > index ? "bg-gray-400" : "",
                )}
              />
            ))}
          </div>
          <div className="flex flex-row gap-2 mb-4 text-sm text-gray-500">
            <span className="underline">비밀번호 초기화</span>
            <span className="">|</span>
            <span className="underline">다른 로그인방법</span>
          </div>
          <div className="flex flex-row items-center gap-2 text-gray-500">
            <Check
              checked={autoLogin}
              onClick={() => toggleAutoLogin((prev) => !prev)}
            />
            <span>자동 로그인</span>
          </div>
        </div>
        <Keypad
          type={2}
          onAppend={append}
          onRemove={remove}
          onAdd={() => {}}
          onClear={() => {}}
          onDone={() => {}}
        />
      </div>
      <Loading show={false} label="로그인 중 ..." />
    </>
  );
};
