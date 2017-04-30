select c.cid, c.courseName, concat(substring(mrc.student_year,1,1),'/',substring(mrc.student_year,3,1)) as RequireTerm
from major_req_course mrc join course c on mrc.req_cid=c.cid,student s
where mrc.req_mid= (select s.mid from student s where s.sid = ?) 
	and s.sid= ? and year(current_date()) +543 - s.entry_year>substring(mrc.student_year,1,1)
	and not exists (select scc.course_id,concat(substring(scc.semester_id,1,4)-s.entry_year+1,'/',substring(scc.semester_id,5,1)) as StudentYear_Term 
					from student s join sem_consist_course scc on s.sid= scc.student_id
					where s.sid = ? and mrc.req_cid=scc.course_id
					and scc.status = 'P' )