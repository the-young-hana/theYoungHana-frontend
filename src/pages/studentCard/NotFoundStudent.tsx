import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";
import { Button } from "../../components/common/Button";

function NotFoundStudent() {
  const navigate = useNavigate();

  return (
    <>
      <TopBar title="더영하나" />
      <div className="flex justify-center h-full">
        <div className="flex flex-col justify-center items-center h-5/6 gap-8 mx-4">
          <img src="/images/sorry.png" alt="storycompletion" />
          <div className="flex flex-col items-center text-xl font-bold">
            <div>더영하나 서비스는</div>
            <div>제휴된 대학의 학생만 접근할 수 있습니다.</div>
          </div>
        </div>
        <Button
          className="absolute bottom-8 !px-28"
          onClick={() => navigate("/")}
        >
          메인으로 가기
        </Button>
      </div>
    </>
  );
}

export default NotFoundStudent;
