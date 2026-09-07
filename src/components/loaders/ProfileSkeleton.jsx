
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function ProfileSkeleton() {
  return (
    <Box>
      {/* Page Header */}
      <Stack spacing={1} className="mb-6">
        <Skeleton
          variant="text"
          width={180}
          height={40}
          animation="wave"
        />

        <Skeleton
          variant="text"
          width={280}
          height={24}
          animation="wave"
        />
      </Stack>

      {/* Profile Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* Left - Profile */}
          <div className="w-full md:w-[30%] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 p-8">

            {/* Profile Image */}
            <Skeleton
              variant="circular"
              width={120}
              height={120}
              animation="wave"
            />

            {/* Name */}
            <Skeleton
              variant="text"
              width={160}
              height={32}
              animation="wave"
              className="mt-4"
            />

            {/* Email */}
            <Skeleton
              variant="text"
              width={200}
              height={24}
              animation="wave"
            />

            {/* Additional Info */}
            <Stack
              spacing={1}
              className="mt-4 items-center"
            >
              <Skeleton
                variant="rounded"
                width={100}
                height={30}
                animation="wave"
              />

              <Skeleton
                variant="text"
                width={120}
                height={24}
                animation="wave"
              />
            </Stack>
          </div>

          {/* Right - User Details */}
          <div className="flex-1 p-8">

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              {/* Username */}
              <div>
                <Skeleton
                  variant="text"
                  width={80}
                  height={22}
                  animation="wave"
                />

                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={42}
                  animation="wave"
                />
              </div>

              {/* Email */}
              <div>
                <Skeleton
                  variant="text"
                  width={60}
                  height={22}
                  animation="wave"
                />

                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={42}
                  animation="wave"
                />
              </div>

              {/* First Name */}
              <div>
                <Skeleton
                  variant="text"
                  width={90}
                  height={22}
                  animation="wave"
                />

                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={42}
                  animation="wave"
                />
              </div>

              {/* Last Name */}
              <div>
                <Skeleton
                  variant="text"
                  width={90}
                  height={22}
                  animation="wave"
                />

                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={42}
                  animation="wave"
                />
              </div>

            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-200" />

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <Skeleton
                variant="rounded"
                width={100}
                height={40}
                animation="wave"
              />

              <Skeleton
                variant="rounded"
                width={120}
                height={40}
                animation="wave"
              />

            </div>

          </div>
        </div>
      </div>
    </Box>
  );
}

export default ProfileSkeleton;

