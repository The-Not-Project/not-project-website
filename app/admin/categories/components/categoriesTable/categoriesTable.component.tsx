import {
  Button,
  ButtonsContainer,
} from "../../../shared/components/button/button";
import { Table } from "../../../shared/components/layout/Table";
import { Category } from "@/app/types/types";

type CategoriesTableProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => Promise<void>;
};

export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td className="justify-right">
              <ButtonsContainer>
                <Button onClick={() => onEdit(category)}>Edit</Button>
                <Button onClick={() => handleDelete(category.id)}>
                  Delete
                </Button>
              </ButtonsContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
