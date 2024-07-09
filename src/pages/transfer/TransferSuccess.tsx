import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { TopBar } from "../../components/common/TopBar";
import { CiCircleCheck } from "react-icons/ci";
import { CiStar } from "react-icons/ci";

export default function TransferSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as {
    receiverName: string;
    amount: number;
  };

  return (
    <>
      <TopBar title="이체" isBack={false} />
      <div className="flex flex-col justify-between items-center min-h-bottom-screen2 mt-12 pt-5 pb-10">
        <div className="flex flex-col w-full justify-center items-center text-xl">
          <div className="my-10">
            <CiCircleCheck size={60} />
          </div>
          <span>
            <span className="font-semibold">
              {locationState ? locationState.receiverName : ""}
            </span>
            님께
          </span>
          <span>
            <span className="font-semibold">
              {locationState ? locationState.amount.toLocaleString() : 0}
            </span>
            원이 이체되었습니다.
          </span>

          <div className="flex justify-center mt-20 gap-3 text-base border-b pb-8 w-5/6 ">
            <div className="flex items-center gap-1 border border-gray-300 px-4 py-1 bg-white">
              <CiStar />
              자주쓰는계좌
            </div>
            <div className="border border-gray-300 px-4 py-1 bg-white">
              자동이체등록
            </div>
          </div>
        </div>

        <Button
          roundedFull
          className="!px-36 !py-3 text-xl drop-shadow-md"
          onClick={() => {
            navigate("/");
          }}
        >
          확인
        </Button>
      </div>
    </>
  );
}
