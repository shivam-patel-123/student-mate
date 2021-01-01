import React from 'react';

import './subject-item.styles.scss';

const SubjectItem = ({ name, active, setSubjectAsActive }) => (
    <li className='subject'>
        <div className={`subject-details ${active ? 'subject-active' : ''}`} onClick={setSubjectAsActive}>
            <h4 className='heading heading-h4'>{name}</h4>
            <h5 className='heading heading-h6 heading-grey'>Syllabus Progress: 1/5 Units</h5>
            <div className='subject-details-students'>
                <div className='students-photo'>
                    <div className='student' />
                    <div className='student' />
                    <div className='student' />
                    <div className='student' />
                </div>
                <div className='students-info'>
                    <span className='student-number heading-h5'>62</span>
                    <span className='student-label heading-grey heading-small'>Students</span>
                </div>
            </div>
        </div>
    </li>
);

export default SubjectItem;
