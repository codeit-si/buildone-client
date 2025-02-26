import LoadingSpinner from "@/components/@common/loading-spinner";

export default function loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
