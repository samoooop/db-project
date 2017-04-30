select c.*, mrc.student_year, concat(t.first_name," ",t.last_name) as managedTeacher
		, avgGrade.avgGrade
		, count(ccw.status) as W
		, count(ccf.status) as F			
from major m  inner join major_req_course mrc on m.mid =mrc.req_mid
		inner join course c on mrc.req_cid = c.cid
        left outer join (	select  sum(scc.grade * c.credit)/sum(c.credit) AS avgGrade, c.cid as cid
						from 	semester s inner join sem_consist_course scc on s.sem_sid = scc.student_id and s.semid = scc.semester_id
								inner join course c on scc.course_id = c.cid
						where 	substring(scc.semester_id,1,4) = year(current_date()) + 543
								and scc.status = 'P'
						group by scc.course_id ) as avgGrade on avgGrade.cid = c.cid
        left outer join teacher t on c.managed_tid = t.tid 
        left outer join (	select scc.status ,scc.course_id as cid 
							from sem_consist_course scc 
							where scc.status='W' and substring(scc.semester_id,1,4) = year(current_date()) + 543 ) as ccw on c.cid = ccw.cid
		left outer join ( select scc.status ,scc.course_id as cid 
							from sem_consist_course scc 
							where scc.status='P' and scc.grade = 0 and substring(scc.semester_id,1,4) = year(current_date())+ 543 ) as ccf on c.cid = ccf.cid        
where m.mid = ?
group by c.cid
;