import { PageSection, SectionTitle } from "../shared/components/layout/Section";
import { getUsersAction } from "@/lib/core-api/actions/user.actions";
import { UserTable } from "../shared/components/layout/Table";

import {
  RiAdminLine as AdminIcon,
  RiUserLine as UserIcon,
} from "react-icons/ri";
import clsx from "clsx";
import {
  LuBadgeCheck as Verified,
  LuGhost as Unverified,
} from "react-icons/lu";

export default async function Page() {
  const { users, success, message } = await getUsersAction();
  if (!success) return message ?? "An unexpected error occured";

  return (
    <PageSection>
      <SectionTitle>Users</SectionTitle>
      {users.length > 0 ? (
        <UserTable>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="role">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td className={clsx("status", user.emailVerified ? "verified" : "unverified")}>
                  <div>
                    {user.emailVerified ? (
                      <Verified size={15} />
                    ) : (
                      <Unverified size={15} />
                    )}
                    {user.emailVerified ? "verified" : "unverified"}
                  </div>
                </td>
                <td className={clsx("role", user.role === "admin" && "admin")}>
                  <div>
                    {user.role === "admin" ? (
                      <AdminIcon size={18} />
                    ) : (
                      <UserIcon size={18} />
                    )}
                    {user.role}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </UserTable>
      ) : (
        "No users found"
      )}
    </PageSection>
  );
}
