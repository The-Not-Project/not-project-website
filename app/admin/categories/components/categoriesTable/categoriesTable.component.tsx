import { Table } from "../../../shared/components/layout/Table";
import { ButtonsContainer } from "../../../shared/components/button/button";
import { EditButton, DeleteButton } from "./tableButtons"; 
import { Category } from "@/app/types/types";

export default function CategoriesTable({ categories }: { categories: Category[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Category</th>
          <th className="hide-mobile">Description</th>
          <th className="justify-right-mobile">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.name}</td>
            <td className="hide-mobile">{category.description}</td>
            <td className="justify-right">
              <ButtonsContainer>
                <EditButton id={category.id} />
                <DeleteButton id={category.id} />
              </ButtonsContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}