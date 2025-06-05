import React, {useRef, useEffect} from 'react'


export default function CompareStatsTable({playerOne, playerTwo}) {
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

    function createTableRow(statForPlayer, stat) {
        let playerOneClass
        let playerTwoClass
        if (statForPlayer === "world_ranking" || statForPlayer === "scoring_avg") {
          playerOneClass = playerOne[statForPlayer] < playerTwo[statForPlayer] ? "stat-better-than" : "stat-worse-than";
          playerTwoClass = playerTwo[statForPlayer] < playerOne[statForPlayer] ? "stat-better-than" : "stat-less-than"
        } else {
          playerOneClass = playerOne[statForPlayer] > playerTwo[statForPlayer] ? "stat-better-than" : "stat-worse-than";
          playerTwoClass = playerTwo[statForPlayer] > playerOne[statForPlayer] ? "stat-better-than" : "stat-less-than"
        }
    
        return <tr>
        <td className={playerOneClass}>{formatValues(playerOne, statForPlayer)}</td>
        <td>{stat}</td>
        <td className={playerTwoClass}>{formatValues(playerTwo, statForPlayer)}</td>
      </tr>
      }

  return (
    <div className="table-container">
      <table ref={table}>
      <tr>
        <th>{playerOne.name}</th>
        <th>Stats</th>
        <th>{playerTwo.name}</th>
      </tr>
        {createTableRow("world_ranking", "World Ranking")}
        {createTableRow("scoring_avg", "Scoring Average")}
        {createTableRow("birdie_avg", "Birdie Average")}
        {createTableRow("driving_avg", "Driving Average")}
        {createTableRow("fairways", "Fairways Hit")}
        {createTableRow("gir", "Greens in Regulation")}
        {createTableRow("scrambling", "Scrambling")}
        {createTableRow("sg_approach", "Strokes Gained: Approach")}
        {createTableRow("sg_putting", "Strokes Gained: Putting")}
        {createTableRow("sg_total", "Strokes Gained: Total")}
      </table>
      </div>
    
  )
}
