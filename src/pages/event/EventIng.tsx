import { useEffect, useRef, useState } from "react";
import ApiClient from "../../apis/apiClient";
import { NavigationBar } from "../../components/common/NavigationBar";
import { EventList } from "../../components/event/EventList";
import { Button } from "../../components/common/Button";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { formatter2 } from "../../utils/dateTimeformat";

export default function EventIng() {
  const navigate = useNavigate();
  const [, setLoading] = useState<boolean>(false);
  const [eventList, setEventList] = useState<EventListType[]>();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const getEventList = async (keyword: string) => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getEventList({
        value: keyword,
        isEnd: false,
        page: 1,
      });
      if (res.data) {
        console.log(res.data);
        setEventList(res.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventList("");
    console.log(eventList);
  }, []);

  const onClickSearch = () => {
    const keyword = searchRef.current!.value;
    getEventList(keyword);
  };

  return (
    <>
      <div className="bg-white min-h-bottom-screen mb-[107px]">
        <div className="flex justify-center w-full bg-gray-100">
          <div className="flex  items-center w-full bg-white mx-7 my-3 rounded-xl py-3 px-5">
            <input
              type="text"
              placeholder="이벤트명을 입력하세요"
              className="w-full"
              ref={searchRef}
            />
            <IoSearch
              size={23}
              onClick={onClickSearch}
              className="cursor-pointer"
            />
          </div>
        </div>

        {eventList &&
          eventList.map((list, index) => (
            <div key={index}>
              <EventList
                eventId={list.eventIdx}
                category={list.eventType}
                title={list.eventTitle}
                type={list.eventType}
                date={formatter2(list.eventStart)}
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
}
