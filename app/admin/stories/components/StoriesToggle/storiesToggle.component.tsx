import Switch from "react-switch";
import { ToggleContainer } from "./storiesToggle.styles";

type StoriesToggleProps = {
  showHidden: boolean;
  setShowHidden: (value: boolean) => void;
};

export default function StoriesToggle({ showHidden, setShowHidden }: StoriesToggleProps) {
  return (
    <ToggleContainer>
      <Switch
        checked={showHidden}
        onChange={() => setShowHidden(!showHidden)}
        onColor="#2d2d2d"
        offColor="#d1d5db"
        uncheckedIcon={false}
        checkedIcon={false}
        height={20}
        width={40}
      />
      <span>Trash</span>
    </ToggleContainer>
  );
}
