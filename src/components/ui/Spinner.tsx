const Spinner = () => {
  return (
    <div className="bg-background fixed top-0 left-0 z-999 block h-full w-full">
      <div
        role="status"
        className="absolute top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="border-primary absolute top-0 right-0 bottom-0 left-0 z-1000 h-20 w-20 animate-spin rounded-full border-5 border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Spinner;
