import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import PropTypes from "prop-types";

export default function SparklineChart({ data }) {
  return (
    <div className="w-20 px-2">
      <Sparklines
        data={data.map((item) => item.value)}
        //   limit={10}
        width={30}
        height={6}
        margin={1}
      >
        <SparklinesLine
          color="grey"
          style={{ strokeWidth: 0.5, fill: "none" }}
        />
        <SparklinesSpots style={{ fill: "grey", r: 0.5 }} />
      </Sparklines>
    </div>
  );
}

SparklineChart.propTypes = {
  data: PropTypes.array.isRequired,
};
