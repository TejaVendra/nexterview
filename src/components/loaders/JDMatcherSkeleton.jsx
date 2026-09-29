import { Skeleton } from "@mui/material";


const INK = "#1a1816";
const PAPER = "#faf8f3";
const PAPER_2 = "#f3efe6";
const RULE = "#e5ddcd";
const CLAY = "#b6532f";
const OCHRE = "#c98a2b";
const MOSS = "#5b6b3a";
const MUTED = "#8a8175";


const sk = {
  bg: "!bg-[#ece7da]",           
  bgSoft: "!bg-[#f1ece0]",     
  bgInk: "!bg-[#262220]",        
  bgAccent: "!bg-[#e6dfcd]",     
  rounded: "!rounded-full",
  radiusMd: "!rounded-md",
  radiusLg: "!rounded-lg",
  radiusXl: "!rounded-xl",
};


export default function JDMatcherSkeleton() {
  return (
    <div
      className="min-h-screen px-4 pb-20 pt-24 md:px-8 md:pt-32"
      style={{
        background: PAPER,
        backgroundImage: `radial-gradient(${RULE} 0.5px, transparent 0.5px)`,
        backgroundSize: "22px 22px",
      }}
    >
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          {/* back link */}
          <Skeleton
            variant="rounded"
            width={150}
            height={14}
            className={`${sk.bg} ${sk.rounded}`}
          />

          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
          
              <Skeleton
                variant="rounded"
                width={200}
                height={11}
                className={`${sk.bg} ${sk.rounded}`}
              />
         
              <Skeleton
                variant="rounded"
                width={340}
                height={44}
                className={`mt-4 ${sk.bg} ${sk.radiusMd}`}
              />
           
              <Skeleton
                variant="rounded"
                width={280}
                height={44}
                className={`mt-2 ${sk.bg} ${sk.radiusMd}`}
              />
          
              <Skeleton
                variant="rounded"
                width={420}
                height={13}
                className={`mt-5 ${sk.bg} ${sk.rounded} max-w-full`}
              />
            </div>

        
            <Skeleton
              variant="rounded"
              width={110}
              height={30}
              className={`${sk.bg} ${sk.rounded}`}
            />
          </div>

     
          <div className="mt-8 flex items-center">
            <span
              className="h-[1px]"
              style={{ width: 60, background: INK }}
            />
            <span
              className="h-[1px] flex-1"
              style={{ background: RULE }}
            />
          </div>
        </div>

    
        <section className="mb-6 grid gap-6 lg:grid-cols-[340px_1fr]">
       
          <CardShell>
            <div
              className="grid grid-cols-2 divide-x"
              style={{ borderColor: RULE }}
            >
            
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <Skeleton
                    variant="circular"
                    width={14}
                    height={14}
                    className={sk.bg}
                  />
                  <Skeleton
                    variant="rounded"
                    width={70}
                    height={10}
                    className={`${sk.bg} ${sk.rounded}`}
                  />
                </div>
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={48}
                  className={`mt-4 ${sk.bg} ${sk.radiusMd}`}
                />
                <div className="mt-3 flex items-center gap-2">
                  <Skeleton
                    variant="circular"
                    width={6}
                    height={6}
                    className={sk.bg}
                  />
                  <Skeleton
                    variant="rounded"
                    width={60}
                    height={9}
                    className={`${sk.bg} ${sk.rounded}`}
                  />
                </div>
                <div
                  className="mt-4 h-[3px] w-full overflow-hidden"
                  style={{ background: RULE }}
                >
                  <div
                    className="h-full"
                    style={{
                      width: "62%",
                      background: sk.bgSoft.replace("!bg-", ""),
                      opacity: 0.6,
                    }}
                  />
                </div>
              </div>

        
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <Skeleton
                    variant="circular"
                    width={14}
                    height={14}
                    className={sk.bg}
                  />
                  <Skeleton
                    variant="rounded"
                    width={80}
                    height={10}
                    className={`${sk.bg} ${sk.rounded}`}
                  />
                </div>
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={48}
                  className={`mt-4 ${sk.bg} ${sk.radiusMd}`}
                />
                <div className="mt-3 flex items-center gap-2">
                  <Skeleton
                    variant="circular"
                    width={6}
                    height={6}
                    className={sk.bg}
                  />
                  <Skeleton
                    variant="rounded"
                    width={60}
                    height={9}
                    className={`${sk.bg} ${sk.rounded}`}
                  />
                </div>
                <div
                  className="mt-4 h-[3px] w-full overflow-hidden"
                  style={{ background: RULE }}
                >
                  <div
                    className="h-full"
                    style={{
                      width: "74%",
                      background: sk.bgSoft.replace("!bg-", ""),
                      opacity: 0.6,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardShell>

        
          <CardShell>
            <div className="p-1">
              <div className="flex items-start justify-between gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Skeleton
                      variant="circular"
                      width={14}
                      height={14}
                      className={sk.bg}
                    />
                    <Skeleton
                      variant="rounded"
                      width={90}
                      height={10}
                      className={`${sk.bg} ${sk.rounded}`}
                    />
                  </div>
                  <Skeleton
                    variant="rounded"
                    width={340}
                    height={26}
                    className={`mt-4 ${sk.bg} ${sk.radiusMd} max-w-full`}
                  />
                </div>
                <Skeleton
                  variant="rounded"
                  width={90}
                  height={28}
                  className={`${sk.bg} ${sk.rounded}`}
                />
              </div>

              <div
                className="my-6 h-[1px] w-full"
                style={{ background: RULE }}
              />

           
              <div className="flex gap-3">
                <Skeleton
                  variant="rounded"
                  width={44}
                  height={44}
                  className={`shrink-0 ${sk.bg} ${sk.radiusMd}`}
                />
                <div className="flex-1 space-y-2">
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={12}
                    className={`${sk.bg} ${sk.rounded}`}
                  />
                  <Skeleton
                    variant="rounded"
                    width="96%"
                    height={12}
                    className={`${sk.bg} ${sk.rounded}`}
                  />
                  <Skeleton
                    variant="rounded"
                    width="88%"
                    height={12}
                    className={`${sk.bg} ${sk.rounded}`}
                  />
                </div>
              </div>
            </div>
          </CardShell>
        </section>

      
        <section className="mb-6 grid gap-6 lg:grid-cols-2">
          <ScoreTileSkeleton />
          <ScoreTileSkeleton />
        </section>

       
        <section className="mb-6">
          <RequirementsSkeleton />
        </section>

    
        <section className="mb-6 grid gap-6 md:grid-cols-3">
          <SkillsColumnSkeleton />
          <SkillsColumnSkeleton />
          <SkillsColumnSkeleton />
        </section>

      
        <section className="mb-6">
          <KeywordsSkeleton />
        </section>

      
        <section className="mb-6 grid gap-6 lg:grid-cols-2">
          <SideListSkeleton />
          <SideListSkeleton />
        </section>

      
        <section className="mb-6">
          <SuggestionsSkeleton />
        </section>


        <section>
          <RecommendedSkillsSkeleton />
        </section>

   
        <div className="mt-16 flex items-center justify-center gap-3">
          <span className="h-[1px] w-8" style={{ background: RULE }} />
          <Skeleton
            variant="rounded"
            width={110}
            height={10}
            className={`${sk.bg} ${sk.rounded}`}
          />
          <span className="h-[1px] w-8" style={{ background: RULE }} />
        </div>
      </div>

 
      <style>{`
        @keyframes shimmerWarm {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .MuiSkeleton-root {
          background: linear-gradient(
            90deg,
            #ece7da 0%,
            #f3efe6 40%,
            #ece7da 80%
          ) !important;
          background-size: 200% 100% !important;
          animation: shimmerWarm 1.8s linear infinite !important;
        }
        .MuiSkeleton-rounded {
          border-radius: 9999px;
        }
        @media (prefers-reduced-motion: reduce) {
          .MuiSkeleton-root {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}


function CardShell({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border p-6 md:p-7 ${className}`}
      style={{ borderColor: RULE, background: "#fffdf8" }}
    >
      {children}
    </div>
  );
}


function ScoreTileSkeleton() {
  return (
    <CardShell>
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center gap-2">
          <Skeleton
            variant="rounded"
            width={32}
            height={32}
            className={`${sk.bgInk} ${sk.radiusLg}`}
          />
          <Skeleton
            variant="rounded"
            width={90}
            height={10}
            className={`${sk.bg} ${sk.rounded}`}
          />
        </div>
        <Skeleton
          variant="rounded"
          width={60}
          height={30}
          className={`${sk.bg} ${sk.radiusMd}`}
        />
      </div>

      <div
        className="mt-5 h-[3px] w-full overflow-hidden"
        style={{ background: RULE }}
      >
        <div
          className="h-full"
          style={{
            width: "68%",
            background: "#e6dfcd",
          }}
        />
      </div>

      <div className="mt-5 space-y-2">
        <Skeleton
          variant="rounded"
          width="100%"
          height={11}
          className={`${sk.bg} ${sk.rounded}`}
        />
        <Skeleton
          variant="rounded"
          width="94%"
          height={11}
          className={`${sk.bg} ${sk.rounded}`}
        />
        <Skeleton
          variant="rounded"
          width="82%"
          height={11}
          className={`${sk.bg} ${sk.rounded}`}
        />
      </div>
    </CardShell>
  );
}


function RequirementsSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: RULE, background: "#fffdf8" }}
    >
      {/* header */}
      <div
        className="flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6"
        style={{ borderColor: RULE }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              className="h-[1px] w-6"
              style={{ background: RULE }}
            />
            <Skeleton
              variant="rounded"
              width={140}
              height={10}
              className={`${sk.bg} ${sk.rounded}`}
            />
          </div>
          <Skeleton
            variant="rounded"
            width={300}
            height={24}
            className={`mt-3 ${sk.bg} ${sk.radiusMd} max-w-full`}
          />
          <Skeleton
            variant="rounded"
            width={220}
            height={11}
            className={`mt-2 ${sk.bg} ${sk.rounded}`}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton
            variant="rounded"
            width={110}
            height={26}
            className={`${sk.bg} ${sk.rounded}`}
          />
          <Skeleton
            variant="rounded"
            width={120}
            height={26}
            className={`${sk.bg} ${sk.rounded}`}
          />
        </div>
      </div>

      {/* rows */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="grid gap-4 border-b px-5 py-5 md:grid-cols-[120px_1fr_auto] md:items-start md:gap-5 md:px-6"
          style={{ borderColor: RULE }}
        >
          {/* importance tag */}
          <div className="flex items-center gap-2">
            <Skeleton
              variant="circular"
              width={6}
              height={6}
              className={sk.bg}
            />
            <Skeleton
              variant="rounded"
              width={50}
              height={9}
              className={`${sk.bg} ${sk.rounded}`}
            />
          </div>

          {/* requirement + evidence lines */}
          <div className="min-w-0 space-y-2">
            <Skeleton
              variant="rounded"
              width="78%"
              height={12}
              className={`${sk.bg} ${sk.rounded}`}
            />
            <Skeleton
              variant="rounded"
              width="96%"
              height={10}
              className={`${sk.bgSoft} ${sk.rounded}`}
            />
            <Skeleton
              variant="rounded"
              width="70%"
              height={10}
              className={`${sk.bgSoft} ${sk.rounded}`}
            />
          </div>

          {/* status stamp */}
          <Skeleton
            variant="rounded"
            width={100}
            height={26}
            className={`${sk.bg} ${sk.rounded}`}
          />
        </div>
      ))}
    </div>
  );
}


