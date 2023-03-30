import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [productDetail, setProductDetail] = useState([]);
  let id = 7574;
  useEffect(() => {
    axios
      .get(`https://backend.bppshop.com.bd/api/v1/products/details/${id}`)
      .then((res) => {
        setProductDetail(res?.data?.data);
      });
  }, [id]);

  //default choise option
  const choice_options = productDetail?.choice_options;
  const choice_options_name = choice_options?.map((option) => option?.name);
  const choice_options_defaultvalue = choice_options?.map(
    (option) => option?.options[0]
  );
  let choices = choice_options_name?.map((name, index) => ({
    name,
    options: choice_options_defaultvalue[index],
  }));
  let defaultChoices = choices;


  //select choise option
  const [selectedOption, setSelectedOption] = useState([]);
  if (selectedOption.length > 0) {
    defaultChoices = selectedOption;
  }
  const OptionSelectHandler = (e) => {
    const selectOption = e.target.value.split("@");
    const newName = {
      name: selectOption[0],
      options: selectOption[1].trim(),
    };
    defaultChoices.push(newName);
    if (defaultChoices.findIndex((f) => f.name === newName.name) === -1) {
      setSelectedOption((element) => [...defaultChoices, newName]);
    } else {
      const newSelectedOption = [...defaultChoices];
      const filterArray = newSelectedOption.filter(
        (f) => f.name !== newName.name
      );
      setSelectedOption((element) => [...filterArray, newName]);
    }
  };
  
  return (
    <div className="App">
      <div className="my-5">
        <h1>Practice Varient</h1>
      </div>
      <div className="w-50 mx-auto">
        {productDetail?.choice_options?.map((list, index) => (
          <div key={list?.id} className="choiceOptionList">
            <h5>{list?.title}:</h5>
            <div className="choiceOptionSelection">
              <select name="options" onChange={(e) => OptionSelectHandler(e)}>
                <option value="none" selected disabled hidden>
                  Choose {list?.title}{" "}
                </option>
                {list?.options?.map((option, indx) => (
                  <option value={list?.name + "@" + option} key={indx}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
