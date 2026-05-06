import { useState, useEffect } from "react";
import { fetchTrainings } from "../trainingapi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { TrainingData } from "../types";

function Stats() {
    const [statsData, setStatsData] = useState<{ activity: string; totalMinutes: number }[]>([]);

    useEffect(() => {
        fetchTrainings()
            .then(data => {
                const trainings: TrainingData[] = data._embedded.trainings;

                // THE LOGIC: Aggregating minutes per activity
                const result = trainings.reduce((acc: any, current) => {
                    const activity = current.activity;
                    const duration = current.duration;

                    if (!acc[activity]) {
                        acc[activity] = 0;
                    }
                    acc[activity] += duration;
                    return acc;
                }, {});

                const formattedData = Object.keys(result).map(key => ({
                    activity: key,
                    totalMinutes: result[key]
                }));
                setStatsData(formattedData);
            })
            .catch(err => console.error(err));
    }, []);










    return (
        <div style={{ width: '100%', height: 500, marginTop: '50px' }}>
            <h1>Training statistics</h1>
            <h2 style={{ textAlign: 'center' }}>Combined duration per activity</h2>
            <ResponsiveContainer width="90%" height="100%">
                <BarChart
                    data={statsData}
                    margin={{ top: 20, right: 10, left: 20, bottom: 30 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="activity"
                        angle={0}
                        textAnchor="middle"
                        interval={0}
                        height={60}
                    />
                    <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="totalMinutes" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Stats;