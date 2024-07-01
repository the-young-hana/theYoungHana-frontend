import { NavigationBar } from "../../components/common/NavigationBar";
import { TopBar } from "../../components/common/TopBar";
import { EventList } from "../../components/event/EventList";
import { Button } from "../../components/common/Button";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

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
export const EventEnd = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white min-h-bottom-screen mb-[107px]">
        <div className="flex justify-center w-full bg-gray-100">
          <div className="flex  items-center w-full bg-white mx-7 my-3 rounded-xl py-3 px-5">
            <input
              type="text"
              placeholder="이벤트명을 입력하세요"
              className="w-full"
            />
            <IoSearch
              size={23}
              onClick={() => console.log("검색")}
              className="cursor-pointer"
            />
          </div>
        </div>

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
