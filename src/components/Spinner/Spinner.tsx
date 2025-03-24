const Spinner = () => (
  <div className="flex flex-col gap-3 justify-center items-center">
    <div className="w-10 h-10 border-3 border-t-3 border-blue-500 border-solid rounded-full animate-spin"></div>
    <p>Loading your todos...</p>
  </div>
);

export default Spinner;
