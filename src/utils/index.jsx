import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export const registerChartJs = () => {
  Chart.register(
    ArcElement,
    BarElement,
    CategoryScale,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    ChartDataLabels
  );
};

export const formatDatetime = (datetime) => {
  return datetime ? datetime.replace("T", " ").substring(0, 19) : "";
};
