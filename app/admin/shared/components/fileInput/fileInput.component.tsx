import {
  FileInput,
  FileInputLabel,
} from "@/app/admin/shared/components/form/FormElements";
import { useEffect, useState } from "react";
import { FaPlus as IconAdd } from "react-icons/fa6";

export default function FileInputContainer({ url }: { url?: string }) {
  const [URL, setURL] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (url) {
      setURL(url);
    }
  }, [url]);

  const addThumbnailAction = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <FileInputLabel htmlFor="thumbnail">
        {URL ? (
          <div className="file-preview">
            <img src={URL as string} alt="Preview" />
          </div>
        ) : (
          <div className="file-placeholder">
            <IconAdd className="icon" />
          </div>
        )}
        <FileInput
          id="thumbnail"
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={addThumbnailAction}
        />
      </FileInputLabel>
    </>
  );
}
