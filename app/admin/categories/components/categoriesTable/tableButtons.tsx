// @/app/admin/categories/components/categoriesTable/tableButtons.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../../shared/components/button/button";
import { deleteCategoryAction } from "@/lib/internal-api/actions/categories.actions";

export function OpenCreateButton() {
  const router = useRouter();
  return (
    <Button className="cornered" onClick={() => router.push("?create=true")}>
      Add
    </Button>
  );
}

export function EditButton({ id }: { id: string }) {
  const router = useRouter();
  return <Button onClick={() => router.push(`?edit=${id}`)}>Edit</Button>;
}

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm("Delete this category?")) {
      await deleteCategoryAction(id);
      router.push("/admin/categories");
    }
  };
  return <Button onClick={handleDelete}>Delete</Button>;
}