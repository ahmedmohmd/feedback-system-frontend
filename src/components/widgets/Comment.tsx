import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { useMutation } from "react-query";
import commentsService from "../../services/commentsService";
import GlobalContext from "../../utils/globalContext";
import queryClient from "../../utils/queryClient";

const Comment = ({ comment, feedbackId }) => {
  const { user } = useContext(GlobalContext);

  const { mutate, isLoading } = useMutation({
    mutationFn: commentsService.deleteComment,
    onError: (error) => console.log(error),
    onSuccess: () => {
      queryClient.invalidateQueries("feedback");
    },
  });

  return (
    <section className="w-full bg-white rounded-2xl p-4 md:p-6 mt-4">
      <section className="flex justify-start gap-6 items-start w-full">
        <img
          className="w-12 h-12 object-cover rounded-full"
          src={comment.author.image}
          alt={comment.author.name}
        />
        <section className="w-full">
          <section className="flex mb-2 justify-between items-center w-full">
            <section className="flex justify-start items-center gap-4">
              <section>
                <h4 className="font-medium text-lg text-slate-800">
                  {comment.author.name}
                </h4>
                <a href="#" className="text-gray-500">
                  @{comment.author.name.split(" ").join("").toLowerCase()}
                </a>
              </section>
            </section>

            {user?.name === comment?.author?.name && (
              <button
                onClick={() =>
                  mutate({
                    commentId: comment._id,
                    feedbackId,
                  })
                }
                className={`flex justify-between items-center ${
                  isLoading ? "p-3" : "p-2"
                } md:px-3  rounded-xl text-white font-medium bg-red-500/90 hover:bg-red-500 duration-150 hover:cursor-pointer`}
              >
                {isLoading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 !stroke-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="4"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : null}

                {isLoading ? null : (
                  <MdDelete className="md:hidden block text-2xl text-white" />
                )}

                <span className={`hidden md:inline ${isLoading && "ml-2"}`}>
                  {isLoading ? "Deleting... " : "Delete"}
                </span>
              </button>
            )}
          </section>

          <p className="text-gray-500 break-all">{comment.content}</p>
        </section>
      </section>
    </section>
  );
};

export default Comment;
