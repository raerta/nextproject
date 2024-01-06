"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import PostItem from "@/app/_components/Posts/PostItem";
import {
  getSinglePostById,
  resetPostState,
} from "@/lib/features/post/postSlice";

export default function PostDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { post, loading, error } = useAppSelector((state) => state.posts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSinglePostById(id));
    }
    return () => {
      dispatch(resetPostState());
    };
  }, [id, dispatch]);

  return loading ? (
    <div>Loading..</div>
  ) : error ? (
    <div>{error.error}</div>
  ) : (
    post && <PostItem post={post} />
  );
}
