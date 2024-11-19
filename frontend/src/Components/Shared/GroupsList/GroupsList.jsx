// import React, { useState, useEffect } from 'react';
// import './GroupsList.sass' // Assuming the stylesheet name is changed
// import _ from 'lodash';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
// import CustomMessage from '../CustomMessage/CustomMessage';
// import StudentDropArea from '../StudentDropArea/StudentDropArea'; // New component name
// import {
//   listedGroups, // Assuming an API endpoint for groups
//   listedStudents, // Assuming an API endpoint for students
//   newStudentPerGroup, // Assuming an API endpoint for adding students to groups
// } from '../../../api'; // Assuming API access functions are adjusted

// const GroupsList = ({ groupId, newActivities, message }) => {
//   const [droppedStudents, setDroppedStudents] = useState({}); // Object to store dropped students per group
//   const [groups, setGroups] = useState([]); // Array to store groups

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const groupsResponse = await listedGroups(); // Assuming API call
//         const studentsResponse = await listedStudents(); // Assuming API call

//         const loadedStudents = {}; // Object to store student details

//         await Promise.all(
//           groupsResponse.data.map(async (group) => {
//             // Assuming you have a method to fetch students per group (not implemented here)
//             // const studentsPerGroup = await listedStudentsPerGroup(group.groupId); // Replace with actual method

//             // Instead, consider fetching all students and filtering them based on group membership (if applicable)
//             const studentDetails = studentsResponse.data.filter(
//               (student) => student.groupId === group.groupId // Filter students based on group membership
//             );

//             loadedStudents[group.groupId] = studentDetails;
//           })
//         );

//         setDroppedStudents(loadedStudents);
//         setGroups(groupsResponse.data);
//       } catch (error) {
//         console.log('error', error);
//       }
//     };

//     fetchData();
//   }, [groupId, newActivities]);

//   const handleDrop = async (groupId, student) => {
//     setDroppedStudents((prevDroppedStudents) => {
//       const updatedDroppedStudents = { ...prevDroppedStudents };

//       if (!updatedDroppedStudents[groupId]) {
//         updatedDroppedStudents[groupId] = [];
//       }

//       // Verify if the student is already in the group before adding
//       const studentAlreadyDropped = updatedDroppedStudents[groupId].find(
//         (droppedStudent) => droppedStudent.studentId === student.studentId
//       );

//       if (!studentAlreadyDropped) {
//         // Add the student with any additional information needed
//         updatedDroppedStudents[groupId].push(student);
//       }

//       return updatedDroppedStudents;
//     });

//     try {
//       await newStudentPerGroup(student.studentId, groupId); // Assuming API call to add student to group
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className='group-list'>
//       {groups.length === 0 ? (
//         <CustomMessage message={'No groups created'} />
//       ) : (
//         <>
//           {_.map(groups, (group) => (
//             <div key={group.groupId} className='mb-2 mt-2'>
//               <div className='group-list-name'>
//                 <h5>{group.name}</h5>
//                 <button className='ellipsis-icon'>
//                   <FontAwesomeIcon icon={faEllipsisVertical} />
//                 </button>
//               </div>
// {/* 
//               <StudentDropArea // New component for student drag and drop
//                 groupId={group.groupId}
//                 droppedStudents={droppedStudents[group.groupId] || []}
//                 onDrop={(student) => handleDrop(group.groupId, student)}
//                 message={message}
//               /> */}
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default GroupsList;