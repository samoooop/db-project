select s.sid ,s.first_name, s.last_name, Grade.GPAX as gpax , count(g.rewardid) as rewardAmount,s.entry_year as enYear,phone_number,behavioral_score,major.name as majorName
from (student s left join got_reward g on s.sid = g.studentid) left join major on major.mid = s.mid, 
					(select sum((sem_consist_course.grade*course.credit))/sum(course.credit) AS GPAX, student.sid AS Psid ,sem_consist_course.status as status
					from ((student left join semester on student.sid = semester.sem_sid) left join sem_consist_course 
								on semester.sem_sid = sem_consist_course.student_id and semester.semid = sem_consist_course.semester_id) 
								left join course on sem_consist_course.course_id = course.cid
                                where sem_consist_course.status = 'P'
					group by student.sid) AS Grade	
where
		s.sid = Grade.Psid
        and s.sid = '5630211421'
group by sid
;

