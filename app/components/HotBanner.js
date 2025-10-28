export default function HotBanner() {
  return (
    <div className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white p-4 rounded-lg mb-6 animate-pulse">
      <div className="flex items-center justify-center gap-3">
        <span className="text-2xl animate-bounce">🔥</span>
        <div className="text-center">
          <h2 className="text-lg font-bold">HOT & EXCLUSIVE</h2>
          <p className="text-sm opacity-90">Premium adult content • Updated daily • 18+ only</p>
        </div>
        <span className="text-2xl animate-bounce">💋</span>
      </div>
    </div>
  );
}