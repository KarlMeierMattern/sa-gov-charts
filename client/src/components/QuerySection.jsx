import PropTypes from "prop-types";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

QuerySection.propTypes = {
  queries: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
  skeleton: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default function QuerySection({ queries, skeleton, children }) {
  const queryList = Array.isArray(queries) ? queries : [queries];
  const isLoading = queryList.some((query) => query.isLoading);
  const failed = queryList.find((query) => query.isError);

  if (isLoading) {
    return skeleton ?? null;
  }

  if (failed) {
    return (
      <div
        role="alert"
        className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center"
      >
        <AlertCircle className="mx-auto mb-2 h-5 w-5 text-destructive" />
        <p className="text-sm text-destructive">{failed.error?.message}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => queryList.forEach((query) => query.refetch())}
        >
          Retry
        </Button>
      </div>
    );
  }

  return children;
}
