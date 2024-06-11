import Star from "@/assets/svg/star";
import Share from "@/assets/svg/share";
import Notif from "@/assets/svg/notif";

const ThButton = () => {
  return (
    <div className="flex space-x-2 pb-1 pt-1">
      <button
        type="button"
        className="text-gray-200 border border-gray-200 hover:bg-gray-200 hover:text-white focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-gray-400 dark:text-gray-200 dark:hover:text-white dark:focus:ring-gray-400 dark:hover:bg-gray-400"
      >
        <Star className="w-4 h-4 fill-current filter grayscale" />
      </button>
      <button
        type="button"
        className="text-gray-200 border border-gray-200 hover:bg-gray-200 hover:text-white focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-gray-400 dark:text-gray-200 dark:hover:text-white dark:focus:ring-gray-400 dark:hover:bg-gray-400"
      >
        <Share className="w-4 h-4 fill-current filter grayscale" />
      </button>
      <button
        type="button"
        className="text-gray-200 border border-gray-200 hover:bg-gray-200 hover:text-white focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-gray-400 dark:text-gray-200 dark:hover:text-white dark:focus:ring-gray-400 dark:hover:bg-gray-400"
      >
        <Notif className="w-4 h-4 fill-current filter grayscale" />
      </button>
      <button
        type="button"
        className="text-white bg-gray-200 hover:bg-gray-200/80 focus:ring-1 focus:outline-none focus:ring-gray-400/50 font-medium rounded-lg text-xs px-2 py-1 text-center inline-flex items-center dark:hover:bg-gray-200/80 dark:focus:ring-gray-400/40 me-2 mb-2"
      >
        <Star className="w-3 h-3 fill-current filter grayscale" />
        Watch 212
      </button>
    </div>
  );
};

export default ThButton;
