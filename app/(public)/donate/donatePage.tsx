"use client";
import { useState } from "react";
import { DonateContainer } from "./styles";

export default function DonatePage() {
  const [donation, setDonation] = useState(0);
  return (
    <DonateContainer>
      <h1>GIVE US MONEY</h1>
      <input
        type="number"
        placeholder="minimun $46"
        defaultValue={donation || ""}
        onChange={(e) => setDonation(Number(e.target.value))}
      />
      <button
        onClick={() => {
          if (donation < 46) {
            alert("You blind or something?");
            return;
          }
          alert("I wish");
        }}
      >
        take my money
      </button>
    </DonateContainer>
  );
}
