import Uploading from "../../assets/Uploading.svg";

function UploadingFile() {
  return (
    <div className="flex h-100 items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src={Uploading}
          alt="Uploading"
          className="w-64 h-64"
        />

        <p className="text-lg font-medium text-gray-600">
          Uploading...
        </p>
      </div>
    </div>
  );
}

export default UploadingFile;