import { Select } from "@cedcommerce/ounce-ui";
import React, { useEffect, useState } from "react";

function HighlightedDropdown() {
  const [options, setOptions] = useState<any>([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
      res.json().then((data) => formatData(data))
    );
  }, []);

  const formatData = (data: any) => {
    let tempOPtions: any = [];
    tempOPtions.push({
      group: [
        {
          label: <p className="highlighted">{data[0].name}</p>,
          value: "0.1",
        },
        {
          label: <p className="highlighted">{data[1].name}</p>,
          value: "0.2",
        },
      ],
      label:  "Highlighted Users",
      value: "0",
    });
    let tempGroup: any = [];
    data.slice(2).forEach((it: any) => {
      tempGroup.push({ label: it.name, value: it.name });
    });
    tempOPtions.push({ group: tempGroup,label:"Other users" });
    setOptions(tempOPtions);
  };
  return (
    <div>
      <Select options={options} placeholder="Select a User"/>
    </div>
  );
}

export default HighlightedDropdown;
