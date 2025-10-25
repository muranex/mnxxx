export default function VideoCard({ video }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="h-32">
        <iframe
          src={video.src}
          title={video.title}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
          {video.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {video.description}
        </p>
      </div>
    </div>
  );
}