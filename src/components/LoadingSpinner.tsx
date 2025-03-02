
interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className = "h-12 w-12" }: LoadingSpinnerProps) {
  return (
    <div 
      className="flex justify-center items-center"
      role="status"
      aria-label="Cargando..."
    >
      <div 
        className={`animate-spin rounded-full border-b-2 border-green-600 ${className}`}
        aria-hidden="true"
      />
    </div>
  );
}
