select s.sid ,s.first_name, s.last_name, Grade.GPAX as gpax , count(g.rewardid) as rewardAmount, s.entry_year as enYear
from  student s left join got_reward g on s.sid = g.studentid,take_leave tl,
(select sum((sem_consist_course.grade*course.credit))/sum(course.credit) AS GPAX, student.sid AS Psid ,sem_consist_course.status as status
					from ((student inner join semester on student.sid = semester.sem_sid) inner join sem_consist_course 
								on semester.sem_sid = sem_consist_course.student_id and semester.semid = sem_consist_course.semester_id) 
								inner join course on sem_consist_course.course_id = course.cid
					where sem_consist_course.status = 'P'
					group by student.sid) AS Grade
where 
	s.sid = tl.l_sid and tl.until > current_date() +543 and tl.since < current_date() +543 and s.sid = Grade.Psid and tl.leave_type != 'Exchange'
    and s.entry_year >= ? and s.entry_year <= ?
group by s.sid
;