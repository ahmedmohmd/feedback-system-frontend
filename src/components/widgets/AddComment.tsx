import { useState } from "react";
import { useMutation } from "react-query";
import commentsService from "../../services/commentsService";
import queryClient from "../../utils/queryClient";

const AddComment = ({ feedbackId, onComment }) => {
  const [content, setContent] = useState("");
  const [length, setLength] = useState(0);

  const { isLoading, mutate } = useMutation({
    mutationFn: commentsService.postComment,
    onError: (error) => console.log(error),
    onSuccess: () => {
      queryClient.invalidateQueries("feedback");
      queryClient.invalidateQueries("feedbacks");
      setContent("");
    },
  });

  onComment(isLoading);

  return (
    <section className="w-full mt-16 p-6  rounded-2xl bg-white">
      <h3 className="text-xl font-bold text-slate-700 mb-4">Add Comment</h3>

      <textarea
        name="comment"
        onChange={(event: any) => {
          setLength(event.target.value.length);
          setContent(event.target.value);
        }}
        className="outline-none border-1 resize-none border-gray-300 duration-300 text-lg focus:border-primary rounded-xl w-full"
        value={content}
        rows={5}
        maxLength={250}
      />
      <section className="w-full mt-4 flex justify-between items-center">
        <section className="text-slate-400 font-medium">
          <span
            className={`py-[0.4rem] px-3 duration-150 ${
              length === 250 ? "bg-red-500/90" : "bg-blue-500/90"
            } rounded-xl text-white font-medium mr-2`}
          >
            {250 - length}
          </span>
          Character Left
        </section>

        <button
          onClick={() => {
            mutate({
              commentData: {
                content,
              },
              feedbackId,
            });
          }}
          type="submit"
          className={`py-3 flex justify-between items-center text-white duration-300 rounded-3xl ${
            isLoading ? "bg-primary/70" : "bg-primary/90 hover:bg-primary"
          } px-9`}
        >
          {isLoading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 !stroke-4 mr-3 text-white animate-spin"
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
          )}
          {isLoading ? "Wait..." : "Add"}
        </button>
      </section>
    </section>
  );
};

export default AddComment;
