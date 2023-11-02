"use server";

import { getUserAuth } from "@/lib/auth";
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
