"use client";

import { createPost } from "@/app/posts/actions";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/navigation";
import { InputTags } from "@/components/ui/input-tags";
import { Spinner } from "@/components/ui/spinner";

export default function AddPost() {
  const initialState = {
    message: null,
    postCreationSuccess: false,
    resetKey: null,
  };

  const { pending } = useFormStatus();

  const [state, formAction] = useFormState(createPost, initialState);
  const [open, setOpen] = React.useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (state.postCreationSuccess) {
      setOpen(false);
      router.push("/");
    }
  }, [state.postCreationSuccess, state.resetKey]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>
            <Typography element="p" as="p" className="text-red-600">
              {state?.message}
            </Typography>
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                defaultValue=""
                name="title"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Content
              </Label>
              <Textarea id="text" name="text" className="col-span-3" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mediaFile" className="text-right">
              Upload Media
            </Label>
            <Input
              id="mediaFile"
              defaultValue=""
              name="mediaFile"
              className="col-span-3"
              type="file"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 mt-5">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <input type="hidden" value={tags} id="tags" name="tags" />
            <InputTags
              value={tags}
              onChange={setTags}
              placeholder="Enter tags, comma separated..."
              className="col-span-3"
            />
          </div>
        </form>
        <DialogFooter>
          {pending && (
            <div className="flex items-center gap-3">
              <Spinner size="large" />
            </div>
          )}
          <Button
            type="submit"
            disabled={pending}
            className="disabled:opacity-75"
            onClick={() => {
              document.forms[0].requestSubmit();
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
