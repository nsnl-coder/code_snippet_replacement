import React from 'react';

type InputSnippetProps = {
  value: Array<[string, string]>;
  setValue: (value: Array<[string, string]>) => void;
};

function InputArray({ value, setValue }: InputSnippetProps) {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    inputIndex: number,
  ) => {
    const newValue = event.target.value;
    const newArray = value.map((item, i) => {
      if (i === index) {
        return [
          inputIndex === 0 ? newValue : item[0],
          inputIndex === 1 ? newValue : item[1],
        ];
      } else {
        return item;
      }
    });
    setValue(newArray as [string, string][]);
  };

  const handleAddElement = () => {
    const newArray = [...value, ['', '']] as [string, string][];
    setValue(newArray);
  };

  const handleRemoveElement = (index: number) => {
    const newArray = [...value];
    newArray.splice(index, 1);
    setValue(newArray);
  };

  return (
    <div className="w-full text-lg h-full">
      <h2 className="font-medium text-lg mb-4">Options</h2>
      {value.map((item, index) => (
        <div key={index} className="flex mb-4">
          <input
            type="text"
            value={item[0]}
            onChange={(event) => handleInputChange(event, index, 0)}
            className="border rounded px-2 py-1 mr-2 w-full"
          />
          <input
            type="text"
            value={item[1]}
            onChange={(event) => handleInputChange(event, index, 1)}
            className="border rounded px-2 py-1 mr-2 w-full"
          />
          <button
            onClick={() => handleRemoveElement(index)}
            className="bg-red-500 text-white rounded px-2 py-1"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={handleAddElement}
        className="bg-blue-500 text-white rounded px-2 py-1"
      >
        Add Element
      </button>
    </div>
  );
}

export default InputArray;
