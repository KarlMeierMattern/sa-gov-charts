import PropTypes from "prop-types";
import { memo } from "react";

function SparklineChart({ data }) {
  if (!data?.length) return null;

  const values = data
    .map((item) => Number(item.value))
    .filter((v) => !Number.isNaN(v));
  if (values.length < 2) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  const padding = 2;

  const points = values
    .map((value, index) => {
      const x =
        padding + (index / (values.length - 1)) * (width - padding * 2);
      const y =
        height -
        padding -
        ((value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="text-muted-foreground hidden sm:block"
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}

SparklineChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default memo(SparklineChart);
