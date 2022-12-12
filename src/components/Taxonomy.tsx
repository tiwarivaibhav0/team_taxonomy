/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Select, Toast, ToastWrapper } from "@cedcommerce/ounce-ui";
import React, { useEffect, useState } from "react";
function Taxonomy() {
  const [options, setOptions] = useState<any>([]);
  const [childSeparatedData, setChildSeparatedData] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    fetch("/data.txt")
      .then((res) => res.text())
      .then((tmpData) => formatData(tmpData));
  }, []);

  const formatData = (data: any) => {
    let lineSeparatedData = data.split("\n");
    lineSeparatedData.splice(0, 1);

    let tempchildSeparatedData: any = [];
    lineSeparatedData.forEach((it: any) => {
      tempchildSeparatedData.push(it.split(" > "));
    });

    let newOptions: any = [];
    tempchildSeparatedData.forEach((it: any) => {
      if (it.length === 1) {
        newOptions.push({ label: it[0], value: it[0] });
      }
      setOptions([...options, newOptions]);
      setChildSeparatedData(tempchildSeparatedData);
    });
  };

  const onSelectChange = (e: any, i: any) => {
    let newOptions: any = [];
    let tempOptions = [...options];
    let tempLength = options.length;
    if (i <= selectedCategory.length - 1) {
      let tempSelected = [...selectedCategory];
      tempSelected=tempSelected.slice(0,i);
      tempSelected.push(e)
      setSelectedCategory(tempSelected);
      tempOptions = tempOptions.slice(0, i + 1);
      tempLength = i + 1;
    } else setSelectedCategory([...selectedCategory, e]);
    childSeparatedData.forEach((it: any, i: any) => {
      if (it.length === tempLength + 1 && it[tempLength - 1] === e) {
        newOptions.push({
          label: it[tempLength],
          value: it[tempLength],
        });
      }
    });

    if (newOptions.length !== 0) {
      tempOptions.push(newOptions);
      tempLength += 1;
    } else {
      setToast(true);
    }

    setOptions(tempOptions);
  };
  return (
    <div className="hero">
      {Array(options.length)
        .fill(1)
        .map((it, i) => (
          <Card key={selectedCategory[i]}>
            <Select
              onChange={(e) => {
                setToast(false);
                onSelectChange(e, i);
              }}
              options={options[i]}
              value={selectedCategory[i]}
              placeholder="Select"
              popoverContainer="body"
              thickness="thick"
            />
          </Card>
        ))}
      {toast && (
        <ToastWrapper>
          <Toast
            message="No More Children"
            timeout={2000}
            onDismiss={() => setToast(false)}
          />
        </ToastWrapper>
      )}
    </div>
  );
}

export default Taxonomy;
