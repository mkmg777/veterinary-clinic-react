import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import doctorImg from '../images/yogeesh.jpeg'
import { useNavigate } from 'react-router-dom'
export default function Doctor(){
    const {state}=useContext(AuthContext)
    const navigate=useNavigate()

    const handleNavigate=()=>{
        if(state.isLoggedIn){
            navigate('/')
        }else{
            navigate('/login')
        }
        
    }


//     return(
//         <div className="container mt-5">
//         <div className="card">
//             <div className="card-header text-center">
//             <img src={doctorImg} alt={"Dr. Yogeesh G H"} className="img-fluid rounded-circle mb-3" style={{ width: "150px", height: "150px" }} />
//             <h2><i className='fa-solid fa-user'></i>  Dr Yogeesh G H</h2>
//             <p><strong>Qualification:</strong> BVSc & A H</p>
//             <p><strong>Experience:</strong> 2+ years experience</p>
//             <p><i className="fas fa-envelope"></i><strong> Email:</strong> <a href="mailto:ghyogeesh@gmail.com" className="ml-2">ghyogeesh@gmail.com</a>
//             </p>
//             <p><i className='fa-solid fa-phone'></i><strong> Contact Number:</strong>4545454445</p>
//             <p><i className='fa-solid fa-location'></i><strong> Address:</strong> Shamnur, Davanger</p>
                
                
//             </div>
//             <div>
//             <button
//                 className="btn btn-primary mb-3 text-end"
//                 type='button'
//                 onClick={handleNavigate}
//                 >
//                 Home Page
//             </button>
//             </div>
           
//         </div>
//         </div>
//     )
// }

 return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card shadow border-0" style={{ borderRadius: '15px', maxWidth: '800px', width: '100%' }}>
                <div className="row g-0">
                    {/* Left Column with Image */}
                    <div className="col-md-5 bg-primary d-flex justify-content-center align-items-center" style={{ borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px', padding: '40px' }}>
                        <img
                            src={doctorImg}
                            alt="Dr. Yogeesh G H"
                            className="img-fluid rounded-circle border border-light"
                            style={{ width: '200px', height: '200px', objectFit: 'cover', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)' }}
                        />
                    </div>

                    {/* Right Column with Information */}
                    <div className="col-md-7">
                        <div className="card-body p-4">
                            <h2 className="card-title text-primary">Dr. Yogeesh G H</h2>
                            <p className="mb-1"><strong>Qualification:</strong> BVSc & AH</p>
                            <p className="mb-1"><strong>Experience:</strong> 2+ years</p>
                            <p className="mb-1"><strong>Age:</strong> 25 years</p> {/* Added Age */}
                            <p className="mb-1"><strong>Email:</strong> <a href="mailto:ghyogeesh@gmail.com" className="text-decoration-none">ghyogeesh@gmail.com</a></p>
                            <p className="mb-1"><strong>Contact Number:</strong> +91 4545454445</p>
                            <p className="mb-1"><strong>Address:</strong> Shamnur, Davangere</p>
                            <p className="mb-1"><strong>Specialties:</strong> Preventive Care, Emergency Medicine</p> {/* Added Specialties */}
                            <p className="mb-3"><strong>Biography:</strong> Dr. Yogeesh is a passionate veterinarian dedicated to providing the best care for pets. He has a keen interest in surgical procedures and has worked with various animal species. His commitment to animal welfare drives him to continually update his skills and knowledge.</p> {/* Added Biography */}
                            <p className="mb-1"><strong>Achievements:</strong> 
                                <ul>
                                <li>Active member of the Indian Veterinary Counsile</li>
                                <li>Contributed to a government-based emergency service project for animals, providing critical care and support during natural disasters.</li> 
    
                                    <li>Active member of the Indian Veterinary Counsile</li>
                                </ul>
                            </p> {/* Added Achievements */}

                            {/* <div className="text-center">
                                <button
                                    className="btn btn-success mt-4 px-4"
                                    type="button"
                                    onClick={handleNavigate}
                                    style={{ borderRadius: '20px' }}
                                >
                                    Go to Home Page
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}