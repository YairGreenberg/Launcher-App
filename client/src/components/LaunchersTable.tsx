import type { Launcher } from '../types/type-index'
import {  useNavigate } from 'react-router-dom'


interface Props {
    launchers:Launcher[]
}


function LaunchersTable({launchers}:Props) {
    const navigate = useNavigate();
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
                    onClick={() => navigate(`/launchers/${l.id}`)}
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