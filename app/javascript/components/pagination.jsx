import React, { useState } from "react";

export default function Pagination (props) {
    const pageNumbers =[]
    const [currentNum, setCurrentNum] = useState(1)

    for (let i = 1; i <= Math.ceil(props.totalObjects / props.objectsPerPage); i++) {
        pageNumbers.push(i)
    }
    let classCurrentPage = ""

    let checkCurrentPage = (number) => {

      if (number == currentNum ) {
        classCurrentPage = "w-10 h-10 text-white transition-colors duration-150 bg-indigo-600 border border-r-0 border-indigo-600 rounded-full focus:shadow-outline"
      } else {
        classCurrentPage = "w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
      }
  }

    return (
        <div className="bg-white p-8 rounded-md w-full flex items-center justify-center">
            <nav aria-label="Page navigation">
  <ul className="inline-flex space-x-2">

    {
                    pageNumbers.map(number => (

                      
                        <li key={number}>
                          {checkCurrentPage(number)}
                          <button
                           className={classCurrentPage}
                           onClick={() => {props.paginate(number);
                                          setCurrentNum(number)}}>{number}</button></li>

                    ))
                }
  </ul>
</nav>
        </div>
    )
}