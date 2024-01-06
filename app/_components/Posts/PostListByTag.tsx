"use client";

import { getPostsByTag, resetPostState } from "@/lib/features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { IPost } from "@/consts/types/postTypes";
import { useSearchParams } from "next/navigation";

const PostListByTag = ({ searchQuery }: { searchQuery: string }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const limit = 10;
  const [page, setPage] = useState(0);

  const { posts, error } = useAppSelector((state) => state.posts);

  const allPosts = posts?.data;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getPostsByTag({ id: id, limit: limit, page: page }));
    }
    return () => {};
  }, [dispatch, id, limit, page]);

  useEffect(() => {
    return () => {
      dispatch(resetPostState());
    };
  }, [dispatch]);

  const handleFilter = (item: IPost) => {
    const searchTerm = searchQuery.toLowerCase();
    const name = (
      item.owner.firstName +
      " " +
      item.owner.lastName
    ).toLowerCase();

    const titleSearch =
      searchTerm === "mr"
        ? item.owner.title === "mr"
        : item.owner.title.includes(searchTerm);
        
    const tagsString = item.tags.toString();
    return (
      name.includes(searchTerm) ||
      item.text.includes(searchTerm) ||
      tagsString.includes(searchTerm) ||
      item.id.toLowerCase().includes(searchTerm) ||
      titleSearch
    );
  };

  const filteredPosts = searchQuery.length
    ? allPosts?.filter(handleFilter)
    : allPosts;

  const maximumPage = posts?.total && Math.floor(posts.total / limit);

  const handleNext = () => {
    if (page === maximumPage || posts?.total === limit) return;
    setPage((prev) => prev + 1);
  };

  return error ? (
    <div>{error.error}</div>
  ) : (
    posts && filteredPosts && (
      <InfiniteScroll
        className="grid lg:grid-cols-3 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-10 pr-2"
        style={{ overflow: "revert !important" }}
        dataLength={posts?.total - page * limit}
        pullDownToRefreshThreshold={50}
        next={handleNext}
        hasMore={page !== maximumPage && posts?.total !== limit}
        loader={
          <>
            <div>Loader</div>
            <div>Loader</div>
            <div>Loader</div>
          </>
        }
      >
        {filteredPosts.map((item) => (
          <PostItem post={item} key={item.id} />
        ))}
      </InfiniteScroll>
    )
  );
};

export default PostListByTag;
