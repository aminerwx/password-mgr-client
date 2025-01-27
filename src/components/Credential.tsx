import { CredentialContext, User } from "../context/credential";
import CreateCredentialModal from "./CreateCredentialForm";
import Button from "./ui/Button";
import { Plus } from "lucide-react";
import { useState } from "react";
import TableView from "./TableView";

function openModal(id: string) {
  const modal = document.getElementById(id) as HTMLDialogElement;
  modal && modal.showModal();
}

function closeModal(id: string) {
  const modal = document.getElementById(id) as HTMLDialogElement;
  modal && modal.close();
}

function Credential() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <CredentialContext.Provider value={{ users, setUsers }}>
      <Button
        className="flex flex-row text-white font-medium rounded-md m-4 px-4 py-2 bg-slate-900 hover:bg-slate-950"
        onClick={() => openModal("credentialModal")}
      >
        <Plus size={24} />
        New
      </Button>
      <CreateCredentialModal
        id="credentialModal"
        openModal={openModal}
        closeModal={closeModal}
      />
      <TableView />
    </CredentialContext.Provider>
  );
}

export default Credential;
