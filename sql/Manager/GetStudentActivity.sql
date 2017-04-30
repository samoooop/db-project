select a.name as actName,a.hour as hour
from student s inner join student_join_act ja on s.sid = ja.sid inner join activity a on ja.aid = a.aid 
where s.sid = ?