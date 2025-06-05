import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from "recharts";
import { useEffect, useState } from "react";
import { formatDateToShortMonthYear } from "../Utils/utilities";
import "../Styles/Components/ParameterChart.css"

const CustomLegend = ({ payload, chartTypes, onToggleType }) => (
    <div className="chart-legend">
        {payload.map((entry, index) => {
            const type = chartTypes[entry.dataKey];
            return (
                <div key={index}>
                    <span>
                        {entry.value}
                    </span>
                    <button onClick={() => onToggleType(entry.dataKey)}>
                        {type === 'line' ? 'Switch to Bar' : 'Switch to Line'}
                    </button>
                </div>
            );
        })}
    </div>
);

export const ParameterChart = ({ selectedParams, allDates, formattedData }) => {
    const [chartTypes, setChartTypes] = useState({});

    useEffect(() => {
        setChartTypes(prev => {
            const updated = { ...prev };
            for (let param of selectedParams) {
                if (!updated[param]) updated[param] = 'line';
            }
            return updated;
        });
    }, [selectedParams]);
    const chartData = allDates.map(date => {
        const point = { date: formatDateToShortMonthYear(date) };
        for (let param of selectedParams) {
            const paramKey = param.split("|-|")[1];
            const records = formattedData[paramKey]?.records || [];
            const value = records.find(r => r.report_date === date)?.value;
            point[param] = value ?? null;
        }
        return point;
    });

    const handleToggleType = (key) => {
        setChartTypes(prev => ({
            ...prev,
            [key]: prev[key] === 'line' ? 'bar' : 'line'
        }));
    };

    return (
        <div className="chart-container">
            <ResponsiveContainer>
                <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend content={<CustomLegend chartTypes={chartTypes} onToggleType={handleToggleType} />} />
                    {Array.from(selectedParams).map((param) => {
                        const paramKey = param.split("|-|")[1];
                        const color = formattedData[paramKey]?.color;
                        return chartTypes[param] === 'bar' ? (
                            <Bar
                                key={param}
                                dataKey={param}
                                fill={color}
                            />
                        ) : (
                            <Line
                                key={param}
                                type="monotone"
                                dataKey={param}
                                stroke={color}
                                dot={false}
                            />
                        );
                    })}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};
