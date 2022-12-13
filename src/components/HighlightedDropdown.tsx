import { Select } from "@cedcommerce/ounce-ui";
import React, { useEffect, useState } from "react";

function HighlightedDropdown() {
  const [options, setOptions] = useState<any>([]);
  const [selected,setSelected]=useState<string>("");
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
          value: data[0].name,
        },
        {
          label: <p className="highlighted">{data[1].name}</p>,
          value: data[1].name,
        },
      ],
      label: "Highlighted Users",
    });
    let tempGroup: any = [];
    data.slice(2).forEach((it: any) => {
      tempGroup.push({ label: it.name, value: it.name });
    });
    tempOPtions.push({ group: tempGroup, label: "Other users" });
    setOptions(tempOPtions);
  };
  return (
    <div>
      <Select
        options={options}
        placeholder="Select a User"
        value={selected}
        onChange={(e:any) => setSelected(e)}
      />
    </div>
  );
}

export default HighlightedDropdown;
