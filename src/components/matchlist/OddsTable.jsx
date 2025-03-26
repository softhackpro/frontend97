const OddsTable = ({ sections }) => {
    if (!sections || sections.length === 0) return null;
  
    let result = [];
  
    if (sections.length === 3) {
      // Case: If length is 3, display as it is
      for (let i = 0; i < 3; i++) {
        result.push(
          <td key={i} className="text-center px-2 py-1 hidden md:table-cell">
            {sections[i].odds.map((odd, index) => (
              <span
                key={index}
                className={`font-bold px-2 py-1 ${
                  odd.otype.toLowerCase() === "back" ? "bg-blue-400" : "bg-red-400"
                }`}
              >
                {odd.odds}
              </span>
            ))}
          </td>
        );
      }
    } else if (sections.length === 2) {
      // Case: If length is 2, insert a middle default td
      result.push(
        <td key={0} className="text-center px-2 py-1 hidden md:table-cell">
          {sections[0].odds.map((odd, index) => (
            <span
              key={index}
              className={`font-bold px-2 py-1 ${
                odd.otype.toLowerCase() === "back" ? "bg-blue-400" : "bg-red-400"
              }`}
            >
              {odd.odds}
            </span>
          ))}
        </td>
      );
  
      // Middle td with default values (0,0)
      result.push(
        <td key={1} className="text-center px-2 py-1 hidden md:table-cell">
          {["back", "lay"].map((type, index) => (
            <span
              key={index}
              className={`font-bold px-2 py-1 ${
                type === "back" ? "bg-blue-400" : "bg-red-400"
              }`}
            >
              0
            </span>
          ))}
        </td>
      );
  
      // Third td with second section data
      result.push(
        <td key={2} className="text-center px-2 py-1 hidden md:table-cell">
          {sections[1].odds.map((odd, index) => (
            <span
              key={index}
              className={`font-bold px-2 py-1 ${
                odd.otype.toLowerCase() === "back" ? "bg-blue-400" : "bg-red-400"
              }`}
            >
              {odd.odds}
            </span>
          ))}
        </td>
      );
    }
  
    return <>{result}</>;
  };
  

  export default OddsTable;