// NATIVE
import { useClearCriticalError } from "../../store/hooks";

interface NetworkErrorOverlayProps {
  onRetry?: () => void;
}

export function NetworkErrorOverlay({ onRetry }: NetworkErrorOverlayProps) {
  const clearCriticalError = useClearCriticalError();

  const handleRetry = () => {
    clearCriticalError();
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-container border-border mx-4 w-full max-w-md rounded-xl border p-8 shadow-lg">
        <div className="text-center">
          <span className="material-symbols-outlined text-destructive mb-4 inline-block text-6xl">
            wifi_off
          </span>
          <h2 className="text-heading mb-2 text-2xl font-bold">
            No Internet Connection
          </h2>
          <p className="text-paragraph mb-6">
            Please check your internet connection and try again.
          </p>

          <button onClick={handleRetry} className="btn btn-primary w-full">
            <span className="material-symbols-outlined mr-2">refresh</span>
            Retry Connection
          </button>
        </div>
      </div>
    </div>
  );
}
