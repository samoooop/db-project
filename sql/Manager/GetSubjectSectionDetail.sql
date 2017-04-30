select concat(t.first_name," ",t.last_name) AS teacherName, ttc.section
from course c inner join teacher_teach_course ttc on c.cid = ttc.teach_cid
		inner join teacher t on ttc.teach_tid = t.tid
where c.cid = ?