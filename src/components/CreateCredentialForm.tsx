import { DialogHTMLAttributes, useState } from "react";
import Input from "./ui/Input";
import Label from "./ui/Label";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { Copy, X, Eye, EyeOff, RefreshCcw } from "lucide-react";
import { FC } from "react";
import { useCredentialContext, Credential } from "../context/credential";
import PasswordModal from "./PasswordModal";

interface CreateCredentialFormProps
  extends DialogHTMLAttributes<HTMLDialogElement> {
  id: string;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
}

const CreateCredentialModal: FC<CreateCredentialFormProps> = ({
  id,
  openModal,
  closeModal,
  ...props
}) => {
  const { credentials, setCredentials } = useCredentialContext();

  const resetCredentialForm: Credential = {
    id: 0,
    title: "",
    folder: "No Folder",
    username: "",
    password: "",
    url: "",
    note: "",
  };
  const [userState, setUserState] = useState<Credential>(resetCredentialForm);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [itemName, setItemName] = useState("");
  const [url, setURL] = useState("");
  const [note, setNote] = useState("");

  function updateState(user: any) {
    const newId =
      credentials.length > 0 ? credentials[credentials.length - 1].id + 1 : 0;
    user.id = newId;
    user.password = password;

    // Reset Form
    setUserState(resetCredentialForm);
    setPassword("");

    closeModal(id);
    setCredentials([...credentials, user]);
  }

  return (
    <>
      <Modal
        id={id}
        className="backdrop:bg-black/80 bg-slate-100 rounded-lg lg:w-2/5
        lg:h-full border border-solid border-black"
        {...props}
      >
        <div className="flex justify-between bg-white border-b border-black p-5">
          <Label className="text-xl mt-1" value="New Credential" />
          <Button
            className="hover:border hover:border-solid hover:border-black border border-white px-2 py-2 rounded-lg"
            onClick={() => closeModal(id)}
          >
            <X size={16} />
          </Button>
        </div>

        <h2 className="ml-4 mt-2">Item</h2>
        <div className="flex flex-col m-3 p-3 bg-white border-black border-solid border rounded-md shadow-lg">
          <Input
            type="text"
            value={itemName}
            placeholder="Item name (required)"
            className="outline-none border-slate-900 focus:border-blue-600 hover:border-blue-600 border-solid border shadow-lg rounded-md mb-3 p-1 "
            onChange={(e) => setItemName(e.target.value)}
          />
          <div className=" border-slate-900 focus:border-blue-600 hover:border-blue-600 border-solid border shadow-lg rounded-md mb-2 p-1">
            <select className="w-full mx-1 outline-none font-mono break-all">
              <option>{userState.folder}</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col m-3 p-3 bg-white border-black border-solid border rounded-md shadow-lg">
          <Label className="mb-1" value="Username" />
          <Input
            type="text"
            value={userState.username}
            placeholder="e.g aminerwx"
            className="outline-none border-slate-900 focus:border-blue-600 hover:border-blue-600 border-solid border rounded-md p-1"
            onChange={(e) =>
              setUserState({ ...userState, username: e.target.value })
            }
          />
          <Label className="mt-4 mb-1" value="Password" />
          <div className="flex justify-between border-slate-900 focus:border-blue-600 hover:border-blue-600 border-solid border shadow-lg rounded-md mb-2 p-1">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              className="mx-1 outline-none font-mono break-all"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-between">
              <Button
                onClick={() => setShowPassword(!showPassword)}
                className=""
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </Button>
              <Button
                onClick={() => {
                  openModal("passwordModal");
                }}
              >
                <RefreshCcw size={24} />
              </Button>
              <Button onClick={() => navigator.clipboard.writeText(password)}>
                <Copy size={24} />
              </Button>
            </div>
          </div>
        </div>

        <Label className="mx-4 my-1" value="Optional" />
        <div className="flex flex-col m-3 p-3 bg-white border-black border-solid border rounded-md shadow-lg">
          <Label className="mb-1" value="URL" />
          <Input
            type="text"
            value={url}
            placeholder="https://example.com"
            className="outline-none border-slate-900 focus:border-blue-600 hover:border-blue-600 border-solid border rounded-md p-1"
            onChange={(e) => setURL(e.target.value)}
          />
          <Label value="Additional Note" className="mt-4 mb-1" />
          <div className="flex justify-between border-slate-900 focus:border-blue-600 hover:border-blue-600 border-solid border shadow-lg rounded-md mb-2 p-1">
            <Input
              type="text"
              value={note}
              className="mx-1 outline-none font-mono break-all"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="flex justify-end p-5 w-full border">
            <Button
              className="text-slate-900 font-medium rounded-md px-4 py-2 mr-2 bg-white"
              onClick={() => {
                closeModal(id);
              }}
            >
              Cancel
            </Button>
            <Button
              className="text-white font-medium rounded-md px-4 py-2 mr-5 bg-slate-900 hover:bg-slate-950"
              onClick={() => {
                updateState(userState);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
      <PasswordModal
        id="passwordModal"
        className="backdrop:bg-black/80 bg-slate-100 rounded-lg sm:w-full md:w-2/6 lg:h-2/3  border border-solid border-black"
        setPasswordCredential={setPassword}
        closeModal={closeModal}
      ></PasswordModal>
    </>
  );
};
export default CreateCredentialModal;
