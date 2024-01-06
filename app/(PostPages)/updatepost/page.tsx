"use client";

import React, { useCallback, useEffect, useReducer, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Form from "@components/Form/Form";
import Input from "@components/Form/Input";
import { openModal } from "@/lib/features/modal/modalSlice";
import { useSearchParams } from "next/navigation";
import { ICreateAndUpdatePost } from "@/consts/types/postTypes";
import {
  getSinglePostById,
  resetPostState,
  updatePostAction,
} from "@/lib/features/post/postSlice";
import DialogButton from "@/app/_components/UI/DialogButton";

const CreatePost = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { postUpdated, post } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSinglePostById(id));
    }
    return () => {
      dispatch(resetPostState());
    };
  }, [id]);

  useEffect(() => {
    if (post) {
      setTags(post.tags);
      for (const [key, value] of Object.entries(post)) {
        if (value !== null) {
          dispatcher({ [key]: value });
        }
      }
    }

    return () => {};
  }, [post]);

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>(post?.tags || []);

  const initialForm: ICreateAndUpdatePost = {
    text: post?.text || "",
    image: post?.image || "",
    likes: post?.likes || 0,
    tags: post?.tags || [""],
    link: post?.link || "",
    id: id || "",
  };

  const [state, dispatcher] = useReducer(
    (state: ICreateAndUpdatePost, updates: any) => ({ ...state, ...updates }),
    initialForm
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "likes") {
      if (value < 0) {
        return;
      }
    }
    dispatcher({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (tags.length) {
      dispatch(updatePostAction({ ...state, tags: tags }));
    } else {
      dispatch(
        openModal({
          modalText: "tags are required. please add a tag.",
          modalType: "infoModal",
        })
      );
    }
  };

  const handleChangeTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const addTag = () => {
    if (!tags.includes(tag) && tag.length) {
      setTags((prev) => {
        return [...prev, tag];
      });
      setTag("");
    }
  };

  useEffect(() => {
    if (postUpdated) {
      dispatch(
        openModal({ modalText: "post is updated", modalType: "infoModal" })
      );
    }

    return () => {};
  }, [postUpdated]);

  const handleRemoveTag = (item: string) => {
    const filteredTags = tags.filter((elem) => elem !== item);
    setTags(filteredTags);
  };

  if (!id) {
    return <div>post id is required</div>;
  }

  return (
    post && (
      <div className="max-w-md w-full space-y-8 p-10 mt-10 bg-white rounded-xl shadow-lg z-10 mx-auto">
        <div className="grid  gap-8 grid-cols-1">
          <div className="flex flex-col ">
            <div className="flex flex-col sm:flex-row items-center">
              <h2 className="font-semibold text-lg mr-auto">Update Post</h2>
              <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
            </div>
            <div className="mt-5 flex w-full justify-center">
              <Form handleSubmit={handleSubmit}>
                <div className="mb-3 space-y-2 g w-full text-xs">
                  {state.image && (
                    <img
                      className="w-full h-40 object-cover mb-4"
                      src={state.image}
                    />
                  )}
                  <label className="font-semibold text-gray-600 py-2">
                    image url <abbr title="required">*</abbr>
                  </label>
                  <Input
                    handleChange={handleChange}
                    name="image"
                    type="text"
                    value={state.image}
                    placeHolder="Post Image url"
                    required={true}
                  />
                </div>
                <div className="mb-3 space-y-2 w-full text-xs">
                  <label className="font-semibold text-gray-600 py-2">
                    Likes <abbr title="required">*</abbr>
                  </label>
                  <Input
                    handleChange={handleChange}
                    name="likes"
                    type="number"
                    value={state.likes}
                    placeHolder="Your Email"
                    required={true}
                  />
                </div>
                <div className="mb-3 space-y-2 w-full text-xs">
                  <label className="font-semibold text-gray-600 py-2">
                    Link <abbr title="required">*</abbr>
                  </label>
                  <Input
                    handleChange={handleChange}
                    name="link"
                    type="text"
                    value={state.link}
                    placeHolder="Your Link"
                    required={false}
                  />
                </div>
                <div className="mb-3 space-y-2 w-full text-xs">
                  <label className="font-semibold text-gray-600 py-2">
                    Tags <abbr title="required">*</abbr>
                  </label>
                  <div className="flex gap-2 flex-wrap relative">
                    {tags.map((item: string) => (
                      <button
                        className="hover:text-indigo-500 hover:after:content-['*'] relative"
                        onClick={() => handleRemoveTag(item)}
                        key={item}
                      >
                        #{item}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                  <input
                    onChange={handleChangeTagInput}
                    name="tag"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 outline-none focus:ring-2 ring-indigo-600 p-4"
                    type="string"
                    value={tag}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addTag();
                        e.preventDefault();
                      }
                    }}
                    placeholder="enter single tag"
                  />

                  <DialogButton handler={addTag}>add</DialogButton>
                </div>
                </div>
                <div className="mb-3 space-y-2 w-full text-xs flex flex-col">
                  <label className="font-semibold text-gray-600 py-2">
                    Text <abbr title="required">*</abbr>
                  </label>
                  <textarea
                    className="outline-none focus:ring-2 ring-indigo-600 rounded-md p-4"
                    onChange={handleChange}
                    name="text"
                    value={state.text}
                    placeholder="enter your text"
                    rows={5}
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CreatePost;
