import { useState } from "react";
import { NavigationBar } from "../../components/common/NavigationBar";
import { TopBar } from "../../components/common/TopBar";

import { EventList } from "../../components/event/EventList";
import { Button } from "../../components/common/Button";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MenuBar } from "../../components/common/MenuBar";

const lists = [
  {
    category: "공지",
    title: "컴퓨터공학과 2학기 종강총회",
    type: "선착",
    date: "24년 12월 13일",
  },
  {
    category: "행사",
    title: "2024 가을 엠티 신청",
    type: "응모",
    date: "24년 8월 22일",
  },
  {
    category: "공지",
    title: "컴퓨터공학과 2학기 개강총회",
    type: "신청",
    date: "24년 9월 12일",
  },
];

const endLists = [
  {
    category: "공지",
    title: "컴퓨터공학과 1학기 종강총회",
    type: "선착",
    date: "24년 6월 13일",
  },
  {
    category: "응모",
    title: "근화제 컴퓨터공학과 주점 좌석 추첨",
    type: "응모",
    date: "24년 4월 22일",
  },
  {
    category: "행사",
    title: "2024 IT 전공 연합 엠티 신청",
    type: "응모",
    date: "24년 4월 22일",
  },
  {
    category: "공지",
    title: "컴퓨터공학과 1학기 종강총회",
    type: "신청",
    date: "24년 4월 12일",
  },
  {
    category: "공지",
    title: "컴퓨터공학과 1학기 종강총회",
    type: "선착",
    date: "24년 6월 13일",
  },
  {
    category: "응모",
    title: "근화제 컴퓨터공학과 주점 좌석 추첨",
    type: "응모",
    date: "24년 4월 22일",
  },
  {
    category: "행사",
    title: "2024 IT 전공 연합 엠티 신청",
    type: "응모",
    date: "24년 4월 22일",
  },
  {
    category: "공지",
    title: "컴퓨터공학과 1학기 종강총회",
    type: "신청",
    date: "24년 4월 12일",
  },
  {
    category: "공지",
    title: "컴퓨터공학과 1학기 종강총회",
    type: "선착",
    date: "24년 6월 13일",
  },
  {
    category: "응모",
    title: "근화제 컴퓨터공학과 주점 좌석 추첨",
    type: "응모",
    date: "24년 4월 22일",
  },
  {
    category: "행사",
    title: "2024 IT 전공 연합 엠티 신청",
    type: "응모",
    date: "24년 4월 22일",
  },
  {
    category: "공지",
    title: "컴퓨터공학과 1학기 종강총회",
    type: "신청",
    date: "24년 4월 12일",
  },
];
export const Event = () => {
  const navigate = useNavigate();
  const [ing, setIng] = useState<boolean>(true);
  return (
    <>
      <TopBar title="이벤트" />
      <div className="bg-white min-h-bottom-screen mb-[107px]">
        <MenuBar menu1="진행중" menu2="종료" one={ing} setOne={setIng} />
        {ing ? (
          <>
            {lists.map((list, index) => (
              <div key={index}>
                <EventList
                  eventId={index}
                  category={list.category}
                  title={list.title}
                  type={list.type}
                  date={list.date}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            {endLists.map((list, index) => (
              <div key={index}>
                <EventList
                  eventId={index}
                  category={list.category}
                  title={list.title}
                  type={list.type}
                  date={list.date}
                />
              </div>
            ))}
          </>
        )}
        <Button
          roundedFull
          className="absolute bottom-32 right-5 !p-2 drop-shadow-3xl"
          onClick={() => navigate("/event/post")}
        >
          <FiPlus size={52} />
        </Button>
      </div>

      <NavigationBar />
    </>
  );
};
