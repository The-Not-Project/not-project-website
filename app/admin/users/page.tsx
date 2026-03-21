import { PageSection, SectionTitle } from "../shared/components/layout/Section";
import { getUsersAction } from "@/lib/core-api/actions/user.actions";
import { Table } from "../shared/components/layout/Table";

export default async function Page() {
  const { users, success, message } = await getUsersAction();
  if (!success) return message ?? "An unexpected error occured";

  return (
    <PageSection>
      <SectionTitle>Users</SectionTitle>
      {users.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.emailVerified ? "verified" : "unverified"}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        "No users found"
      )}
    </PageSection>
  );
}
