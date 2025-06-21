import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Legend } from "recharts";
import { useEffect, useState } from "react";
import "../Styles/Components/ParameterChart.css";

const CustomLegend = ({ payload, chartTypes, onToggleType }) => (
    <div className="chart-legend">
        {payload.map((entry, index) => (
            <div key={index}>
                <span>{entry.value}</span>
                <button onClick={() => onToggleType(entry.dataKey)}>
                    {chartTypes[entry.dataKey] === 'line' ? 'Switch to Bar' : 'Switch to Line'}
                </button>
            </div>
        ))}
    </div>
);

export const ParameterChart = ({ selectedParams, headers }) => {
    const [chartTypes, setChartTypes] = useState({});

    useEffect(() => {
        const updated = {};
        for (const key of selectedParams.keys()) {
            updated[key] = chartTypes[key] || 'line';
        }
        setChartTypes(updated);
    }, [selectedParams]);

    // Generate chart data based on headers (excluding "Account")
    const chartData = headers.slice(1).map((header) => {
        const point = { date: header };
        for (const [param, [, data]] of selectedParams.entries()) {
            point[param] = data[header] !== undefined ? Number(data[header]) : null;
        }
        return point;
    });

    const handleToggleType = (key) => {
        setChartTypes((prev) => ({
            ...prev,
            [key]: prev[key] === 'line' ? 'bar' : 'line'
        }));
    };

    return (
        <div className="chart-container">
            <div className="chart">
                <ResponsiveContainer>
                    <ComposedChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="date" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
                        {/* <Legend content={<CustomLegend chartTypes={chartTypes} onToggleType={handleToggleType} />} /> */}

                        {Array.from(selectedParams.entries()).map(([param, [color]]) =>
                            chartTypes[param] === 'bar' ? (
                                <Bar key={param} dataKey={param} fill={color} barSize={20} />
                            ) : (
                                <Line key={param} type="monotone" dataKey={param} stroke={color} dot={false} />
                            )
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <CustomLegend chartTypes={chartTypes} onToggleType={handleToggleType} payload={Array.from(selectedParams.keys()).map(key => ({
                value: key,
                dataKey: key,
                color: selectedParams.get(key)?.[0] || "#000"
            }))} />
        </div>
    );
};
