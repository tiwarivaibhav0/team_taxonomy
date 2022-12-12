import React from "react";

function Text() {
  let person = {
    name: {
      firstName: "vishal",
      lastName: {
        lastname2:{
            lastname3:{
                lastname4:{
                    lastname5:{
                        lastname6:{
                            finalLastName:"Tiwari",
                            otherLastName:"theOtherLastName"
                        }
                    }
                }
            }
        }
      },
    },
    company: {
      previousCompany: ["Flipkart", "Microsoft"],
      currentCompany: "cedcoss",
      nextCompanies: ["Meta", "Google"],
      
    },
    age: 25,
    skills: ["React", "php"],
    newKey:"vvv"
  };

  function fun(obj: any, res: any, parent: any = "") {
    let key: keyof typeof obj;
    for (key in obj) {
      if (typeof obj[key] === "object") {
        if (obj[key].length > 0) res[parent + key] = obj[key];
        else fun(obj[key], res, parent + key + ".");
      } else {
        res[parent + key] = obj[key];
      }
    }
  }
  let result = {};
  fun(person, result);
  console.log(result);
  return <div>Check Console for Task 2 result</div>;
}

export default Text;
