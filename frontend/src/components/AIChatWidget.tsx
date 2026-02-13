import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAIChat } from "../hooks/useAI";
import { cn } from "../lib/utils";

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const { messages, loading, sendMessage } = useAIChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const message = inputMessage;
    setInputMessage("");

    try {
      await sendMessage(message, "student");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <Card className="w-[350px] h-[500px] mb-4 shadow-xl border-primary/20 flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300">
          <CardHeader className="bg-primary/5 border-b p-4 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-primary/20">
                <AvatarImage
                  src="/lovable-uploads/2706d861-1f9e-4176-88b9-46747df3884b.png"
                  alt="AI"
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  AI
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-bold">
                  E d u P r e d i c t ▫️A s s i s t a n t
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Always here to help!
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="p-0 flex-1 overflow-hidden relative">
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto p-4 space-y-4"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 text-muted-foreground space-y-2 opacity-70">
                  <MessageSquare className="h-12 w-12 text-primary/20" />
                  <p className="text-sm">
                    Hi there! I'm your AI success coach.
                  </p>
                  <p className="text-xs">
                    Ask me about your grades, study tips, or just chat!
                  </p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex w-full mb-2",
                      msg.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted text-foreground rounded-bl-none",
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}

              {loading && (
                <div className="flex justify-start w-full">
                  <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-2 flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-3 bg-background border-t">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={loading}
                className="flex-1 focus-visible:ring-1 focus-visible:ring-primary/50"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputMessage.trim() || loading}
                className="bg-primary hover:bg-primary/90 transition-colors"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 bg-primary text-primary-foreground rounded-xl border-4 border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center transition-all hover:scale-110 active:scale-95 hover:bg-primary/90 group"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />

          {/* Tooltip */}
          <span className="absolute -top-10 right-0 bg-comic-black text-white text-xs font-comic font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with AI
          </span>
        </button>
      )}
    </div>
  );
}
