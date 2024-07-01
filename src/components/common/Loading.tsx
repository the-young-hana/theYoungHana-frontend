import cn from "../../utils/cn";

interface LoadingProps {
  show: boolean;
  label?: string;
}

export const Loading = ({ show, label = "" }: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex absolute top-0 left-0 w-iPhone h-iPhone z-30 rounded-3xl transition-opacity justify-center items-center  backdrop-blur-sm bg-black/70",
        show
          ? "pointer-events-auto"
          : "pointer-events-none opacity-0 delay-500",
      )}
    >
      <div className="flex flex-row">
        <div className="w-3 h-3 rounded-full bg-hanaGreen animate-[bounce_1s_infinite]" />
        <div className="w-3 h-3 rounded-full bg-hanaGreen animate-[bounce_1s_infinite_100ms]" />
        <div className="w-3 h-3 rounded-full bg-hanaGreen animate-[bounce_1s_infinite_200ms]" />
      </div>
      <span className="text-white">{label}</span>
    </div>
  );
};
