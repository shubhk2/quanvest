import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatDateToShortMonthYear } from "../Utils/dateFormatter";
import { formatLabel } from "../Utils/labelFormatter";

const ParameterChart = ({ selectedParams, allDates, formattedData }) => {
    const chartData = allDates.map(date => {
        const point = { date: formatDateToShortMonthYear(date) };
        for (let param of selectedParams) {
            const records = formattedData[param] || [];
            const value = records.find(r => r.report_date === date)?.value;
            point[param] = value ?? null;
        }
        return point;
    });

    return (
        <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {Array.from(selectedParams).map((param, index) => {
                        const formattedLabel = formatLabel(param.split("|-|")[0]);
                        return (
                            <Line
                                key={param}
                                type="monotone"
                                dataKey={formattedLabel + " " + param.split("|-|")[1]}
                                stroke={['#8884d8', '#82ca9d', '#ffc658', '#ff7300'][index % 4]}
                                dot={false}
                            />
                        )
                    })}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ParameterChart;