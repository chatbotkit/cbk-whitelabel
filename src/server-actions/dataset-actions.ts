"use server";

import { getUserAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createDatasetAction(formData: FormData) {
  const { token } = await getUserAuth();
  let datasetId;
  const name = formData.get("name");
  const description = formData.get("description");

  try {
    const datasetRes = await fetch(
      `${process.env.CHATBOTKIT_API}/dataset/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      }
    );

    const datasetData = await datasetRes.json();
    datasetId = datasetData.id;
  } catch (error) {
    console.error(error);
    return {
      error: {
        message: "Something went wrong. Please try again!",
      },
    };
  }

  redirect(`/dashboard/datasets/${datasetId}`);
}

export async function createDatasetRecord(
  formData: FormData,
  datasetId: string
) {
  const { token } = await getUserAuth();
  const text = formData.get("text");

  try {
    const datasetRes = await fetch(
      `${process.env.CHATBOTKIT_API}/dataset/${datasetId}/record/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text,
        }),
      }
    );

    await datasetRes.json();
  } catch (error) {
    console.error(error);
    return {
      error: {
        message: "Something went wrong. Please try again!",
      },
    };
  }

  revalidatePath(`/dashboard/datasets/${datasetId}`);
}
