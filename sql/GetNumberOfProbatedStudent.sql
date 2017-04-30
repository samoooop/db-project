select count(s.sid) as result, s.entry_year as year
from student s inner join (select sum(sem_consist_course.grade*course.credit)/sum(course.credit) AS GPAX, student.sid AS Psid
					from ((student inner join semester on student.sid = semester.sem_sid) inner join sem_consist_course 
					on semester.sem_sid = sem_consist_course.student_id and semester.semid = sem_consist_course.semester_id) 
					inner join course on sem_consist_course.course_id = course.cid
					where sem_consist_course.status = 'P'
					group by student.sid) AS Grade on s.sid = Grade.Psid 
where s.tid = ?
		and Grade.GPAX < 2
group by s.entry_year;
       
;