// Abstract
exports.stripMarkUp = (input) => {
  return input
    .replace(/<.+?>/g, "")
    .replace(/Abstract/, "")
    .trim();
};

// Date
exports.toIso = (date) => {
  const isoDate = new Date(date.replace("-", "/")).toISOString();
  return isoDate;
};

exports.dateConversion = (date) => {
  const dateArr = date.split(" ");
  const mS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = mS.findIndex((el) => el === dateArr[1]);
  const newDate = new Date(dateArr[2], month, dateArr[0]);
  return newDate;
};

// DOI
exports.getFirstItemInArray = (arr) => arr[0];
exports.getSecondItemInArray = (arr) => arr[1];

// Keywords
exports.splitBySemiColon = (arr) => {
  if (!arr) {
    return [];
  }
  const newArr = arr.split(";");
  const trimmedNewArr = newArr.map((item) => {
    const itemCapped = item.replace(/\b(\w)/g, (match) => match.toUpperCase());
    return itemCapped.trim();
  });
  const kantRemovedFromArr = trimmedNewArr.filter((item) => item !== "Kant");
  return kantRemovedFromArr;
};

// Image
exports.getGenerativeImg = (color) => {
  return `https://generative-placeholders.glitch.me/image?width=1200&height=600&colors=${color}`;
};

exports.getImgUrl = (imgObj) => imgObj.url;

// Name
exports.nameCheck = (input) => {
  if (!input) {
    return "";
  }

  if (Array.isArray(input)) {
    return input.join();
  }

  return input;
};

exports.removeNewLines = (input) => {
  if (!this.nameCheck(input)) {
    return "";
  }
  return input.replace(/\n/g, "");
};

exports.reverseNameOrder = (name) => {
  if (!this.nameCheck(input)) {
    return "";
  }
  if (!/,/.test(name)) {
    return name;
  }

  if (Array.isArray(name)) {
    name.forEach((val) => {
      const splitAtComma = val.split(",");
      const first = splitAtComma[1].trim();
      const last = splitAtComma[0].trim();
      const fullName = `${first} ${last}`;
      return fullName;
    });
  }
  const splitAtComma = name.split(",");
  const first = splitAtComma[1].trim();
  const last = splitAtComma[0].trim();
  const fullName = `${first} ${last}`;
  return fullName;
};

exports.removeDoubleSpace = (input) => {
  if (!this.nameCheck(input)) {
    return "";
  }
  return input.replace("  ", " ");
};

// Url
exports.removeParams = (url) => {
  return url.replace(/\?.+/g, "");
};
