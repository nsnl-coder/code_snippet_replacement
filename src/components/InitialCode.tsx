import { useState } from 'react';

type InitialCodeProps = {
  value: string;
  setValue: (value: string) => void;
};

function InitialCode({ value, setValue }: InitialCodeProps): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <label htmlFor="snippet" className="font-medium text-lg mb-4">
        Initial code
      </label>
      <textarea
        name="snippet"
        id="snippet"
        cols={60}
        rows={10}
        className="w-full flex-grow border rounded-md p-4"
        value={value}
        onChange={handleChange}
      ></textarea>
    </>
  );
}

export default InitialCode;
