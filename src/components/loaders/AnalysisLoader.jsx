import { Skeleton } from "@mui/material";

function AnalysisLoader() {
  return (
    <div className="min-h-screen  px-4 pb-12 pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl">
     
        <div className="mb-10">
          <Skeleton variant="rounded" width={96} height={20} />

          <Skeleton
            variant="rounded"
            width={288}
            height={40}
            className="!mt-6 !rounded-xl"
          />

          <Skeleton
            variant="rounded"
            width={384}
            height={16}
            className="!mt-3 max-w-full"
          />
        </div>


        <div className="grid gap-6 lg:grid-cols-[330px_1fr]">
   
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <Skeleton
              variant="circular"
              width={192}
              height={192}
              className="!mx-auto"
            />

            <Skeleton
              variant="rounded"
              width={128}
              height={20}
              className="!mx-auto !mt-8"
            />

            <Skeleton
              variant="rounded"
              width={176}
              height={16}
              className="!mx-auto !mt-3"
            />

            <div className="mt-8 h-px bg-gray-200" />

            <Skeleton
              variant="rounded"
              width="100%"
              height={20}
              className="!mt-8"
            />

            <Skeleton
              variant="rounded"
              width="80%"
              height={20}
              className="!mt-3"
            />
          </div>

   
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <Skeleton variant="rounded" width={160} height={24} />

            <div className="mt-6 space-y-3">
              <Skeleton variant="rounded" width="100%" height={16} />
              <Skeleton variant="rounded" width="100%" height={16} />
              <Skeleton variant="rounded" width="75%" height={16} />
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <Skeleton
                variant="rounded"
                height={112}
                className="!rounded-2xl"
              />
              <Skeleton
                variant="rounded"
                height={112}
                className="!rounded-2xl"
              />
            </div>
          </div>
        </div>


        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Skeleton
            variant="rounded"
            height={288}
            className="!rounded-[2rem] !bg-white"
          />
          <Skeleton
            variant="rounded"
            height={288}
            className="!rounded-[2rem] !bg-white"
          />
        </div>
      </div>
    </div>
  );
}

export default AnalysisLoader;