function getRandomInt(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export type Password = {
  value: string;
  entropy: number;
  charSet: number;
  strength: string;
};

type StrengthStyle = {
  bgColor: string;
  size: string;
  BarStyle: string;
  textColor: string;
  value: string;
  labelStyle: string;
};

function newRandomPassword(
  length: number,
  isLower: boolean,
  isUpper: boolean,
  isNumber: boolean,
  isSpecial: boolean,
): Password {
  const charset: string[] = [];

  const pwd: Password = {
    value: "",
    entropy: 0,
    charSet: 0,
    strength: "",
  };

  if (isLower) {
    charset.push(..."abcdefghijklmnopqrstuvwxyz".split(""));
    charset.sort(() => 0.5 - Math.random());
    pwd.charSet += 26;
  }

  if (isUpper) {
    charset.push(..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
    charset.sort(() => 0.5 - Math.random());
    pwd.charSet += 26;
  }

  if (isNumber) {
    charset.push(..."0123456789".split(""));
    charset.sort(() => 0.5 - Math.random());
    pwd.charSet += 10;
  }

  if (isSpecial) {
    charset.push(..."`~!@#$%^&*-=_+[{()}]\\".split(""));
    charset.sort(() => 0.5 - Math.random());
    pwd.charSet += 21;
  }

  if (!isLower && !isUpper && !isNumber && !isSpecial) {
    charset.push(..."abcdefghijklmnopqrstuvwxyz".split(""));
    charset.sort(() => 0.5 - Math.random());

    charset.push(..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
    charset.sort(() => 0.5 - Math.random());
    pwd.charSet += 52;
  }

  for (let i = 0; i < length; i++) {
    pwd.value += charset[getRandomInt(0, charset.length - 1)];
  }

  pwd.entropy = trigraph(pwd.value, pwd.charSet);
  pwd.strength = strengthPwd(pwd.entropy);

  return pwd;
}

function trigraph(passToCheck: string, charsetSize: number) {
  var i, score, str;

  score = 1;
  passToCheck = passToCheck.toLowerCase().replace(/[\W_]/gi, " ").trim();
  passToCheck = "_" + passToCheck + "_";

  for (i = 0; i < passToCheck.length - 2; i += 1) {
    str = passToCheck.substring(i, 3);
    score *= charsetSize;
  }

  return Math.log2(score);
}

function strengthPwd(score: number) {
  if (score <= 32) {
    return "Very weak";
  } else if (score <= 48) {
    return "Weak";
  } else if (score <= 64) {
    return "Reasonable";
  } else if (score <= 80) {
    return "Strong";
  }
  return "Very strong !";
}

function charsetToggleHandler(state: boolean): string {
  const charsetPressed =
    "border border-solid border-slate-600 rounded-lg text-white px-3 py-1 shadow-lg bg-green-700";
  const charsetDefault =
    "border border-solid border-slate-600 rounded-lg text-white px-3 py-1 shadow-lg bg-slate-900";
  return state ? charsetPressed : charsetDefault;
}

function strengthStyle(score: number): StrengthStyle {
  const strStyle = {
    bgColor: "",
    size: "",
    BarStyle: "",
    textColor: "",
    value: "",
    labelStyle: "",
  };

  if (score <= 32) {
    strStyle.value = "Very weak";
    strStyle.bgColor = "bg-red-500";
    strStyle.size = "h-2 w-1/6";
    strStyle.textColor = "text-red-600";
  } else if (score <= 48) {
    strStyle.value = "Weak";
    strStyle.bgColor = "bg-red-500";
    strStyle.size = "h-2 w-1/4";
    strStyle.textColor = "text-red-600";
  } else if (score <= 64) {
    strStyle.value = "Reasonable";
    strStyle.bgColor = "bg-orange-500";
    strStyle.size = "h-2 w-1/2";
    strStyle.textColor = "text-orange-600";
  } else if (score <= 80) {
    strStyle.value = "Strong";
    strStyle.bgColor = "bg-green-400";
    strStyle.size = "h-2 w-4/5";
    strStyle.textColor = "text-green-500";
  } else {
    strStyle.value = "Very strong !";
    strStyle.bgColor = "bg-green-500";
    strStyle.size = "h-2 w-23/24";
    strStyle.textColor = "text-green-600";
  }

  strStyle.BarStyle = `rounded-lg ${strStyle.bgColor} ${strStyle.size}`;
  strStyle.labelStyle = `mx-1 mb-1 font-medium ${strStyle.textColor}`;

  return strStyle;
}

function passwordStrengthClassNameHandler(strength: string) {
  const passwordStrengthStyle = {
    bgColor: "",
    size: "",
    BarStyle: "",
    textColor: "",
    value: strength,
    labelStyle: "",
  };

  switch (strength) {
    case "Very weak":
      passwordStrengthStyle.bgColor = "bg-red-500";
      passwordStrengthStyle.size = "h-2 w-1/6";
      passwordStrengthStyle.textColor = "text-red-600";
      break;

    case "Weak":
      passwordStrengthStyle.bgColor = "bg-red-500";
      passwordStrengthStyle.size = "h-2 w-1/4";
      passwordStrengthStyle.textColor = "text-red-600";
      break;

    case "Reasonable":
      passwordStrengthStyle.bgColor = "bg-orange-500";
      passwordStrengthStyle.size = "h-2 w-1/2";
      passwordStrengthStyle.textColor = "text-orange-600";
      break;

    case "Strong":
      passwordStrengthStyle.bgColor = "bg-green-400";
      passwordStrengthStyle.size = "h-2 w-4/5";
      passwordStrengthStyle.textColor = "text-green-500";
      break;

    case "Very strong !":
      passwordStrengthStyle.bgColor = "bg-green-500";
      passwordStrengthStyle.size = "h-2 w-23/24";
      passwordStrengthStyle.textColor = "text-green-600";
      break;
  }

  passwordStrengthStyle.BarStyle = ` rounded-lg ${passwordStrengthStyle.bgColor} ${passwordStrengthStyle.size}`;
  passwordStrengthStyle.labelStyle = `mx-1 mb-1 font-medium ${passwordStrengthStyle.textColor}`;

  return passwordStrengthStyle;
}
export {
  newRandomPassword,
  charsetToggleHandler,
  passwordStrengthClassNameHandler,
};
