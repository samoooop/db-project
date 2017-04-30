select c.cid, c.courseName
from major_req_course mrc,course c
where mrc.req_mid = (select ss.mid from student ss where ss.sid = ?)
		and mrc.req_cid=c.cid 
		and not exists (select c.cid 
						from course c,sem_consist_course scc
						where scc.course_id=c.cid and scc.student_id =? and mrc.req_cid=scc.course_id
								and scc.status ='P')
;