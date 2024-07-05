import { useParams } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";
import ApiClient from "../../apis/apiClient";
import { useEffect, useState } from "react";

export default function EventWinner() {
  const params = useParams();
  const [, setLoading] = useState<boolean>(false);
  const [eventWinner, setEventWinner] = useState<WinnerListType[]>();

  const getEventWinner = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getEventWinners(
        Number(params.eventId),
      );
      if (res.data) {
        setEventWinner(res.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventWinner();
  }, []);

  return (
    <>
      <TopBar title="당첨자 명단" back />
      <div className="relative min-h-full w-full bg-white p-5 flex flex-col items-center mt-12">
        {eventWinner && (
          <>
            <img
              src="/images/eventWinner.svg"
              className="absolute top-0 left-0 w-full"
            />
            <div className="mt-[200px] flex flex-col justify-center items-center">
              {eventWinner.map((list) => (
                <>
                  <div className="px-8 py-1 bg-hanaGreen rounded-full text-white font-semibold mb-1">
                    {list.prizeRank}등 {list.prizeName}
                  </div>
                  <div className="mb-5">
                    {list.winnerList.map((winner) => (
                      <div className="flex gap-2">
                        <p className="text-hanaGreen font-semibold">
                          {winner.memberId}
                        </p>
                        <p className="font-semibold">{winner.memberName}</p>
                      </div>
                    ))}
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
