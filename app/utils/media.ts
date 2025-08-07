import imageCompression from "browser-image-compression";

type CompressOpts = {
  maxSizeMB?: number;           // default 1
  maxDimension?: number;        // default 1920
  initialQuality?: number;      // default 0.8
};

/** Compress an image to a reasonable size/quality without big loss */
export async function compressImage(
  file: File,
  opts: CompressOpts = {}
): Promise<File> {
  if (!file.type?.startsWith("image/")) {
    throw new Error("Provided file is not an image");
  }

  const {
    maxSizeMB = 1,
    maxDimension = 1920,
    initialQuality = 0.8,
  } = opts;

  try {
    const compressed = await imageCompression(file, {
      maxSizeMB,
      maxWidthOrHeight: maxDimension,
      useWebWorker: true,
      initialQuality,
    });
    return compressed;
  } catch (err) {
    console.error("Image compression failed, using original file:", err);
    return file; // fallback
  }
}


// Determine absolute or relative API URL depending on environment
function getApiUrl(path: string) {
  if (typeof window === "undefined") {
    // Server-side: must use absolute URL from env
    const base = process.env.PUBLIC_API_BASE_URL;
    if (!base) {
      throw new Error(
        "PUBLIC_API_BASE_URL is not set for server-side uploads"
      );
    }
    return `${base.replace(/\/$/, "")}${path}`;
  } else {
    // Client-side: relative URL works fine
    return `/api${path}`;
  }
}

function uploadEndpoint(file: File) {
  const qs = `filename=${encodeURIComponent(file.name)}&filetype=${encodeURIComponent(
    file.type || "application/octet-stream"
  )}`;
  return getApiUrl(`/upload?${qs}`);
}

/** Upload to S3 with NO compression. Returns the public S3 URL. */
export async function uploadToS3(file: File): Promise<string> {
  const res = await fetch(uploadEndpoint(file));
  if (!res.ok) throw new Error("Failed to get upload URL");

  const { uploadUrl, publicUrl } = await res.json();

  const put = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });
  if (!put.ok) throw new Error("S3 upload failed");

  return publicUrl as string;
}

/** Compress first, then upload to S3. Returns the public S3 URL. */
export async function uploadToS3WithCompression(file: File): Promise<string> {
  const compressed = await compressImage(file); // Uses your default settings
  return uploadToS3(compressed);
}
