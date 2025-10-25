export default function VideoCard({ video }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="h-40">
        <iframe
          src={video.src}
          title={video.title}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
      <div className="p-2">
        <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white line-clamp-2">
          {video.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}