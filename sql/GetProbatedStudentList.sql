-- รายละเอียดนิสิตติด Pro
select s.sid ,s.first_name, s.last_name, Grade.GPAX , concat(t.first_name ,' ',t.last_name)as TeacherName
from student s join teacher t on s.tid = t.tid left outer join 
					(select sum(sem_consist_course.grade*course.credit)/sum(course.credit) AS GPAX, student.sid AS Psid
					from ((student inner join semester on student.sid = semester.sem_sid) inner join sem_consist_course 
					on semester.sem_sid = sem_consist_course.student_id and semester.semid = sem_consist_course.semester_id) 
					inner join course on sem_consist_course.course_id = course.cid
					where sem_consist_course.status = 'P'
					group by student.sid) AS Grade	on s.sid = Grade.Psid
where s.mid = ? and Grade.GPAX < 2
       
;
