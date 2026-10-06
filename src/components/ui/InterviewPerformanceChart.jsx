import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export const InterviewPerformanceChart = ({ interviews }) => {
  const completedInterviews = (interviews || [])
    .filter(
      (interview) =>
        interview.status === "COMPLETED" &&
        interview.score !== null &&
        interview.score !== undefined
    )
    .sort(
      (a, b) =>
        new Date(a.createdAt) - new Date(b.createdAt)
    );

  const chartData = completedInterviews.map(
    (interview, index) => ({
      name:
        completedInterviews.length === 1
          ? interview.role
          : `Interview ${index + 1}`,

      score: Number(interview.score) || 0,
    })
  );

  return (
    <div className="h-[340px] w-full">
      {chartData.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="text-gray-400"
            >
              <path d="M4 19V5" />
              <path d="M4 19H20" />
              <path d="M8 16V11" />
              <path d="M12 16V8" />
              <path d="M16 16V5" />
            </svg>
          </div>

          <p className="text-sm font-semibold text-gray-600">
            No completed interviews yet
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Complete a mock interview to see your performance here.
          </p>
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
              padding={{
                left: 20,
                right: 20,
              }}
            />

            <YAxis
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
              labelStyle={{
                color: "#1e293b",
                fontWeight: 600,
              }}
              formatter={(value) => [
                `${value}/10`,
                "Score",
              ]}
            />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#2563eb",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};