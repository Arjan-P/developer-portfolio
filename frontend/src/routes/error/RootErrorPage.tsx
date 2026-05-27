import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function RootErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="container py-20">
        <h1 className="text-4xl font-bold">{error.status}</h1>

        <p className="text-muted-foreground mt-2">{error.statusText}</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="container py-20">
        <h1 className="text-4xl font-bold">Something went wrong</h1>

        <p className="mt-2 text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container py-20">
      <h1 className="text-4xl font-bold">Unknown Error</h1>
    </div>
  );
}
