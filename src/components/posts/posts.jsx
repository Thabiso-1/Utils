import React, { useEffect, useState} from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useTable } from 'react-table';
import { CSVLink } from 'react-csv';


const pageSize = 10;
const Posts = () => {
    const [posts, setposts] = useState();
    const [paginatedPosts, setpaginatedPosts] = useState();
    const [currentPage, setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const executeStoredProcedure = async () => {
        try {
          setLoading(true); // Set loading state to true while executing stored procedure
          // Call your backend API to execute the stored procedure
          const response = await  axios.get('https://localhost:44368/api/Daily')
          .then(res => {
            console.log(res.data);
            setposts(res.data)
            setpaginatedPosts(_(res.data).slice(0).take(pageSize).value());
        })
          const jsonData = await response.json();
          setposts(jsonData); // Assuming the stored procedure returns JSON data
        } catch (error) {
          console.error('Error executing stored procedure:', error);
        } finally {
          setLoading(false); // Set loading state back to false after execution completes
        }
      };
    

    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos')
    //     // .then(res => {
    //     //     console.log(res.data);
    //     //     setposts(res.data)
    //     //     setpaginatedPosts(_(res.data).slice(0).take(pageSize).value());
    //     // });
    // },[]);

    const pageCount = posts? Math.ceil(posts.length/pageSize) :0;
    if (pageCount ===1) return null;
    const pages = _.range(1, pageCount + 1)

    const pagination =(pageNo) =>{
      setcurrentPage(pageNo);
      const startIndex  = (pageNo - 1) * pageSize;
      const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
      setpaginatedPosts(paginatedPost)
    };
    return (
        <div>
            <button className='executeBtn' onClick={executeStoredProcedure} disabled={loading}>
        {loading ? 'Executing...' : 'Execute Stored Procedure'}
</button>
      {loading && <progress max="100" />}
            { 
            !paginatedPosts ? ("No data Found"):(
                <table className='table'>
                    <thead>
                        <tr>
                        <th>rowType</th>
                            <th>bureauClientCode</th>
                            <th>fileType</th>
                            <th>originalCreditor</th>
                            <th>contractAccountNumber</th>
                            <th>contractSubAccountNumber</th>
                            <th>entityType</th>
                            <th>idNumber_RegistrationNumber</th>
                            <th>ccount_SURNAME"</th>
                            <th>firsT_NAME</th>
                            <th>complexAddressLine</th>
                            <th>streeT_NAME</th>
                            <th>streetType</th>
                            <th>streetnumber</th>
                            <th>City</th>
                            <th>streeT_ADDRESS_POSTAL_CODE"</th>
                            <th>lat</th>
                            <th>lon</th>
                            <th>addressLine1</th>
                            <th>addressLine2</th>
                            <th>landline2Score</th>
                            <th>cellNumber</th>
                            <th>cellDate</th>
                            <th>celldatescore</th>
                            <th>emailAddress</th>
                            <th>emailAddressDate</th>
                            <th>emaildatescore</th>
                            <th>spouseIDNumber</th>
                            <th>spouseLandLine1</th>
                            <th>spouseLandLine2</th>
                            <th>pouseLandLine2Date</th>
                            <th>spouseCellDate</th>
                            <th>spouseEmailAddress</th>
                            <th>spouseEmailAddressDate</th>
                            <th>deceaseD_IND"</th>
                            <th>executorDetails</th>
                            <th>deceasedDate</th>
                            < th>debtReviewFlag</th>
                            <th>debtReviewDate</th>
                            <th>debtReviewStatus</th>
                            <th>debtReviewContact</th>
                            <th>companyStatus</th>
                            <th>directorIDNumber</th>
                            <th>directorEmail</th>
                            <th>directorCell</th>
                            <th>directorLandLine</th>
                            <th>sequestrated</th>
                            <th>lsdaFlag</th>
                            <th>lsdaFlag</th>
                            <th>loadOrRejectionReason</th>
                            <th>creditscore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          paginatedPosts.map((post, index) =>(
                            <tr key={index}>
                                {/* <td>{fileType}</td>
                                <td>{originalCreditor}</td>
                                <td>{contractAccountNumber}</td>    
                                <td>{contractSubAccountNumber}</td>  
                                <td>{entityType}</td>    
                                <td>{idNumber_RegistrationNumber}</td> 
                                <td>{account_SURNAME}</td>
                                <td>{firsT_NAME}</td>      
                                <td>{complexAddressLine}</td>
                                <td>{streeT_NAME}</td>
                                <td>{streetType}</td>    
                                <td>{streetnumber}</td>
                                <td>{suburb}</td> */}

                                <td>
                                    <p className={
                                        post.completed ? "btn btn-success" : "btn btn-danger"
                                    }>
                                        {post.completed ? "Completed" : "Pending"}
                                    </p>
                                </td>
                            </tr>
                           
                          ))}
                    </tbody>
                </table>
            )}

            <nav className='d-flex justify-content-center'>
                <ul className='pagination'>
                    {
                       pages.map((page) => (
                        <li 
                        className= {
                            page === currentPage ? "page-item active" : "page-item"
                        }
                        >
                            <p className='page-link'
                            onClick={()=> pagination(page)}
                            >{page}</p>
                            </li>
                       ))}
                </ul>
            </nav>
            {/* <CSVLink className="downloadbtn" filename="my-file.csv" data={posts}>
        Export to CSV
      </CSVLink> */}
        </div>
    )
}
 
export default Posts;