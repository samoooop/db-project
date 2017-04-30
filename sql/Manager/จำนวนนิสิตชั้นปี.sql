-- จำนวนนิสิตชั้นปี
select count(s.sid)
from student s
where s.mid= ? and year(current_date()) + 543 - s.entry_year  = 1 -- ชั้นปีที่ต้องการ  
;
