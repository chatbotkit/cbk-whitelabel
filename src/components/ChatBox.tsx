"use client";

import { useConversationManager } from "@chatbotkit/react";
import FormButton from "./ui/FormButton";
import { Button } from "./ui/Button";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { Slider } from "./ui/Slider";
import { useState } from "react";
import { createChatbotSessionAction } from "@/server-actions/chatbot-actions";
import { toast } from "sonner";

export default function ChatBox() {
  const {
    conversationId,
    setConversationId,

    token,
    setToken,

    text,
    setText,

    messages,

    thinking,

    interact,
  } = useConversationManager({ stream: true });

  const [temp, setTemp] = useState<number>(0.7);
  const [responseLength, setResponseLength] = useState<number>(256);

  return (
    <div>
      {conversationId && token ? (
        <div className="grid grid-cols-4 gap-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              interact();
            }}
            className="border border-zinc-200 p-6 rounded-xl shadow-md col-span-3"
          >
            <div className="h-[25rem]">
              {messages.map(({ id, type, text }) => {
                switch (type) {
                  case "user":
                    return <div key={id}>user: {text}</div>;

                  case "bot":
                    return <div key={id}>bot: {text}</div>;
                }
              })}
              {thinking ? <div key="thinking">bot: thinking...</div> : null}
            </div>
            <div className="relative">
              <input
                value={text}
                className="flex h-12 w-full rounded-lg border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 border-zinc-200 shadow transition duration-150"
                placeholder="Say something..."
                onChange={(e: any) => setText(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!text}
                className="h-8 w-8 absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <PaperAirplaneIcon className="h-3 w-3" />
              </Button>
            </div>
          </form>
          <div className="w-full">
            <h2>Parameters</h2>
            <p className="text-zinc-500 text-sm">
              Adjust your model paramaters
            </p>
            <div className="h-[1px] w-full bg-zinc-200 my-6" />
            <div className="flex flex-col gap-4">
              <div className="mb-2">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm">Temperature</h2>
                  <div className="text-sm border border-zinc-200 px-2 py-1 rounded-md shadow">
                    {temp}
                  </div>
                </div>
                <Slider
                  max={2}
                  defaultValue={[temp]}
                  step={0.01}
                  onValueChange={(value) => setTemp(value[0])}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm">Response Length</h2>
                  <div className="text-sm border border-zinc-200 px-2 py-1 rounded-md shadow">
                    {responseLength}
                  </div>
                </div>
                <Slider
                  max={2048}
                  defaultValue={[responseLength]}
                  step={1}
                  onValueChange={(value) => setResponseLength(value[0])}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form
          action={async () => {
            const { conversationId, token, error } =
              await createChatbotSessionAction();
            if (error) {
              toast.error(error.message);
            } else {
              setConversationId(conversationId);
              setToken(token);
            }
          }}
        >
          <FormButton pendingText="Creating Session" type="submit">
            Start Chat
          </FormButton>
        </form>
      )}
    </div>
  );
}
