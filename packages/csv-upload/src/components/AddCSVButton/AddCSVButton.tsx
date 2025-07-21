import { FC } from "react";
import { useTable } from "@contexts/TableProvider"


export interface AddCSVButtonProps {

}

const testData = [
  ["test 1", "1", "17-05-2022"], 
  ["test 2", "2", "17 Sep 2022"],
  ["test 3", "3", "May 22, 2022"],
  ["test 4", "4", "17/05/2003"]
]

const AddCSVButton: FC<AddCSVButtonProps>= () => {
  const {addRow} = useTable(); 

  const onClick = () =>  {
    testData.map((row) => {
      //parse
      //validate
      addRow(row);
    })
  }

  return (
    <>
    <button onClick={onClick}>
      Add CSV 
    </button>
    </>
  )
  

}

export default AddCSVButton; 