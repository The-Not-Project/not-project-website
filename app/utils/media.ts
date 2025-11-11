/**
 * Image compression + S3 upload utilities
 *
 * - Works in both browser and server environments.
 * - Client-side compression: `browser-image-compression` (lazy-imported).
 * - Server-side compression: `sharp` (lazy-imported; requires Node runtime, not Edge).
 *
 * Server requirements:
 * - Set `PUBLIC_API_BASE_URL` so server-side code can call your API routes with absolute URLs.
 *
 * Notes:
 * - On the server path we output WebP and rename the file to `.webp`.
 * - On Edge runtime, server-side compression is skipped (no `sharp` support).
 */

type CompressOpts = {
  /** Target max file size in MB (client-only lib heuristic). Default: 1 */
  maxSizeMB?: number;
  /** Max width/height (longest side), keeps aspect ratio. Default: 1920 */
  maxDimension?: number;
  /** Quality from 0..1 (mapped to 1..100 for sharp). Default: 0.8 */
  initialQuality?: number;
};

/** Compress an image to a reasonable size/quality without big loss. */
// Client + Server compression (client: browser-image-compression, server: sharp)
// Install server dep once:  npm i sharp
function toFile(blob: Blob, name: string, lastModified: number): File {
  return Object.assign(blob, {
    name,
    lastModified,
    webkitRelativePath: "", // Required by File type
  });
}

export async function compressImage(
  file: File,
  opts: CompressOpts = {}
): Promise<File> {
  if (!file.type?.startsWith("image/")) {
    throw new Error("Provided file is not an image");
  }

  const { maxSizeMB = 1, maxDimension = 1920, initialQuality = 0.8 } = opts;

  // SERVER path (Node): use sharp (skipped on Edge)
  if (typeof window === "undefined") {
    if (process.env.NEXT_RUNTIME === "edge") {
      return file;
    }

    try {
      const { default: sharp } = await import("sharp");
      const input = Buffer.from(await file.arrayBuffer());
      const quality = Math.max(
        1,
        Math.min(100, Math.round(initialQuality * 100))
      );

      const output = await sharp(input)
        .rotate()
        .resize({
          width: maxDimension,
          height: maxDimension,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality })
        .toBuffer();

      const newName = file.name.replace(/\.[^.]+$/, ".webp");
      const uint8 = new Uint8Array(output);

      if (typeof globalThis.File === "function") {
        return new File([uint8], newName, {
          type: "image/webp",
          lastModified: Date.now(),
        });
      }

      // Properly type-safe fallback for older Node
      const blob = new Blob([uint8], { type: "image/webp" });
      return toFile(blob, newName, Date.now());
    } catch (err) {
      console.error("Server compression failed, using original file:", err);
      return file;
    }
  }

  // Client-side path (browser)
  const { default: imageCompression } = await import(
    "browser-image-compression"
  );
  return imageCompression(file, {
    maxSizeMB,
    maxWidthOrHeight: maxDimension,
    initialQuality,
    useWebWorker: true,
  });
}

/**
 * Build an API URL for the current environment.
 *
 * @param path - Path starting with `/...` (e.g., `/upload?x=1`).
 * @returns Absolute URL on server, relative `/api/...` on client.
 *
 * Server:
 * - Uses `PUBLIC_API_BASE_URL` to construct absolute URLs to your API routes.
 * Client:
 * - Uses a relative `/api` prefix (same origin).
 */
function getApiUrl(path: string) {
  if (typeof window === "undefined") {
    const base = process.env.PUBLIC_API_BASE_URL;
    if (!base) {
      throw new Error("PUBLIC_API_BASE_URL is not set for server-side uploads");
    }
    return `${base.replace(/\/$/, "")}${path}`;
  } else {
    return `/api${path}`;
  }
}

/**
 * Build the presign-upload endpoint URL, including filename and MIME type.
 *
 * @param file - File to upload (name and type are sent to the presign endpoint).
 * @returns A URL string for your API route that returns S3 presigned data.
 */
function uploadEndpoint(file: File) {
  const qs = `filename=${encodeURIComponent(file.name)}&filetype=${encodeURIComponent(
    file.type || "application/octet-stream"
  )}`;
  return getApiUrl(`/upload?${qs}`);
}

/**
 * Upload a file to S3 with NO compression.
 *
 * Flow:
 * 1) GET presigned data from your `/api/upload` route
 * 2) PUT the file to the returned `uploadUrl`
 * 3) Return the `publicUrl`
 *
 * @param file - The file to upload.
 * @returns Public URL string to the uploaded object.
 */
export async function uploadToS3(file: File): Promise<string> {
  console.log("Uploading to S3:", file.name);
  const res = await fetch(uploadEndpoint(file));
  if (!res.ok) throw new Error("Failed to get upload URL");

  console.log("Got upload URL");

  const { uploadUrl, publicUrl } = await res.json();

  const put = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });

  if (!put.ok) throw new Error("S3 upload failed");

  console.log("Uploaded to S3:", publicUrl);

  return publicUrl as string;
}

/**
 * Compress first, then upload to S3.
 *
 * - Uses `compressImage` (client: browser lib, server: sharp/skip-on-edge).
 * - Falls back to original file if compression fails.
 *
 * @param file - The original image file.
 * @returns Public URL string to the uploaded (possibly compressed) image.
 */
export async function uploadToS3WithCompression(file: File): Promise<string> {
  // const compressed = await compressImage(file); // uses defaults unless opts passed
  console.log("Skipping compression for now");
  return uploadToS3(file);
}
