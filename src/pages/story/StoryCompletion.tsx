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
      <div className="bg-white h-full">
        <div className="absolute top-36 left-[5.5rem] flex flex-col items-center">
          <img src="/images/storycompletion.png" alt="storycompletion" />
          <div className="text-xl font-bold">
            {location.state === "postStory"
              ? "스토리 저장 완료"
              : "스토리 수정 완료"}
          </div>
        </div>
        <Button
          className="absolute bottom-8 w-full"
          onClick={() => navigate(`/story/${getCookie("deptIdx")}/stories`)}
        >
          스토리 바로가기
        </Button>
      </div>
    </>
  );
}

export default StoryCompletion;
