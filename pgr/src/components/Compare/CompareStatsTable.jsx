import React, {useRef, useEffect} from 'react'


export default function CompareStatsTable({playerOne, playerTwo}) {
  const tableRows = [
    { key: "world_ranking", label: "World Ranking" },
    { key: "scoring_avg", label: "Scoring Average" },
    { key: "birdie_avg", label: "Birdie Average" },
    { key: "driving_avg", label: "Driving Average" },
    { key: "fairways", label: "Fairways Hit" },
    { key: "gir", label: "Greens in Regulation" },
    { key: "scrambling", label: "Scrambling" },
    { key: "sg_approach", label: "Strokes Gained: Approach" },
    { key: "sg_putting", label: "Strokes Gained: Putting" },
    { key: "sg_total", label: "Strokes Gained: Total" },
  ]

    const table = useRef(null)

    useEffect(() => {
        if (playerOne && playerTwo && table.current != null) {
          table.current.scrollIntoView({behavior: "smooth"})
        }
      }, [playerOne, playerTwo])

    function formatValues(player, statForPlayer) {
        const isPercent = statForPlayer === "gir" || statForPlayer === "fairways" || statForPlayer === "scrambling" ? "%" : ""
        const isSg = (statForPlayer === "sg_approach" || statForPlayer === "sg_putting" || statForPlayer === "sg_total") && player[statForPlayer] > 0 ? "+" : ""
        return `${isSg}${player[statForPlayer]}${isPercent}`
      }

    function createTableRow(statForPlayer, stat, key) {
        let playerOneClass
        let playerTwoClass
        if (statForPlayer === "world_ranking" || statForPlayer === "scoring_avg") {
          playerOneClass = playerOne[statForPlayer] < playerTwo[statForPlayer] ? "stat-better-than" : "stat-worse-than";
          playerTwoClass = playerTwo[statForPlayer] < playerOne[statForPlayer] ? "stat-better-than" : "stat-less-than"
        } else {
          playerOneClass = playerOne[statForPlayer] > playerTwo[statForPlayer] ? "stat-better-than" : "stat-worse-than";
          playerTwoClass = playerTwo[statForPlayer] > playerOne[statForPlayer] ? "stat-better-than" : "stat-less-than"
        }
    
        return <tr key={key}>
        <td className={playerOneClass}>{formatValues(playerOne, statForPlayer)}</td>
        <td>{stat}</td>
        <td className={playerTwoClass}>{formatValues(playerTwo, statForPlayer)}</td>
      </tr>
      }

  return (
    <div className="table-container">
      <table ref={table}>
        <thead>
      <tr>
        <th>{playerOne.name}</th>
        <th>Stats</th>
        <th>{playerTwo.name}</th>
      </tr>
      </thead>
      <tbody>
      {tableRows.map((row) => {
        return createTableRow(row.key, row.label, row.key)
      })}
      </tbody>
      </table>
      </div>
    
  )
}
