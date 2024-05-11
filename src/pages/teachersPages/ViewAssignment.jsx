import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../../utils/axiosInstance'

export default function ViewAssignment() {

    const [data, setData] = useState([])
    const [score,setScore] = useState()

    console.log('score',score)

    console.log("data",data)

    const { id } = useParams()

    const fetchAssignment = async() => {
        try {
            const response =await axios.get(`/assignments/${id}`)

            setData(response?.data?.students)

            console.log('first,response',response)
        }
        catch (error) {
            console.error("error fetching data",error)
        }
    }


    const handleMarkUpdate = async(studentId) => {
        try{

            const response = await axios.put(`/assignment/${id}/${studentId}`,{
                score
            })

            console.log(response.data)

        }catch(err){
            console.error("mark not uploaded",err)
        }
    }
 

    useEffect(() => {
        fetchAssignment()
    },[])

    return (
        
        <div>
        {data.length === 0 ? (
            <p>No data found</p>
        ) : (
            <div>
                {data.map((student, index) => (
                    <div key={student?._id} style={{ display: 'flex', alignItems: 'center', marginLeft: '100px', margin: '30px', border: '1px solid ', padding: "3%" }}>
                        <div style={{ width: '150px', display: 'flex', marginLeft: '100px' }}>
                            {student?.imagefile?.map((image, imageIndex) => (
                                <img style={{ width: '300px', height: "300px" }} key={imageIndex} src={image.url} alt={`Student ${index + 1} image`} />
                            ))}
                        </div>
                        <div style={{ position: 'absolute', left: 1000 }}>
                            <h6>student name: {student?.student?.userFullName}</h6>
                            <input
                                type="number"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                            />
                            <button onClick={() => handleMarkUpdate(student.student._id)}>Add Score</button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
         
    )
}
