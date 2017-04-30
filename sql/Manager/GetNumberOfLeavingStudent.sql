select count(s.sid) as result,s.entry_year as year
from student s,take_leave tl
where s.sid = tl.l_sid 
        and tl.until > DATE_ADD(current_date(), INTERVAL 543 year) 
        and tl.since < DATE_ADD(current_date(), INTERVAL 543 year)
        and s.mid = ?
group by s.entry_year
;