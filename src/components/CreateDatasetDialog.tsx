"use client";

import { useState, FormEvent } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import { Button, buttonVariants } from "@/components/ui/Button";

export default function CreateDatasetDialog() {
  const [datasetState, setDatasetState] = useState({
    name: "",
    description: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { name, description } = datasetState;
  }

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        Create Dataset
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a dataset</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium block mb-2">
              Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Give your dataset a name"
              onChange={(e) =>
                setDatasetState({ ...datasetState, name: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium block mb-2"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Give your dataset a description"
              value={datasetState.description}
              onChange={(e) =>
                setDatasetState({
                  ...datasetState,
                  description: e.target.value,
                })
              }
            ></Textarea>
          </div>
          <div className="flex items-center justify-end space-x-3 pt-4">
            <DialogClose className={buttonVariants({ variant: "outline" })}>
              Cancel
            </DialogClose>
            <Button
              disabled={!datasetState.name || !datasetState.description}
              type="submit"
            >
              Create chatbot
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
