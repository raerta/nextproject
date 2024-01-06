import React from "react";
import { IPost } from "@/consts/types/postTypes";
import { formatDate } from "@/utils/formatDate";
import { usePathname, useRouter } from "next/navigation";
import DialogButton from "../UI/DialogButton";
import { useAppDispatch } from "@/lib/hooks";
import { openModal } from "@/lib/features/modal/modalSlice";
import classNames from "classnames";

const PostItem = ({ post }: { post: IPost }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleNavigate = () => {
    if (pathname !== "/postdetails") {
      router.push(`/postdetails?id=${post.id}`);
    }
  };

  const handleDeletePost = () => {
    dispatch(
      openModal({
        modalText: "Are you sure?",
        modalType: "deletePost",
        data: post.id,
      })
    );
  };
  const handleUpdatePost = () => {
    router.push(`/updatepost?id=${post.id}`);
  };

  return (
    <div
      className={classNames(
        "max-w-xs bg-white rounded-xl shadow-lg transform transition duration-500  mx-auto w-full pb-2",
        {
          "hover:scale-105": pathname !== "/postdetails",
          "hover:shadow-2xl": pathname !== "/postdetails",
        }
      )}
    >
      <div className="w-full h-60">
        <img
          onClick={handleNavigate}
          className="w-full h-full cursor-pointer object-cover rounded-t-xl"
          src={post.image}
          alt={post.text}
        />
      </div>
      <div className="flex px-4 mt-3 justify-between">
        <div className="flex items-center space-x-2">
          <img
            className="w-10 h-10 rounded-full"
            src={post.owner.picture}
            alt={post.owner.firstName}
          />
          {pathname !== "/postlist/user" ? (
            <a
              href={`/postlist/user?id=${post.owner.id}`}
              className="text-gray-800 font-bold cursor-pointer hover:text-indigo-500"
            >
              {post.owner.firstName} {post.owner.lastName}
            </a>
          ) : (
            <p className="text-gray-800 font-bold">
              {post.owner.firstName} {post.owner.lastName}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <div className="flex space-x-1 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>{post.likes}</span>
          </div>
        </div>
      </div>
      <div className="px-3 mt-3 flex flex-col gap-y-3 w-full h-full">
        <p className="text-sm antialiased text-stone-700">{post.text}</p>
        <p className="mb-2 text-gray-700/90 text-xs">
          Published: {formatDate(post.publishDate)}
        </p>
        <div className="flex gap-2">
          {post.tags.map((item) => (
            <a
              href={`/postlist/tag?id=${item}`}
              className="text-xs text-gray-500 hover:text-indigo-500"
              key={item}
            >
              #{item}
            </a>
          ))}
        </div>
        {pathname == "/postdetails" && post.link && (
          <a
            className=" text-xs text-gray-500"
            href={post.link}
            target="_blank"
          >
            {post.link}
          </a>
        )}
        {pathname == "/postdetails" && (
          <DialogButton handler={handleDeletePost}>Delete Post</DialogButton>
        )}
        {pathname == "/postdetails" && (
          <DialogButton handler={handleUpdatePost}>Update Post</DialogButton>
        )}
      </div>
    </div>
  );
};

export default PostItem;
