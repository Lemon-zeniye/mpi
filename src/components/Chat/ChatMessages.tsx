import { getMessages } from "@/api/chat.api";
import { Message } from "@/types/chat.type";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import ChatMessagesSkeleton from "./ChatMessagesSkeleton";
import styles from "./ChatMessage.module.css";

type ExtractedMessage = {
  id: string;
  type: string;
  content: string;
  time: string;
  sender: string;
  isSender: boolean;
};

const ChatMessages = ({ chatId }: { chatId: string }) => {
  const [user_id, setUserId] = useState<string | undefined>(undefined);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const {
    data: message_datas,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["message", chatId],
    queryFn: () => getMessages(chatId),
    enabled: Boolean(chatId),
    onSuccess: () => {
      setUserId(Cookies.get("user_id"));
    },
  });
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [message_datas]);

  if (isError) {
    return <div>Error loading messages.</div>;
  }

  function extractMessages(
    messages: Message[],
    userId: string
  ): ExtractedMessage[] {
    return messages.map((message) => ({
      id: message.id,
      type: message.content.startsWith("Image: ") ? "image" : "text",
      content: message.content,
      time: new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: `${message.sender.firstName}`,
      isSender: message.sender.id === userId,
    }));
  }

  const messages =
    message_datas && user_id && message_datas.messages
      ? extractMessages(message_datas.messages, user_id)
      : undefined;
  const BASE_URL = "https://mpiglobal.org";
  return (
    <div
      className={`flex flex-col-reverse gap-4 h-[84vh] sm:h-[80vh] md:h-[65vh]  ${styles.customScrollbar}`}
      ref={scrollAreaRef}
      // style={{ height: "467px" }}
    >
      {isLoading ? (
        <ChatMessagesSkeleton />
      ) : messages ? (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isSender ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-xs p-3 rounded-lg">
              <span className="text-lg">{message.time}</span>

              {message.type === "text" && (
                <div
                  className={`py-2 px-4  ${
                    message.isSender
                      ? "bg-[#F2851C]  text-white rounded-md rounded-tr-none"
                      : "bg-[#D8D8D8] text-black rounded-md rounded-tl-none"
                  }`}
                >
                  {message.content}
                </div>
              )}
              {message.type === "image" && (
                <img
                  src={BASE_URL + message.content.replace("Image: ", "")}
                  alt="Chat Image"
                  className="rounded"
                />
              )}
              {message.type === "voice" && (
                <audio controls className="w-full">
                  <source src={message.content} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          </div>
        ))
      ) : (
        "No Message"
      )}
    </div>
  );
};

export default ChatMessages;
