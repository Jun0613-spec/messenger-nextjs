"use client";

import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";

import MessageInput from "./MessageInput";

import useConversation from "@/app/hooks/useConversation";

import axiosInstance from "@/app/libs/axios";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ""
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axiosInstance.post("/api/messages", {
      ...data,
      conversationId: conversationId
    });
  };

  const handleUpload = (result: any) => {
    axiosInstance.post("/api/messages", {
      image: result.info.secure_url,
      conversationId: conversationId
    });
  };

  return (
    <div
      className="
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="pgc9ehd5"
      >
        <HiPhoto size={30} className="text-orange-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="
            rounded-full 
            p-2 
            bg-orange-500 
            cursor-pointer 
            hover:bg-orange-600 
            transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
