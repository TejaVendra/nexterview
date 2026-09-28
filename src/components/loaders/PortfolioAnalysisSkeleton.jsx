import { Skeleton } from "@mui/material";

function PortfolioAnalysisSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50/80 via-white/80 to-cyan-50/30 px-4 py-10 md:pt-25 pt-22 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* ===== Header ===== */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Skeleton
              variant="rounded"
              width={140}
              height={24}
              className="!rounded-full !bg-neutral-200/70"
            />
            <Skeleton
              variant="rounded"
              width={340}
              height={40}
              className="!mt-4 !rounded-xl"
            />
            <Skeleton
              variant="rounded"
              width={480}
              height={14}
              className="!mt-3 max-w-full !rounded-full"
            />
          </div>

          {/* Action button placeholder */}
          <Skeleton
            variant="rounded"
            width={140}
            height={44}
            className="!rounded-xl !bg-gradient-to-r !from-cyan-100 !to-blue-100"
          />
        </div>

        {/* ===== Top grid: donut + area chart ===== */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Donut card */}
          <CardShell>
            <Skeleton
              variant="circular"
              width={140}
              height={140}
              className="!mx-auto !bg-neutral-200/80"
            />
            <Skeleton
              variant="rounded"
              width={100}
              height={14}
              className="!mx-auto !mt-5 !rounded-full"
            />
            <div className="mt-4 flex items-center justify-center gap-3">
              <Skeleton
                variant="rounded"
                width={60}
                height={10}
                className="!rounded-full"
              />
              <Skeleton
                variant="rounded"
                width={60}
                height={10}
                className="!rounded-full"
              />
              <Skeleton
                variant="rounded"
                width={60}
                height={10}
                className="!rounded-full"
              />
            </div>
          </CardShell>

          {/* Area chart card */}
          <CardShell>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton
                  variant="rounded"
                  width={140}
                  height={16}
                  className="!rounded-md"
                />
                <Skeleton
                  variant="rounded"
                  width={80}
                  height={28}
                  className="!mt-2 !rounded-lg"
                />
              </div>
              <Skeleton
                variant="rounded"
                width={90}
                height={28}
                className="!rounded-full"
              />
            </div>

            {/* Fake chart bars */}
            <div className="mt-6 flex h-32 items-end gap-2">
              {[40, 65, 45, 80, 55, 90, 70, 50, 85, 60, 75, 95].map(
                (h, i) => (
                  <div
                    key={i}
                    className="flex-1 animate-pulse rounded-t-md bg-gradient-to-t from-neutral-200/60 to-neutral-200/30"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 80}ms`,
                      animationDuration: "1.8s",
                    }}
                  />
                )
              )}
            </div>
          </CardShell>
        </div>

        {/* ===== Stats grid ===== */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <StatCard key={item} index={item} />
          ))}
        </div>

        {/* ===== Bottom grid: two large panels ===== */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <CardShell>
            <div className="flex items-center justify-between">
              <Skeleton
                variant="rounded"
                width={160}
                height={16}
                className="!rounded-md"
              />
              <Skeleton
                variant="rounded"
                width={70}
                height={24}
                className="!rounded-full"
              />
            </div>
            <div className="mt-6 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton
                    variant="circular"
                    width={36}
                    height={36}
                    className="!shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <Skeleton
                      variant="rounded"
                      width="70%"
                      height={12}
                      className="!rounded-full"
                    />
                    <Skeleton
                      variant="rounded"
                      width="40%"
                      height={10}
                      className="!rounded-full !bg-neutral-200/60"
                    />
                  </div>
                  <Skeleton
                    variant="rounded"
                    width={60}
                    height={20}
                    className="!rounded-full"
                  />
                </div>
              ))}
            </div>
          </CardShell>

          <CardShell>
            <div className="flex items-center justify-between">
              <Skeleton
                variant="rounded"
                width={140}
                height={16}
                className="!rounded-md"
              />
              <div className="flex gap-2">
                <Skeleton
                  variant="rounded"
                  width={50}
                  height={24}
                  className="!rounded-full"
                />
                <Skeleton
                  variant="rounded"
                  width={50}
                  height={24}
                  className="!rounded-full"
                />
              </div>
            </div>

            {/* Fake line chart */}
            <div className="mt-6 h-40 w-full">
              <svg
                viewBox="0 0 400 160"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="skLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,120 C40,80 80,100 120,70 C160,40 200,90 240,60 C280,30 320,70 360,45 L400,55 L400,160 L0,160 Z"
                  fill="url(#skLine)"
                  className="animate-pulse"
                />
                <path
                  d="M0,120 C40,80 80,100 120,70 C160,40 200,90 240,60 C280,30 320,70 360,45 L400,55"
                  fill="none"
                  stroke="#67e8f9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </svg>
            </div>

            <div className="mt-4 flex justify-between">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={30}
                  height={10}
                  className="!rounded-full !bg-neutral-200/60"
                />
              ))}
            </div>
          </CardShell>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable card shell with soft depth ---------- */
function CardShell({ children }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-100 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
      {/* subtle top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      {children}
    </div>
  );
}

/* ---------- Stat card with tiny icon accent ---------- */
function StatCard({ index }) {
  const accents = [
    "from-cyan-100 to-cyan-50",
    "from-purple-100 to-purple-50",
    "from-emerald-100 to-emerald-50",
    "from-amber-100 to-amber-50",
    "from-blue-100 to-blue-50",
    "from-pink-100 to-pink-50",
    "from-indigo-100 to-indigo-50",
  ];
  const accent = accents[(index - 1) % accents.length];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
      <div className="flex items-start justify-between">
        <Skeleton
          variant="rounded"
          width={40}
          height={40}
          className={`!rounded-xl !bg-gradient-to-br ${accent}`}
        />
        <Skeleton
          variant="rounded"
          width={44}
          height={18}
          className="!rounded-full !bg-neutral-200/60"
        />
      </div>

      <Skeleton
        variant="rounded"
        width={70}
        height={10}
        className="!mt-4 !rounded-full !bg-neutral-200/60"
      />

      <Skeleton
        variant="rounded"
        width={110}
        height={22}
        className="!mt-2 !rounded-md"
      />

      {/* tiny sparkline bars */}
      <div className="mt-4 flex h-8 items-end gap-1">
        {[40, 70, 55, 90, 65, 80].map((h, i) => (
          <div
            key={i}
            className="flex-1 animate-pulse rounded-sm bg-neutral-200/50"
            style={{
              height: `${h}%`,
              animationDelay: `${i * 100}ms`,
              animationDuration: "1.8s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default PortfolioAnalysisSkeleton;