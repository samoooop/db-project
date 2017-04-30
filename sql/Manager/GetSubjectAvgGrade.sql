select  sum(scc.grade * c.credit)/sum(c.credit) AS avgGrade 
from 	semester s inner join sem_consist_course scc on s.sem_sid = scc.student_id and s.semid = scc.semester_id
		inner join course c on scc.course_id = c.cid
where 	substring(scc.semester_id,1,4) = year(current_date())+ 543
		and scc.status = 'P'
        and c.cid = ?
;