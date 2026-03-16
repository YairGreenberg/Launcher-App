import React from 'react'
import type { Launcher } from '../types/type-index'


interface Props {
    launchers:Launcher[]
}


function LaunchersTable({launchers}:Props) {
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>rocketType</th>
                    <th>latitude</th>
                    <th>longitude</th>
                    <th>city</th>
                </tr>
            </thead>
            <tbody>
                {launchers.map(l=>(
                    <tr
                    key={l.id}
                    >
                        <td>{l.name}</td>
                        <td>{l.rocketType}</td>
                        <td>{l.latitude}</td>
                        <td>{l.longitude}</td>
                        <td>{l.city}</td>
                    </tr>
                )
                   
                )}
            </tbody>
        </table>
      
    </div>
  )
}

export default LaunchersTable