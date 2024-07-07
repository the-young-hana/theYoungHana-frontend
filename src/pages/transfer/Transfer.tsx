import { useEffect, useState } from "react";
import { Keypad } from "../../components/common/Keypad";
import Modal from "../../components/common/Modal";
import { TopBar } from "../../components/common/TopBar";
import useKeypadMappedNumber from "../../hooks/useKeypadMappedNumber";
import { Button } from "../../components/common/Button";
import cn from "../../utils/cn";
import usePassword from "../../hooks/usePassword";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../apis/apiClient";

export default function Transfer() {
  const navigate = useNavigate();
  const { amount, append, remove, add, clear } = useKeypadMappedNumber(0);
  const { password, remove: removePw, append: appendPw } = usePassword();
  const [isAmountModal, setIsAmountModal] = useState<boolean>(false);
  const [isPasswordModal, setIsPasswordModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const postTransfer = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().postTransfer({
        myAccountIdx: 0,
        amount: 0,
        receiveAccount: "string",
        deptIdx: 0,
      });
      if (res.data) {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password.length == 4) {
      console.log("");
      navigate("success");
    }
  }, [password]);

  return (
    <>
      <TopBar title="이체" />
      <div className="flex flex-col justify-between items-center min-h-bottom-screen2 mt-12 pt-5 pb-10">
        <div className="w-full flex flex-col items-center gap-4">
          {/* 내 계좌 정보 */}
          <div className="w-5/6 flex items-center justify-between rounded-md bg-hanaGray p-3">
            <img src="/images/hanabank.png" className="w-5" />
            <div>
              <div className="font-bold">영하나플러스통장</div>
              <div className="text-gray-400">하나 211-910769-98907</div>
            </div>
            <div className="font-semibold text-sm">197,179원</div>
          </div>

          {/* 학과 계좌 정보 */}
          <div className="w-5/6 flex gap-3 border-2 p-2 rounded-lg">
            <img src="/images/hanabank.png" className="w-5 h-fit mt-1" />
            <div>
              <div className="font-semibold">컴퓨터공학과</div>
              <div className="text-gray-500">12591069281234</div>
            </div>
          </div>

          {/* 이체 */}
          <div
            className="text-2xl font-semibold mt-3"
            onClick={() => setIsAmountModal((prev) => !prev)}
          >
            {amount > 0 ? `${amount.toLocaleString()}원` : "얼마를 보낼까요?"}
          </div>
          <div className="w-full flex justify-end px-10 text-sm mt-3 text-gray-600">
            오늘 이체한도 50,000,000원
          </div>
        </div>
        <Button
          disabled={amount < 1}
          roundedFull
          className="!px-36 !py-3 text-xl drop-shadow-md"
          onClick={() => setIsPasswordModal(true)}
        >
          다음
        </Button>
      </div>

      {/* 금액입력 모달 */}
      <Modal
        dark
        hideBackDrop
        show={isAmountModal}
        onClose={() => setIsAmountModal((prev) => !prev)}
        modalType="sheet"
      >
        <div className="w-full flex justify-center -mt-5 font-light text-gray-100">
          얼마를 보낼까요?
        </div>
        <Keypad
          onAdd={add}
          onClear={clear}
          onAppend={append}
          onRemove={remove}
          onDone={() => setIsAmountModal((prev) => !prev)}
        />
      </Modal>

      {/* 계좌비밀번호 모달 */}
      <Modal
        xButton={false}
        show={isPasswordModal}
        modalType="sheet"
        onClose={() => {
          setIsPasswordModal((prev) => !prev);
        }}
        className="!px-0 !pb-0"
      >
        <div className="border-b mx-8 mb-5 pb-5 text-xl text-center justify-center">
          <span className="font-bold">하나은행 컴퓨터공학과</span>님께 <br />
          <span className="font-bold">{amount.toLocaleString()}</span>원을
          이체합니다.
        </div>

        <div className="text-center justify-center border border-hanaGreen rounded-lg py-3 mx-20 my-14 text-lg text-hanaGreen">
          다른 계좌로 추가이체
        </div>

        <div className="relative w-full bg-dark pt-5 rounded-t-3xl">
          <button
            onClick={() => setIsPasswordModal((prev) => !prev)}
            className="absolute text-white left-4"
          >
            <IoClose size={30} />
          </button>
          <span className="w-full flex justify-center text-white text-lg font-light mb-8">
            계좌비밀번호
          </span>
          <div className="flex gap-3 w-full justify-center">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={cn(
                  "w-4 h-4 rounded-full border border-gray-400",
                  password.length > index ? "bg-gray-400" : "",
                )}
              />
            ))}
          </div>
          <Keypad
            type={2}
            onAppend={appendPw}
            onRemove={removePw}
            onAdd={() => {}}
            onClear={() => {}}
            onDone={() => {}}
          />
        </div>
      </Modal>
    </>
  );
}
