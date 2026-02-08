import { Bell, Check, Info, AlertTriangle, X } from "lucide-react";
import { useMockData } from "@/context/MockDataContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ComicButton from "./ComicButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import StickerBadge from "./StickerBadge";

const AlertsCenter = () => {
  const { notifications, markAsRead } = useMockData();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "alert":
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative inline-flex">
          <ComicButton
            variant="outline"
            size="sm"
            className="w-10 h-10 p-0 rounded-full"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white border-2 border-black">
                {unreadCount}
              </span>
            )}
          </ComicButton>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 border-4 border-black rounded-xl"
        align="end"
      >
        <div className="p-4 border-b-4 border-black bg-secondary">
          <h4 className="font-bangers text-xl">Alerts Center</h4>
          <p className="text-xs font-comic font-bold opacity-80">
            Stay updated, Hero!
          </p>
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground font-comic">
              All quiet on the Western Front! 🦗
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`
                    p-4 text-left border-b-2 border-muted last:border-0 hover:bg-muted/10 transition-colors
                    ${!notification.read ? "bg-muted/5" : "opacity-70"}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1 bg-white rounded-full border-2 border-black flex-shrink-0">
                      {getIcon(notification.type)}
                    </div>
                    <div>
                      <p className="font-comic font-bold text-sm">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-2 font-bold">
                        {notification.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-comic-red border border-black ml-auto mt-2" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default AlertsCenter;
