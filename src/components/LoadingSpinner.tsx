
export function LoadingSpinner() {
  return (
    <div 
      className="flex justify-center items-center min-h-[400px]"
      role="status"
      aria-label="Cargando..."
    >
      <div 
        className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"
        aria-hidden="true"
      />
    </div>
  );
}
