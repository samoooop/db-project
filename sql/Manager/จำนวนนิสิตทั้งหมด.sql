-- จำนวนนิสิตทั้งหมด
select count(s.sid)
from student s
where s.mid = ?
;
