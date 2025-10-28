export default function RandomVideo({ videos, onVideoSelect }) {
  const getRandomVideo = () => {
    if (videos.length === 0) return;
    const randomIndex = Math.floor(Math.random() * videos.length);
    onVideoSelect(videos[randomIndex]);
  };

  return (
    <button
      onClick={getRandomVideo}
      disabled={videos.length === 0}
      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
    >
      <span className="text-lg">🎲</span>
      Surprise Me!
    </button>
  );
}