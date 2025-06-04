import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from "recharts";
import { formatDateToShortMonthYear } from "../Utils/dateFormatter";
import { useEffect, useState } from "react";
import { formatLabel } from "../Utils/labelFormatter";

export const ParameterChart = ({ selectedParams, allDates, formattedData }) => {
    const [chartTypes, setChartTypes] = useState({});

    useEffect(() => {
        setChartTypes(prev => {
            const updated = { ...prev };
            for (let param of selectedParams) {
                if (!(param in updated)) updated[param] = 'line';
            }
            return updated;
        });
    }, [selectedParams]);

    const toggleChartType = (param) => {
        setChartTypes(prev => ({
            ...prev,
            [param]: prev[param] === 'line' ? 'bar' : 'line'
        }));
    };

    const chartData = allDates.map(date => {
        const point = { date: formatDateToShortMonthYear(date) };
        for (let param of selectedParams) {
            const [label, key] = param.split("|-|");
            const records = formattedData[key] || [];
            const value = records.find(r => r.report_date === date)?.value;
            point[`${formatLabel(label)} ${key}`] = value ?? null;
        }
        return point;
    });

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

    return (
        <div style={{ width: "100%" }}>
            <div style={{ marginBottom: 10 }}>
                {Array.from(selectedParams).map(param => (
                    <button key={param} onClick={() => toggleChartType(param)}>
                        {param.split("|-|")[0]}: {chartTypes[param] === 'line' ? 'LINE' : 'BAR'}
                    </button>
                ))}
            </div>
            <div style={{ height: 400 }}>
                <ResponsiveContainer>
                    <ComposedChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {Array.from(selectedParams).map((param, index) => {
                            const [label, key] = param.split("|-|");
                            const dataKey = `${formatLabel(label)} ${key}`;
                            const color = colors[index % colors.length];
                            return chartTypes[param] === 'line' ? (
                                <Line
                                    key={dataKey}
                                    type="monotone"
                                    dataKey={dataKey}
                                    stroke={color}
                                    dot={false}
                                />
                            ) : (
                                <Bar
                                    key={dataKey}
                                    dataKey={dataKey}
                                    fill={color}
                                    barSize={20}
                                />
                            );
                        })}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};