import { useState } from "react";
import { NavigationBar } from "../../components/common/NavigationBar";
import { TopBar } from "../../components/common/TopBar";
import { EventBar } from "../../components/event/EventBar";
import { EventList } from "../../components/event/EventList";

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
  const [end, setEnd] = useState<boolean>(false);
  return (
    <>
      <TopBar title="이벤트" />
      <div className="bg-white min-h-bottom-screen mb-[107px]">
        <EventBar end={end} setEnd={setEnd} />
        {!end ? (
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
      </div>

      <NavigationBar />
    </>
  );
};
