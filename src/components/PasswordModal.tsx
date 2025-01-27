import { DialogHTMLAttributes, useState } from "react";
import Slider from "./ui/Slider";
import Label from "./ui/Label";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { Copy, X, Dice5 } from "lucide-react";
import { FC } from "react";

export type Password = {
  value: string;
  entropy: number;
  charSet: number;
  strength: string;
};

import {
  newRandomPassword,
  charsetToggleHandler,
  passwordStrengthClassNameHandler,
} from "../utils";

interface PasswordModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  id: string;
  setPasswordCredential: any;
  closeModal: (id: string) => void;
}

type CharSetState = {
  isLower: boolean;
  isUpper: boolean;
  isNumber: boolean;
  isSpecial: boolean;
};

const PasswordModal: FC<PasswordModalProps> = ({
  id,
  setPasswordCredential,
  closeModal,
  ...props
}) => {
  //  const state = useCredentialContext();
  const rng = newRandomPassword(12, true, true, true, false);
  const [password, setPassword] = useState<Password>(rng);
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [passwordStrengthStyle, setPasswordStrengthStyle] = useState({
    bgColor: "",
    size: "",
    BarStyle: "",
    textColor: "",
    value: "",
    labelStyle: "",
  });
  const [charSet, setCharset] = useState<CharSetState>({
    isLower: true,
    isUpper: true,
    isNumber: true,
    isSpecial: false,
  });

  const handleMouseUp = () => {
    handlePasswordGeneration(charSet);
  };

  const handlePasswordGeneration = (current: CharSetState) => {
    if (
      !current.isLower &&
      !current.isUpper &&
      !current.isNumber &&
      !current.isSpecial
    ) {
      setCharset({
        isLower: true,
        isUpper: true,
        isNumber: true,
        isSpecial: false,
      });
    }

    const newPassword = newRandomPassword(
      passwordLength,
      current.isLower,
      current.isUpper,
      current.isNumber,
      current.isSpecial,
    );

    const strStyle = passwordStrengthClassNameHandler(newPassword.strength);
    setPasswordStrengthStyle(strStyle);
    setPassword(newPassword);
  };

  return (
    <>
      <Modal
        id={id}
        className="backdrop:bg-black/80 bg-slate-100 rounded-lg sm:w-full md:w-2/6 lg:h-2/3  border border-solid border-black"
        {...props}
      >
        <div className="flex justify-between bg-white border-b border-black p-5">
          <Label className="text-xl mt-1" value="Password Generator" />
          <Button
            className="hover:border hover:border-solid hover:border-black border border-white px-2 py-2 rounded-lg"
            onClick={() => closeModal(id)}
          >
            <X size={24} />
          </Button>
        </div>

        <div className="lg:mx-10 lg:my-5 lg:px-5 flex flex-col m-3 p-3 bg-white border-black border-solid border rounded-lg shadow-lg">
          <Label className="mb-2" value="Password" />
          <div className="flex justify-between border-slate-900 mb-2 border-solid border shadow-lg rounded-md p-1">
            <p className="mx-1 font-mono break-all">{password.value}</p>
            <div className="flex justify-between mx-1">
              <Button onClick={() => handlePasswordGeneration(charSet)}>
                <Dice5 size={24} />
              </Button>
              <Button
                onClick={() => navigator.clipboard.writeText(password.value)}
              >
                <Copy size={24} />
              </Button>
            </div>
          </div>
          <div className={passwordStrengthStyle.BarStyle}></div>
          <Label
            className={passwordStrengthStyle.labelStyle}
            value={passwordStrengthStyle.value}
          />
        </div>

        <p className="pl-10">Options</p>
        <div className="lg:mx-10 lg:my-5 m-3 p-3 bg-white border-black border-solid border rounded-lg shadow-lg">
          <div className="flex justify-evenly my-3">
            <Label value="Length" />
            <Slider
              min={8}
              max={100}
              value={passwordLength}
              onMouseUp={handleMouseUp}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
            />
            <Input
              type="number"
              className="w-16 h-8 pl-1 border-1 border-solid border-black rounded focus:outline-none focus:border-2"
              min={8}
              max={100}
              value={passwordLength}
              onChange={(e) => {
                if (Number(e.target.value) < 8) {
                  e.target.value = "8";
                }
                setPasswordLength(Number(e.target.value));
              }}
            />
          </div>

          <div className="flex justify-evenly">
            <Button
              className={charsetToggleHandler(charSet.isUpper)}
              onClick={() => {
                charSet.isUpper = !charSet.isUpper;
                handlePasswordGeneration(charSet);
              }}
            >
              A-Z
            </Button>
            <Button
              className={charsetToggleHandler(charSet.isLower)}
              onClick={() => {
                charSet.isLower = !charSet.isLower;
                handlePasswordGeneration(charSet);
              }}
            >
              a-z
            </Button>
            <Button
              className={charsetToggleHandler(charSet.isNumber)}
              onClick={() => {
                charSet.isNumber = !charSet.isNumber;
                handlePasswordGeneration(charSet);
              }}
            >
              0-9
            </Button>
            <Button
              className={charsetToggleHandler(charSet.isSpecial)}
              onClick={() => {
                charSet.isSpecial = !charSet.isSpecial;
                handlePasswordGeneration(charSet);
              }}
            >
              !@#$...
            </Button>
          </div>
        </div>
        <div className="flex justify-end p-5 w-full border">
          <Button
            onClick={() => {
              closeModal(id);
              setPasswordCredential(password.value);
            }}
            className="text-white font-medium rounded-md px-4 py-2 mr-5 bg-slate-900 hover:bg-slate-950"
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PasswordModal;
