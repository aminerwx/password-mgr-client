import { FC } from "react";
import { Copy, EllipsisVertical, Layers2, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover.tsx";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { Credential, useCredentialContext } from "../context/credential";

const DataTable: FC = () => {
  const { credentials: credentials, setCredentials: setUsers } =
    useCredentialContext();

  function deleteCredential(id: number) {
    setUsers(credentials.filter((user) => user.id !== id));
  }

  //TODO: fix
  function duplicateCredential(id: number) {
    const curr = { ...credentials[id] };
    curr.id++;
    setUsers([...credentials, curr]);
  }

  function viewCredential(credential: Credential) {}

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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {credentials.map((credential: Credential) => (
              <tr
                key={credential.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Input type="checkbox" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    className="text-sm font-semibold text-gray-700 hover:text-gray-900 hover:underline"
                    onClick={() => viewCredential(credential)}
                  >
                    {credential.title}
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Popover>
                    <PopoverTrigger>
                      <EllipsisVertical />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="mb-2">
                        <Button
                          onClick={() =>
                            navigator.clipboard.writeText(credential.username)
                          }
                        >
                          <Copy
                            size={24}
                            className="inline align-middle mr-3"
                          />
                          <p className="inline align-middle">Copy username</p>
                        </Button>
                      </div>
                      <div className="mb-2">
                        <Button
                          onClick={() =>
                            navigator.clipboard.writeText(credential.password)
                          }
                        >
                          <Copy
                            size={24}
                            className="inline align-middle mr-3"
                          />
                          <p className="inline align-middle">Copy password</p>
                        </Button>
                      </div>
                      <div className="mb-2">
                        <Button
                          onClick={() => duplicateCredential(credential.id)}
                        >
                          <Layers2
                            size={24}
                            className="inline align-middle mr-3"
                          />
                          <p className="inline align-middle">Duplicate</p>
                        </Button>
                      </div>
                      <div>
                        <Button onClick={() => deleteCredential(credential.id)}>
                          <Trash
                            size={24}
                            className="inline align-middle mr-3 text-red-500"
                          />
                          <p className="inline align-middle text-red-500">
                            Delete
                          </p>
                        </Button>
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
