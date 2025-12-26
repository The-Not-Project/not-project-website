import DonatePage from "./donatePage";

import seoKeywords from "@/app/constants/seoKeywords";

export const metadata = {
  title: 'Donate | The Not Project',
  description: 'Support The Not Project by making a donation. Your contribution helps us continue our mission of sharing stories and fostering community.',
  keywords: seoKeywords.donate
}

export default function Page() {
  return <DonatePage />
}
