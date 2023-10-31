"use client";

import { AutoTextarea, useConversationManager } from "@chatbotkit/react";
import FormButton from "./ui/FormButton";

export default function ChatBox({ createChatbotSessionAction }: any) {
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

  function handleOnKeyDown(event: any) {
    // Detect the enter key.

    if (event.keyCode === 13) {
      event.preventDefault();

      // Call the interact method to exchange the message between the user and
      // the bot.

      interact();
    }
  }

  return (
    <div>
      {conversationId && token ? (
        <>
          <div>
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
          <AutoTextarea
            value={text}
            onChange={(e: any) => setText(e.target.value)}
            onKeyDown={handleOnKeyDown}
          />
        </>
      ) : (
        <form
          action={async () => {
            const data = await createChatbotSessionAction();
            setConversationId(data.conversationId);
            setToken(data.token);
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
