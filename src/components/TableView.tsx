import { FC } from "react";
import { Copy, EllipsisVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover.tsx";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useCredentialContext } from "../context/credential";

const DataTable: FC = () => {
  const { users } = useCredentialContext();

  return (
    <div className="p-6">
      <div className="bg-gray-50 shadow-lg rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Input type="checkbox" />
                <p className="ms-1 inline">All</p>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Input type="checkbox" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Popover>
                    <PopoverTrigger>
                      <EllipsisVertical />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <Button
                          onClick={() =>
                            navigator.clipboard.writeText(user.username)
                          }
                        >
                          <Copy size={24} />
                        </Button>
                        Copy username
                      </div>
                      <div>
                        <Button
                          onClick={() =>
                            navigator.clipboard.writeText(user.password)
                          }
                        >
                          <Copy size={24} />
                        </Button>
                        Copy Password
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
