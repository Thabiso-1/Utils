import React, {useEffect, useState} from 'react';
import axios from 'axios';

const TableDisplay = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    return ( 
        <div className='container'>
            <div className='mt-3'>
                <h3>fetch data</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>userId</th>
                            <th>id</th>
                            <th>title</th>
                            <th>completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((user, index) => {
                                return <tr key={index}>
                                    <td>{user.userId}</td>
                                    <td>{user.id}</td>
                                    <td>{user.title}</td>
                                    <td>{user.completed}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default TableDisplay;