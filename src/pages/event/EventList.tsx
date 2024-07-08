import { useEffect, useRef, useState } from "react";
import ApiClient from "../../apis/apiClient";
import { NavigationBar } from "../../components/common/NavigationBar";
import { EventList } from "../../components/event/EventList";
import { Button } from "../../components/common/Button";
import { FiPlus } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { dateToString } from "../../utils/date";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { IoAlertCircleOutline } from "react-icons/io5";

export default function EventIng() {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setLoading] = useState<boolean>(false);
  const [eventList, setEventList] = useState<EventListType[]>([]);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setPage({ page: 1, hasMore: true });
    setEventList([]);
    getEventList("", location.pathname.includes("end"));
  }, [location.pathname]);

  const { lastStoryElementRef, page, setPage } = useInfiniteScroll({
    observer,
  });

  const getEventList = async (keyword: string, end: boolean) => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getEventList({
        value: keyword,
        isEnd: end,
        page: page.page,
      });
      if (res.data) {
        if (page.page === 1) setEventList(res.data);
        else setEventList((prevList) => [...prevList, ...(res.data || [])]);
        setPage((prev) => ({ ...prev, hasMore: res.data?.length! >= 10 }));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventList("", location.pathname.includes("end"));
  }, [page.page]);

  const onClickSearch = () => {
    const keyword = searchRef.current!.value;
    setEventList([]);
    setPage({ page: 1, hasMore: true });
    getEventList(keyword, location.pathname.includes("end"));
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

        {eventList && eventList.length === 0 ? (
          <div className="flex flex-col items-center gap-2 bg-white py-8 min-h-[640px]">
            <IoAlertCircleOutline size={48} color="gray" />
            <p>조회 결과가 없어요.</p>
          </div>
        ) : (
          eventList.map((list, index) => (
            <div
              key={index}
              ref={eventList.length === index + 1 ? lastStoryElementRef : null}
            >
              <EventList
                eventId={list.eventIdx}
                category={list.eventType}
                title={list.eventTitle}
                type={list.eventType}
                date={dateToString(new Date(list.eventStart))}
              />
            </div>
          ))
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
}
