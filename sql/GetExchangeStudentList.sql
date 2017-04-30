-- รายละเอียดนิสิต Exchange
select s.sid, s.first_name, s.last_name,tl.leave_type,concat(t.first_name ,' ',t.last_name)as TeacherName
from student s inner join teacher t on s.tid = t.tid,take_leave tl
where s.mid='major id' and s.sid = tl.l_sid and tl.until > DATE_ADD(current_date(), INTERVAL 541 year) and tl.since < DATE_ADD(current_date(), INTERVAL 541 year) and tl.leave_type = "Exchange"
;
