
import React, { useState, useEffect, useCallback } from 'react';
import './GroupsList.sass' // Assuming the stylesheet name is changed
import _ from 'lodash';
import { useSelector } from 'react-redux'
import StudentDropArea from '../StudentDropArea/StudentDropArea'; // New component name
import {
  usersList, // Assuming an API endpoint for groups
  listedStudentGroups,
  newStudentGroup, // Assuming an API endpoint for adding students to groups
} from '../../../api'; // Assuming API access functions are adjusted

const GroupsList = ({ groupId, message }) => {
    const loggedUser = useSelector((state) => state.user)
    const [droppedStudents, setDroppedStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentList = await usersList();
        const studendGroups = await listedStudentGroups();

        if (!studendGroups.data || !studentList.data) return

        const studentsPerGroup = studendGroups.data.filter(
            (student) => student.groupscreateid === groupId // Filter students based on group membership
        );
        const userIds = studentsPerGroup.map(
            spg => spg.userid
        )
        const studentDetails = studentList.data.filter(
            s => userIds.includes(s.userid)
        )
        setDroppedStudents([...studentDetails]);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, [groupId, droppedStudents]);

  const handleDrop = async (student) => {
    setDroppedStudents(
        prevState => {
            if (prevState.find(s => s.userid === student.userid)) {
                return prevState
            }

            const newStudentsDrop = [...prevState]
            newStudentsDrop.push(student)
            return newStudentsDrop
        }
    )

    try {
        await newStudentGroup(student.userid, 0, loggedUser.userId, groupId); // Assuming API call to add student to group
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='group-list'>
        <StudentDropArea // New component for student drag and drop
            groupId={groupId}
            droppedStudents={droppedStudents}
            onDrop={(student) => handleDrop(student)}
            message={message}
        />
    </div>
  );
};

export default GroupsList;
