"use server";

import { getUserAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createChatbotAction(formData: FormData) {
  const { token } = await getUserAuth();
  let botId;
  const name = formData.get("name");
  const backstory = formData.get("backstory");
  const model = formData.get("model");

  try {
    const botRes = await fetch(`${process.env.CHATBOTKIT_API}/bot/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        // description: description,
        backstory: backstory,
        model: model,
        // datasetId: datasetId,
        // skillsetId: skillsetId,
        // visibility: "public",
        // meta: {},
      }),
    });

    const botData = await botRes.json();
    botId = botData.id;
  } catch (error) {
    console.error(error);
    return {
      error: {
        message: "Something went wrong. Please try again!",
      },
    };
  }

  redirect(`/dashboard/bots/${botId}`);
}

export async function deleteChatbotAction(id: string) {
  const { token } = await getUserAuth();

  try {
    await fetch(`${process.env.CHATBOTKIT_API}/bot/${id}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: {
        message: "Something went wrong. Please try again!",
      },
    };
  }

  revalidatePath("/dashboard/bots");
}
