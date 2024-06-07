"use client";

import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import uniqid from "uniqid";

import Modal from "./Modal";
import useLibraryModal from "@/hooks/useLibraryModal";
import Input from "./Input";
import AuthButton from "./AuthButton";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

const LibraryModal = () => {
  const router = useRouter();
  const supabaseClient = createClientComponentClient();
  const userContext = useUser();
  const { isOpen, onClose } = useLibraryModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      song: null,
      author: null,
      title: null,
      image: null,
    },
  });

  const onSumbit: SubmitHandler<FieldValues> = async (
    values
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      const uid = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("song")
        .upload(`song-${values.title}-${uid}`, songFile, {
          upsert: false,
        });

      if (songError) {
        console.log(songError.message);
        toast.error("Uh oh, the song could not be uploaded");
        return;
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("image")
          .upload(`image-${values.title}-${uid}`, imageFile, {
            upsert: false,
          });

      if (imageError) {
        console.log(imageError.message);
        toast.error("Uh oh, the image could not be uploaded");
        return;
      }

      const dbSongData = {
        author: values.author,
        user_id: userContext!.user!.id,
        image_path: imageData.path,
        song_path: songData.path,
        title: values.title,
      };

      const { error: dbSongError } = await supabaseClient
        .from("songs")
        .insert(dbSongData);

      if (dbSongError) {
        console.log(dbSongError.message);
        toast.error("Uh oh, the song data could not be uploaded");
      }

      toast.success("Upload succeed");
    } catch (err) {
      console.log(err);
      toast.error("Uh oh, something went wrong");
    } finally {
      setIsLoading(false);
      reset();
      onClose();
      router.refresh();
    }
  };

  return (
    <Modal
      title="Upload your songs"
      isOpen={isOpen}
      onOpenChange={onChange}
      description="Select your mp3 file(s)"
    >
      <form
        onSubmit={handleSubmit(onSumbit)}
        className={twMerge("flex flex-col gap-y-4", isLoading && "opacity-40")}
      >
        <Input
          id="title"
          placeholder="Song title"
          type="text"
          disabled={isLoading}
          className="px-3  focus:-translate-y-1 focus:px-5 focus:placeholder:px-0"
          {...register("title", { required: true })}
        />
        <Input
          id="author"
          placeholder="Song author"
          type="text"
          disabled={isLoading}
          className="px-3  focus:-translate-y-1 focus:px-5 focus:placeholder:px-0"
          {...register("author", { required: true })}
        />
        <div>
          <p className="mb-2 text-sm font-semibold text-white">Song mp3 file</p>
          <Input
            id="song"
            placeholder="Song file"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            className=""
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-white">
            Song image file
          </p>
          <Input
            id="image"
            placeholder="Song Image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <AuthButton className="mt-8 font-bold bg-green-500">Upload</AuthButton>
      </form>
    </Modal>
  );
};

export default LibraryModal;
