import { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { apiRequest } from "@/lib/api";
import { toast } from "sonner";

type Message = {
  id: string;
  text: string;
  sender: "user" | "park";
  timestamp: Date;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 I'm Park, your AI assistant at Spark Consulting. How can I help you today?",
      sender: "park",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await apiRequest("/chat/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
        }),
      });

      const parkMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.reply || "Sorry, I couldn't process your message.",
        sender: "park",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, parkMessage]);
    } catch (error) {
      toast.error("Failed to get response from Park");
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-40 group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
        {!isMobile && (
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with Park
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-96 h-[100dvh] md:h-[600px] bg-white dark:bg-slate-950 rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col z-50 border border-border md:border">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-t-2xl p-3 md:p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-sm md:text-lg font-bold text-primary">P</span>
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm md:text-base">Park</h3>
            <p className="text-blue-100 text-xs">Spark Consulting AI</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white hover:bg-opacity-20 p-1.5 md:p-2 rounded-lg transition flex-shrink-0"
          aria-label="Close chat"
        >
          <X className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] md:max-w-xs px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm ${
                message.sender === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-gray-100 dark:bg-slate-800 text-foreground rounded-bl-none"
              }`}
            >
              <p className="leading-relaxed">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-slate-800 px-3 md:px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "100ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t border-border p-3 md:p-4 flex-shrink-0 bg-white dark:bg-slate-950">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isMobile ? "Message..." : "Ask Park anything..."}
            className="flex-1 px-3 md:px-4 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-primary text-white p-1.5 md:p-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition flex-shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
