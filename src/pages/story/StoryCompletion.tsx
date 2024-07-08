import React from "react";
import { TopBar } from "../../components/common/TopBar";
import { Button } from "../../components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

function StoryCompletion() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <TopBar title="스토리 추가" />
      <div className="flex justify-center h-full">
        <div className="flex flex-col justify-center items-center h-5/6 gap-8 mx-4">
          <img src="/images/storycompletion.png" alt="storycompletion" />
          <div className="flex flex-col items-center text-xl font-bold">
            {location.state === "postStory"
              ? "스토리 저장 완료"
              : "스토리 수정 완료"}
          </div>
        </div>
        <Button
          className="absolute bottom-8 !px-28"
          onClick={() => navigate(`/story/${getCookie("deptIdx")}/stories`)}
        >
          메인으로 가기
        </Button>
      </div>
    </>
  );
}

export default StoryCompletion;
