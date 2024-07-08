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
import { Loading } from "../../components/common/Loading";

export default function Transfer() {
  const navigate = useNavigate();
  const { amount, append, remove, add, clear } = useKeypadMappedNumber(0);
  const {
    password,
    remove: removePw,
    append: appendPw,
    clear: clearPw,
  } = usePassword();
  const [isAmountModal, setIsAmountModal] = useState<boolean>(false);
  const [isPasswordModal, setIsPasswordModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [myAccounts, setMyAccounts] = useState<AccountsType[]>([]);
  const [deptInfo, setDeptInfo] = useState<AccountInfoType>();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isPwdCorrect, setIsPwdCorrect] = useState<boolean>(true);

  const getAccounts = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getAccounts();
      if (res.data) {
        setMyAccounts(res.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getDeptAccounts = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getAccountInfo();
      if (res.data) {
        setDeptInfo(res.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const postAccountsPwd = async (accountIdx: number, accountPw: string) => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().postAccountsPwd({
        accountIdx: accountIdx,
        accountPw: accountPw,
      });
      if (res.data?.isPwCorrect) {
        setIsPwdCorrect(true);
        postTransfer();
      } else {
        setIsPwdCorrect(false);
        clearPw();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const postTransfer = async () => {
    try {
      const res = await ApiClient.getInstance().postTransfer({
        myAccountIdx: myAccounts[0].accountIdx,
        amount: amount,
        receiveAccount: deptInfo!.deptAccountNumber,
      });
      if (res.data) {
        setLoading(false);
        navigate("success", {
          state: {
            receiverName: res.data.receiverName,
            amount: res.data.amount,
          },
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccounts();
    getDeptAccounts();
  }, []);

  useEffect(() => {
    if (password.length == 4) {
      postAccountsPwd(myAccounts[0].accountIdx, password);
    }
  }, [password]);

  useEffect(() => {
    if (myAccounts[0]) {
      if (amount > myAccounts[0].accountBalance) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  }, [amount]);

  return (
    <>
      <TopBar title="이체" />
      <div className="flex flex-col justify-between items-center min-h-bottom-screen2 mt-12 pt-5 pb-10">
        <div className="w-full flex flex-col items-center gap-4">
          {/* 내 계좌 정보 */}
          <div className="w-5/6 flex items-center justify-between rounded-md bg-hanaGray p-3">
            <div className="flex gap-3">
              <img src="/images/hanabank.png" className="w-5 h-fit mt-1" />
              <div>
                <div className="font-bold">{myAccounts[0]?.accountName}</div>
                <div className="text-gray-400">
                  {myAccounts[0]?.accountNumber}
                </div>
              </div>
            </div>

            <div className="font-semibold text-sm">
              {myAccounts[0]?.accountBalance.toLocaleString()}원
            </div>
          </div>

          {/* 학과 계좌 정보 */}
          <div className="w-5/6 flex gap-3 border-2 p-2 rounded-lg">
            <img src="/images/hanabank.png" className="w-5 h-fit mt-1" />
            <div>
              <div className="font-semibold">{deptInfo?.deptName}</div>
              <div className="text-gray-500">{deptInfo?.deptAccountNumber}</div>
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
          {!isValid && (
            <div className="flex items-center gap-5 font-light text-sm text-red-600">
              출금계좌 잔액이 부족합니다. <br /> 예약하고 나중에 이체하시겠어요?
              <Button className="bg-white border !px-2 !py-1 !border-hanaGray2 !text-gray-600">
                예약이체
              </Button>
            </div>
          )}
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
          <span className="w-full flex justify-center text-white text-lg font-light mb-2">
            계좌비밀번호
          </span>
          {!isPwdCorrect && (
            <span className="w-full flex justify-center mb-4 text-red-500 font-light text-sm">
              비밀번호를 다시 입력해주세요.
            </span>
          )}

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
      <Loading show={loading} />
    </>
  );
}
