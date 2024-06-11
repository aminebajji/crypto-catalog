import Star from "@/assets/svg/star";
import Share from "@/assets/svg/share";
import Notif from "@/assets/svg/notif";

const ThButton = () => {
  return (
    <div className="flex flex-col pb-1 pt-1">
      <div className="flex space-x-2">
        <button
          type="button"
          className="text-gray-200 border border-gray-200 hover:bg-gray-200 hover:text-white focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-gray-400 dark:text-gray-200 dark:hover:text-white dark:focus:ring-gray-400 dark:hover:bg-gray-400"
        >
          <Star color="none" />
        </button>
        <button
          type="button"
          className="text-gray-200 border border-gray-200 hover:bg-gray-200 hover:text-white focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-gray-400 dark:text-gray-200 dark:hover:text-white dark:focus:ring-gray-400 dark:hover:bg-gray-400"
        >
          <Share />
        </button>
        <button
          type="button"
          className="text-gray-200 border border-gray-200 hover:bg-gray-200 hover:text-white focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-gray-400 dark:text-gray-200 dark:hover:text-white dark:focus:ring-gray-400 dark:hover:bg-gray-400"
        >
          <Notif />
        </button>
      </div>
      <button
        type="button"
        className="text-black bg-gray-200 hover:bg-gray-200/80 focus:ring-1 focus:outline-none focus:ring-gray-400/50 font-medium rounded-lg text-xs px-2 py-1 text-center inline-flex items-center dark:hover:bg-gray-200/80 dark:focus:ring-gray-400/40 me-2 mb-2 mt-2 w-40"
      >
        <Star color="yellow" />
        On 1,349 watchlists
      </button>
    </div>
  );
};

export default ThButton;
