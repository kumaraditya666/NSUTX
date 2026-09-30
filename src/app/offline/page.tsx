export default function Offline(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">You’re offline.</h1>
      <p className="mt-2 text-sm opacity-70">Showing cached shell. Live data may be stale — previously visited societies, saved events and NSUT Mode shell remain available.</p>
    </div>
  );
}
