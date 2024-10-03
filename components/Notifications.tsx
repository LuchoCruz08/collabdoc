"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InboxNotification, InboxNotificationList, LiveblocksUIConfig } from "@liveblocks/react-ui";
import { useInboxNotifications, useUnreadInboxNotificationsCount } from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Notifications = () => {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();

  const unreadNotifications = inboxNotifications.filter(
    (notification) => !notification.readAt
  );

  return (
    <Popover>
      <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg hover:bg-gray-800 transition-colors">
        <Bell className="w-6 h-6 text-gray-300" />
        {count > 0 && (
          <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-blue-500 animate-pulse" />
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg"
      >
        <LiveblocksUIConfig
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
              <span className="font-semibold text-blue-400">
                {user} mentioned you.
              </span>
            ),
          }}
        >
          <InboxNotificationList>
            {unreadNotifications.length <= 0 && (
              <p className="py-2 text-center text-gray-400">
                No new notifications
              </p>
            )}

            {unreadNotifications.length > 0 &&
              unreadNotifications.map((notification) => (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                  className="bg-gray-800 text-white p-3 rounded-md mb-2 hover:bg-gray-700 transition-colors"
                  href={`/documents/${notification.roomId}`}
                  showActions={false}
                  kinds={{
                    thread: (props) => (
                      <InboxNotification.Thread
                        {...props}
                        showActions={false}
                        showRoomName={false}
                      />
                    ),
                    textMention: (props) => (
                      <InboxNotification.TextMention
                        {...props}
                        showRoomName={false}
                      />
                    ),
                    $documentAccess: (props) => (
                      <InboxNotification.Custom
                        {...props}
                        title={props.inboxNotification.activities[0].data.title}
                        aside={
                          <InboxNotification.Icon className="bg-transparent">
                            <Avatar>
                              <AvatarImage
                                src={
                                  (props.inboxNotification.activities[0].data
                                    .avatar as string) || ""
                                }
                              />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                          </InboxNotification.Icon>
                        }
                      >
                        {props.children}
                      </InboxNotification.Custom>
                    ),
                  }}
                />
              ))}
          </InboxNotificationList>
        </LiveblocksUIConfig>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
