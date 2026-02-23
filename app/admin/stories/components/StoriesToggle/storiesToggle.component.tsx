"use client";

import Switch from "react-switch";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ToggleContainer } from "./storiesToggle.styles";

export default function StoriesToggle({ showHidden }: { showHidden: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleToggle = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) params.set("trash", "true");
    else params.delete("trash");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <ToggleContainer>
      <Switch
        checked={showHidden}
        onChange={handleToggle}
        onColor="#2d2d2d"
        offColor="#d1d5db"
        uncheckedIcon={false}
        checkedIcon={false}
        height={20}
        width={40}
      />
      <span>Hidden</span>
    </ToggleContainer>
  );
}
