import React, { useState } from "react";

import { useForm, FieldValues ,SubmitHandler} from "react-hook-form";

import Modal from "./Modal";
import useLibraryModal from "@/hooks/useLibraryModal";
import Input from "./Input";
import AuthButton from "./AuthButton";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { useSupabaseClient} from "@supabase/auth-helpers-react";
import uniqid from 'uniqid'
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

const LibraryModal = () => {
  const router=useRouter()
  const userContext=useUser()
  const supabase=useSupabaseClient()
  const { isOpen, onClose } = useLibraryModal();
  const [isLoading,setIsLoading]=useState<boolean>(false)
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

  const onSumbit:SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true)
    try{  
      const imageFile=values.image[0]
      const songFile=values.song[0]

      if(!imageFile||!songFile){
        return toast.error("Please select choose proper file(s)")
      }

      const uniqueID=uniqid();

      const {
        data:songData,
        error:songError
      }=await supabase.storage.from('song').upload(`song-${values.title}-${uniqueID}`,songFile,{
        cacheControl:'3600',
        upsert:false,
      })

      if(songError){
        return toast.error('Something went wrong on uploading the song file')
      }

      const {
        data:imageData,
        error:imageError,
      }=await supabase.storage.from('image').upload(`image-${values.title}-${uniqueID}`,imageFile,{
        cacheControl:'3600',
        upsert:false,
      })

      if(imageError){
        console.log(imageError)
        return toast.error("Something went wrong on uploading the image file")
      }

      const {
        error:supabaseError
      }=await supabase.from('songs').insert({
        title:values.title,
        author:values.author,
        user_id:userContext!.user!.id,
        image_path: imageData.path,
        song_path:songData.path,
      })

      if(supabaseError){
        toast.error("Something went wrong on database query")
      }
      router.refresh()
      onClose()
      toast.success("Song uploaded")

    }catch(err){
      toast.error("Uh-oh something went wrong")
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <Modal
      title="Upload your songs"
      isOpen={isOpen}
      onOpenChange={onChange}
      description="Select your mp3 file(s)"
    >
      <form onSubmit={handleSubmit(onSumbit)} className={twMerge("flex flex-col gap-y-4",isLoading&&'opacity-40')}>
        <Input
          id="title"
          placeholder="Song title"
          type="text"
          disabled={false}
          className=" focus:-translate-y-1 focus:px-5 px-3 focus:placeholder:px-0"
          {...register("title", { required: true })}
        />
        <Input
          id="author"
          placeholder="Song author"
          type="text"
          disabled={false}
          className=" focus:-translate-y-1 focus:px-5 px-3 focus:placeholder:px-0"
          {...register("author", { required: true })}
        />
        <div>
        <p className="text-sm font-semibold text-white mb-2">Song mp3 file</p>
        <Input
          id="song"
          placeholder="Song file"
          type="file"
          disabled={false}
          accept=".mp3"
          className=""
          {...register("song", { required: true })}
        />
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-2">Song image file</p>
        <Input
          id="image"
          placeholder="Song Image"
          type="file"
          disabled={false}
          accept="image/*"
          {...register("image", { required: true })}
        />
        </div>
        <AuthButton className="bg-green-500 mt-8 font-bold">
          Upload
        </AuthButton>
      </form>
    </Modal>
  );
};

export default LibraryModal;