function SkillsColumnSkeleton() {
  return (
    <CardShell className="!p-5 md:!p-6">
      <div className="flex items-center gap-2">
        <Skeleton
          variant="circular"
          width={14}
          height={14}
          className={sk.bg}
        />
        <Skeleton
          variant="rounded"
          width={110}
          height={10}
          className={`${sk.bg} ${sk.rounded}`}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {[88, 62, 74, 52, 90, 68, 78].map((w, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={w}
            height={26}
            className={`${sk.bg} ${sk.rounded}`}
          />
        ))}
      </div>
    </CardShell>
  );
}


function KeywordsSkeleton() {
  return (
    <CardShell>
      <div className="flex items-center gap-2">
        <Skeleton
          variant="circular"
          width={14}
          height={14}
          className={sk.bg}
        />
        <Skeleton
          variant="rounded"
          width={130}
          height={10}
          className={`${sk.bg} ${sk.rounded}`}
        />
      </div>
      <Skeleton
        variant="rounded"
        width={300}
        height={24}
        className={`mt-3 ${sk.bg} ${sk.radiusMd} max-w-full`}
      />
      <Skeleton
        variant="rounded"
        width={240}
        height={11}
        className={`mt-2 ${sk.bg} ${sk.rounded}`}
      />

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {[1, 2].map((col) => (
          <div key={col}>
            <div className="flex items-center justify-between">
              <Skeleton
                variant="rounded"
                width={110}
                height={10}
                className={`${sk.bg} ${sk.rounded}`}
              />
              <Skeleton
                variant="rounded"
                width={20}
                height={10}
                className={`${sk.bg} ${sk.rounded}`}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[52, 66, 48, 72, 56, 62].map((w, i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={w}
                  height={24}
                  className={`${sk.bg} ${sk.radiusMd}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function SideListSkeleton() {
  return (
    <CardShell>
      <div className="flex items-center gap-2">
        <Skeleton
          variant="circular"
          width={14}
          height={14}
          className={sk.bg}
        />
        <Skeleton
          variant="rounded"
          width={90}
          height={10}
          className={`${sk.bg} ${sk.rounded}`}
        />
      </div>
      <Skeleton
        variant="rounded"
        width={220}
        height={24}
        className={`mt-3 ${sk.bg} ${sk.radiusMd}`}
      />

      <div className="mt-5 space-y-2.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border p-4"
            style={{ borderColor: RULE, background: PAPER }}
          >
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              className={`${sk.bg} shrink-0`}
            />
            <div className="flex-1 space-y-2 pt-1">
              <Skeleton
                variant="rounded"
                width="92%"
                height={11}
                className={`${sk.bg} ${sk.rounded}`}
              />
              <Skeleton
                variant="rounded"
                width="64%"
                height={11}
                className={`${sk.bgSoft} ${sk.rounded}`}
              />
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}


function SuggestionsSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: RULE, background: "#fffdf8" }}
    >
      {/* header */}
      <div
        className="flex items-start gap-4 border-b px-6 py-6 md:px-7"
        style={{ borderColor: RULE }}
      >
        <Skeleton
          variant="rounded"
          width={40}
          height={40}
          className={`${sk.bgInk} ${sk.radiusLg} shrink-0`}
        />
        <div className="flex-1">
          <Skeleton
            variant="rounded"
            width={90}
            height={10}
            className={`${sk.bg} ${sk.rounded}`}
          />
          <Skeleton
            variant="rounded"
            width={280}
            height={22}
            className={`mt-2 ${sk.bg} ${sk.radiusMd} max-w-full`}
          />
          <Skeleton
            variant="rounded"
            width={220}
            height={11}
            className={`mt-2 ${sk.bg} ${sk.rounded}`}
          />
        </div>
      </div>

      {/* rows */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-start gap-4 border-b px-6 py-5 md:px-7"
          style={{ borderColor: RULE }}
        >
          <Skeleton
            variant="rounded"
            width={32}
            height={32}
            className={`${sk.bg} ${sk.radiusLg} shrink-0`}
          />
          <div className="flex-1 space-y-2 pt-1">
            <Skeleton
              variant="rounded"
              width="96%"
              height={11}
              className={`${sk.bg} ${sk.rounded}`}
            />
            <Skeleton
              variant="rounded"
              width="72%"
              height={11}
              className={`${sk.bgSoft} ${sk.rounded}`}
            />
          </div>
          <Skeleton
            variant="circular"
            width={16}
            height={16}
            className={`${sk.bg} shrink-0`}
          />
        </div>
      ))}
    </div>
  );
}

function RecommendedSkillsSkeleton() {
  return (
    <CardShell>
      <div className="flex items-center gap-2">
        <Skeleton
          variant="circular"
          width={14}
          height={14}
          className={sk.bg}
        />
        <Skeleton
          variant="rounded"
          width={110}
          height={10}
          className={`${sk.bg} ${sk.rounded}`}
        />
      </div>
      <Skeleton
        variant="rounded"
        width={300}
        height={22}
        className={`mt-3 ${sk.bg} ${sk.radiusMd} max-w-full`}
      />
      <Skeleton
        variant="rounded"
        width={260}
        height={11}
        className={`mt-2 ${sk.bg} ${sk.rounded}`}
      />

      <div className="mt-5 flex flex-wrap gap-2">
        {[110, 88, 96, 74, 120, 92, 84, 102].map((w, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={w}
            height={32}
            className={`${sk.bg} ${sk.rounded}`}
          />
        ))}
      </div>
    </CardShell>
  );
}